// decode-pages.js
// Usage: node decode-pages.js
// Input : page-base64.json   → [{ page: 2, base64: "eyJ..." }, ...]
// Output: pages-decoded.json → structured + combined JSON

import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = path.join(process.cwd(), 'page-base64.json');
const OUTPUT_FILE = path.join(process.cwd(), 'pages-decoded.json');

function decodeBase64Utf8(b64) {
    // Node's Buffer handles base64 → bytes → utf-8 in one step
    return Buffer.from(b64, 'base64').toString('utf-8');
}

function main() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ Not found: ${INPUT_FILE}`);
        process.exit(1);
    }

    const raw = fs.readFileSync(INPUT_FILE, 'utf-8');
    let entries;
    try {
        entries = JSON.parse(raw);
    } catch (e) {
        console.error('❌ Could not parse page-base64.json:', e.message);
        process.exit(1);
    }
    if (!Array.isArray(entries)) {
        console.error('❌ Expected the top-level value to be an array.');
        process.exit(1);
    }

    const pages = [];
    const errors = [];

    for (const entry of entries) {
        const page = entry.page != null ? Number(entry.page) : null;
        const b64 = (entry.base64 || '').trim();

        if (!b64) {
            pages.push({ page, empty: true, itemCount: 0, items: [] });
            continue;
        }

        try {
            const decoded = decodeBase64Utf8(b64);
            const parsed = JSON.parse(decoded);

            // The decoded payload is an API envelope:
            //   { error, message, status, data: { page_data, current_page, ... } }
            const data = parsed?.data;
            if (!data || !Array.isArray(data.page_data)) {
                throw new Error('Decoded JSON has no data.page_data array.');
            }

            pages.push({
                page,
                envelope: {
                    error: parsed.error ?? null,
                    message: parsed.message ?? null,
                    status: parsed.status ?? null
                },
                currentPage: data.current_page ?? page,
                totalPages: data.total_page ?? data.num_pages ?? null,
                totalItems: data.total_items ?? null,
                hasPrevious: !!data.has_previous,
                hasNext: !!data.has_next,
                previousPage: data.previous_page_number ?? null,
                nextPage: data.next_page_number ?? null,
                itemCount: data.page_data.length,
                items: data.page_data
            });
        } catch (err) {
            errors.push({ page, message: err.message });
            pages.push({ page, error: err.message, itemCount: 0, items: [] });
        }
    }

    // Combine + dedupe by item id (first occurrence wins)
    const seen = new Set();
    const allItems = [];
    for (const p of pages) {
        if (!Array.isArray(p.items)) continue;
        for (const item of p.items) {
            if (item?.id != null) {
                if (seen.has(item.id)) continue;
                seen.add(item.id);
            }
            allItems.push({ ...item, _sourcePage: p.page });
        }
    }

    // Optional: group by subject for convenience
    const bySubject = new Map();
    for (const item of allItems) {
        const key = item.subject_id != null
            ? `id:${item.subject_id}`
            : `name:${item.subject_name || 'unknown'}`;
        if (!bySubject.has(key)) {
            bySubject.set(key, {
                subjectId: item.subject_id ?? null,
                subjectName: item.subject_name ?? '',
                examCount: 0,
                examIds: [],
                totalQuestions: 0
            });
        }
        const g = bySubject.get(key);
        g.examCount++;
        g.examIds.push(item.id);
        g.totalQuestions += Number(item.question_number) || 0;
    }

    const output = {
        generatedAt: new Date().toISOString(),
        source: path.basename(INPUT_FILE),
        pageCount: pages.length,
        nonEmptyPages: pages.filter(p => !p.empty && !p.error).length,
        totalDecodedItems: pages.reduce((s, p) => s + (p.itemCount || 0), 0),
        uniqueItems: allItems.length,
        errorCount: errors.length,
        errors,
        subjects: Array.from(bySubject.values())
            .sort((a, b) => b.examCount - a.examCount
                || String(a.subjectName).localeCompare(String(b.subjectName))),
        pages,       // per-page metadata + items
        allItems     // flat combined list
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`✅ Wrote ${OUTPUT_FILE}`);
    console.log(`   Pages:        ${pages.length} (${output.nonEmptyPages} decoded)`);
    console.log(`   Items:        ${output.totalDecodedItems} raw → ${allItems.length} unique`);
    console.log(`   Subjects:     ${output.subjects.length}`);
    if (errors.length) {
        console.log(`   ⚠ Errors:    ${errors.length} page(s) failed`);
        for (const e of errors.slice(0, 5)) console.log(`      · page ${e.page}: ${e.message}`);
    }
}

main();