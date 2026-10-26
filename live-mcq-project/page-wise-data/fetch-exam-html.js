// fetch-exam-html.js
// OCT 12 all clear
// Run: node fetch-exam-html.js

import * as fs from 'fs';
import * as path from 'path';

// ---------------- Config ----------------
const INPUT_FILE = path.join(process.cwd(), 'pages-decoded.json');
const OUTPUT_DIR = path.join(process.cwd(), 'html');
const COMPLETED_FILE = path.join(process.cwd(), 'downloaded-ids.txt');
const ERROR_LOG = path.join(process.cwd(), 'fetch-errors.json');
const DEBUG_DIR = path.join(process.cwd(), 'debug');

const BASE_URL = 'https://app.livemcq.com/app/central-archive';

// Delay between requests (ms). Loops through this cycle forever.
// Pattern: 10, 20, 15, 30, 45, then 10, 20, 15, 10, 30, 40 → repeat.
const DELAY_CYCLE_MS = [
    10_000, 20_000, 15_000, 30_000, 45_000,
    10_000, 20_000, 15_000, 10_000, 30_000, 40_000
];

const CONCURRENCY = 1;
const MAX_RETRIES = 5;
const RETRY_BACKOFF_MS = 15_000;
const TIMEOUT_MS = 60_000;
const MIN_VALID_SIZE = 20_000;
const DEBUG_ON_INVALID = true;

const COOKIE = process.env.LIVEMCQ_COOKIE || '_gcl_au=1.1.795904219.1788077233; _fbp=fb.1.1788077233385.283889126682805854; _gcl_gs=2.1.k1$i1788084167$u193264048; _gcl_aw=GCL.1788084176.CjwKCAjwqc_UBhBKEiwAWbl25t0txN_RtKhBbXFOVLJpx4r4YHGzFZpijg5vpot9iM7B0LM4Cv17ghoC89oQAvD_BwE; _ga=GA1.1.174057266.1788077233; _ga_S1QV5PC61T=GS2.1.s1789041089$o9$g1$t1789041118$j31$l0$h0; _ga_3JPWR2R2QT=GS2.1.s1789041089$o9$g1$t1789041118$j31$l0$h0; _ga_S41209C0DK=GS2.1.s1791189232$o10$g1$t1791189250$j42$l0$h1950830227; livemcq_device_id=web_3e85a382073c72bf8011c15478ac9f5b; _clck=zbmwxv%5E2%5Ega8%5E0%5E2433; csrftoken=011eZ08SxvXHWFoVOtuI49tkOlcYfG8U; sessionid=1u93jwnpx5hg98pvsm9kin0j2yieggea; _clsk=sy6os7%5E1791793647397%5E71%5E1%5En.clarity.ms%2Fcollect';

const HEADERS = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9,fr;q=0.8,bn;q=0.7',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'referer': 'https://app.livemcq.com/app/central-archive?subjects=155,32,36,44,14,16,47,34,49,39,51,29,19,92,50,52,48,42,58,62,27,6,4,43,38,78,148,11',
    'sec-ch-ua': '"Chromium";v="154", "Google Chrome";v="154", "Not A(Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36',
    'Cookie': COOKIE
};

// ---------------- Utilities ----------------
const sleep = ms => new Promise(r => setTimeout(r, ms));
function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

function fmtDuration(ms) {
    const s = Math.round(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h) return `${h}h ${m}m`;
    if (m) return `${m}m ${sec}s`;
    return `${sec}s`;
}

function readIdsFromPagesDecoded(file) {
    const raw = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(raw);
    const ids = new Set();
    if (Array.isArray(data.allItems)) {
        for (const it of data.allItems) if (it?.id != null) ids.add(Number(it.id));
        return [...ids];
    }
    if (Array.isArray(data.pages)) {
        for (const p of data.pages)
            for (const it of (p.items || [])) if (it?.id != null) ids.add(Number(it.id));
    }
    if (Array.isArray(data.subjects)) {
        for (const s of data.subjects)
            for (const id of (s.examIds || [])) if (id != null) ids.add(Number(id));
    }
    return [...ids];
}

// ---------------- Map file ----------------
function readCompletedIds(file) {
    const set = new Set();
    if (!fs.existsSync(file)) return set;
    const raw = fs.readFileSync(file, 'utf-8');
    for (const line of raw.split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const n = Number(t);
        if (Number.isFinite(n)) set.add(n);
    }
    return set;
}

function initCompletedFile(file) {
    if (fs.existsSync(file)) return;
    fs.writeFileSync(file,
        `# Live MCQ download map\n` +
        `# Started: ${new Date().toISOString()}\n` +
        `# One exam ID per line, appended in download order.\n` +
        `# Delete this file to force a full re-download.\n`, 'utf-8');
}

function appendCompletedId(file, id) { fs.appendFileSync(file, `${id}\n`, 'utf-8'); }

// ---------------- Validation ----------------
const RATE_LIMIT_MARKER = 'অনুরোধের সীমা অতিক্রম করেছে';
const FLIGHT_TRow = /([0-9a-z]+):T[0-9a-f]+,([A-Za-z0-9+/]{50,}={0,2})/i;

function isValidExamHtml(html) {
    if (!html || typeof html !== 'string') return false;
    if (html.length < MIN_VALID_SIZE) return false;
    if (html.includes(RATE_LIMIT_MARKER)) return false;
    if (!html.includes('self.__next_f.push')) return false;
    if (!FLIGHT_TRow.test(html)) return false;
    return true;
}

function isValidHtmlFile(file) {
    try {
        const st = fs.statSync(file);
        if (!st.isFile() || st.size < MIN_VALID_SIZE) return false;
        return isValidExamHtml(fs.readFileSync(file, 'utf-8'));
    } catch { return false; }
}

// ---------------- Fetch ----------------
async function fetchOnce(id) {
    const url = `${BASE_URL}/${id}/question`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            method: 'GET', headers: HEADERS, redirect: 'follow', signal: ctrl.signal
        });
        const html = await res.text();
        return { status: res.status, html };
    } finally {
        clearTimeout(timer);
    }
}

async function fetchWithRetry(id, attempt = 0) {
    try {
        const { status, html } = await fetchOnce(id);

        if (status === 404) return { ok: false, status: 404, error: 'not found', rawHtml: html };
        if (status === 429 || status >= 500) throw new Error(`HTTP ${status}`);
        if (status !== 200) return { ok: false, status, error: `HTTP ${status}`, rawHtml: html };

        if (!isValidExamHtml(html)) {
            const reason = html.includes(RATE_LIMIT_MARKER)
                ? 'rate-limited (200 OK + error page)'
                : `invalid exam HTML (len=${html.length})`;
            throw Object.assign(new Error(reason), { rawHtml: html });
        }
        return { ok: true, status: 200, html };
    } catch (err) {
        // Retry only on non-content failures (network, 5xx, 429)
        const shouldRetry = !err.rawHtml && attempt < MAX_RETRIES;
        if (shouldRetry) {
            const backoff = RETRY_BACKOFF_MS * (attempt + 1);
            console.log(`   ↻ ${id} — ${err.message || err} — retry ${attempt + 1}/${MAX_RETRIES} in ${fmtDuration(backoff)}`);
            await sleep(backoff);
            return fetchWithRetry(id, attempt + 1);
        }
        return { ok: false, status: 0, error: err.message || String(err), rawHtml: err.rawHtml };
    }
}

// ---------------- Progress line ----------------
function progressLine(state) {
    const elapsed = Date.now() - state.t0;
    const perItem = state.attempted ? elapsed / state.attempted : 0;
    const eta = state.queue.length * perItem;
    return (
        `\r✅ ${state.saved} saved · ⏭ ${state.skipped} skipped · ❌ ${state.failed} failed ` +
        `· 📦 ${state.done}/${state.total} · ⏳ ETA ${fmtDuration(eta)}   `
    );
}

// ---------------- Worker ----------------
async function worker(state) {
    while (state.queue.length && !state.stopping) {
        const id = state.queue.shift();
        state.done++;

        const file = path.join(OUTPUT_DIR, `${id}.html`);

        if (state.completedIds.has(id) && isValidHtmlFile(file)) {
            state.skipped++;
            process.stdout.write(progressLine(state));
            continue;
        }

        state.attempted++;
        process.stdout.write(`\r⏳ fetching ${id} …                                        `);

        const res = await fetchWithRetry(id);

        if (res.ok) {
            fs.writeFileSync(file, res.html, 'utf-8');
            if (!state.completedIds.has(id)) {
                appendCompletedId(COMPLETED_FILE, id);
                state.completedIds.add(id);
            }
            state.saved++;
        } else {
            state.failed++;
            state.errors.push({ id, status: res.status, error: res.error, at: new Date().toISOString() });

            if (DEBUG_ON_INVALID && res.rawHtml) {
                ensureDir(DEBUG_DIR);
                const dbg = path.join(DEBUG_DIR, `${id}.invalid.html`);
                fs.writeFileSync(dbg, res.rawHtml, 'utf-8');
                console.log(`\n   💾 bad response saved → ${path.relative(process.cwd(), dbg)}`);
            }
        }

        process.stdout.write(progressLine(state));

        if (state.queue.length && !state.stopping) {
            // Pick the next delay from the cycle, then advance the pointer.
            const slotNumber = state.delayIndex + 1;
            const delay = DELAY_CYCLE_MS[state.delayIndex % DELAY_CYCLE_MS.length];
            state.delayIndex++;

            let remaining = delay;
            const start = Date.now();
            while (remaining > 0 && !state.stopping) {
                process.stdout.write(
                    `\r💤 waiting ${fmtDuration(remaining)} before next request ` +
                    `(slot #${slotNumber} of ${DELAY_CYCLE_MS.length}, ${delay / 1000}s) …                    `
                );
                await sleep(Math.min(1000, remaining));
                remaining = delay - (Date.now() - start);
            }
        }
    }
}

// ---------------- Main ----------------
async function main() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ Not found: ${INPUT_FILE}`);
        process.exit(1);
    }
    if (!COOKIE || COOKIE === 'PASTE_YOUR_COOKIE_HERE') {
        console.error('❌ Set the COOKIE constant (or LIVEMCQ_COOKIE env var) before running.');
        process.exit(1);
    }

    ensureDir(OUTPUT_DIR);
    initCompletedFile(COMPLETED_FILE);

    console.log(`📖 Reading ${path.basename(INPUT_FILE)}...`);
    const allIds = readIdsFromPagesDecoded(INPUT_FILE);
    if (!allIds.length) {
        console.error('❌ No exam IDs found in the input file.');
        process.exit(1);
    }
    allIds.sort((a, b) => a - b);

    const completedIds = readCompletedIds(COMPLETED_FILE);
    const freshStart = completedIds.size === 0;

    const pending = [];
    let alreadyOnDisk = 0;
    let mapButMissingFile = 0;

    for (const id of allIds) {
        const file = path.join(OUTPUT_DIR, `${id}.html`);
        const inMap = completedIds.has(id);
        const onDisk = isValidHtmlFile(file);

        if (inMap && onDisk) { alreadyOnDisk++; continue; }
        if (inMap && !onDisk) { mapButMissingFile++; pending.push(id); continue; }
        if (!inMap && onDisk) { alreadyOnDisk++; continue; }
        pending.push(id);
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log(` Map file            : ${path.basename(COMPLETED_FILE)}`);
    console.log(` Total exam IDs      : ${allIds.length}`);
    console.log(` In map & on disk    : ${alreadyOnDisk}`);
    if (mapButMissingFile) {
        console.log(` In map but missing  : ${mapButMissingFile}  (will re-download)`);
    }
    console.log(` Remaining to fetch  : ${pending.length}`);
    if (pending.length) {
        // ETA now uses the average of the delay cycle.
        const avgDelayMs = DELAY_CYCLE_MS.reduce((a, b) => a + b, 0) / DELAY_CYCLE_MS.length;
        const etaMs = pending.length * (avgDelayMs + 3_000);
        console.log(` Delay cycle (avg)   : ${(avgDelayMs / 1000).toFixed(1)}s  →  ${DELAY_CYCLE_MS.map(m => m / 1000 + 's').join(', ')}`);
        console.log(` Estimated time      : ${fmtDuration(etaMs)}`);
    }
    console.log(` Output directory    : ${OUTPUT_DIR}`);
    console.log('═══════════════════════════════════════');
    console.log(freshStart ? '🆕 Fresh start — map file is empty.' : `📊 Resuming — ${completedIds.size} IDs already logged.`);
    console.log('');

    if (!pending.length) {
        console.log('🎉 Nothing to fetch — everything is already downloaded.');
        return;
    }

    const state = {
        queue: pending, total: pending.length, done: 0,
        saved: 0, skipped: 0, failed: 0, attempted: 0,
        errors: [], completedIds, t0: Date.now(), stopping: false,
        delayIndex: 0
    };

    const onSigint = () => {
        if (state.stopping) process.exit(1);
        state.stopping = true;
        console.log('\n⚠  Ctrl+C — finishing in-flight request, updating map file, then exiting...');
    };
    process.on('SIGINT', onSigint);

    const workers = Array.from({ length: CONCURRENCY }, () => worker(state));
    await Promise.all(workers);

    process.off('SIGINT', onSigint);

    if (state.errors.length) {
        fs.writeFileSync(ERROR_LOG, JSON.stringify({
            generatedAt: new Date().toISOString(),
            total: state.total, saved: state.saved,
            skipped: state.skipped, failed: state.failed,
            errors: state.errors
        }, null, 2));
    }

    console.log('\n\n════════════════ SUMMARY ════════════════');
    console.log(`  Session fetched    : ${state.saved}`);
    console.log(`  Session skipped    : ${state.skipped}`);
    console.log(`  Session failed     : ${state.failed}`);
    console.log(`  Total on disk      : ${alreadyOnDisk + state.saved} / ${allIds.length}`);
    console.log(`  Map file total     : ${state.completedIds.size} IDs`);
    if (state.errors.length) {
        console.log(`  Error log          : ${path.relative(process.cwd(), ERROR_LOG)}`);
    }
    console.log('═════════════════════════════════════════');
}

main().catch(err => {
    console.error('\n❌ Fatal:', err);
    process.exit(1);
});