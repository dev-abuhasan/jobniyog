// node live-mcq-project/page-wise-data/batch-extract.js --dry-run
// node live-mcq-project/page-wise-data/batch-extract.js

import { createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_DIR = path.join(SCRIPT_DIR, 'html');
const DEFAULT_NAV_FILE = path.join(SCRIPT_DIR, 'gov-job-nav.json');
const DEFAULT_TOPICS_FILE = path.join(SCRIPT_DIR, 'topics-index.json');
const DEFAULT_OUTPUT_DIR = path.resolve(SCRIPT_DIR, '../../services/server/site-data-json/govt-job');
const DEFAULT_DONE_FILE = path.join(SCRIPT_DIR, 'batch-extract-done.txt');
const MAX_HTML_BYTES = 400 * 1024 * 1024;

function parseArgs(args) {
  const options = {
    inputDir: DEFAULT_INPUT_DIR,
    navFile: DEFAULT_NAV_FILE,
    topicsFile: DEFAULT_TOPICS_FILE,
    outputDir: DEFAULT_OUTPUT_DIR,
    doneFile: DEFAULT_DONE_FILE,
    dryRun: false,
    force: false
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--force') {
      options.force = true;
    } else if (['--input', '--nav', '--topics', '--output', '--done-file'].includes(arg)) {
      const value = args[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`Expected a path after ${arg}.`);
      index += 1;
      const key = {
        '--input': 'inputDir',
        '--nav': 'navFile',
        '--topics': 'topicsFile',
        '--output': 'outputDir',
        '--done-file': 'doneFile'
      }[arg];
      options[key] = path.resolve(value);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node batch-extract.js [options]

Extract all question arrays from HTML files and append them to topic mcqs.json files.

Options:
  --input DIR       HTML directory (default: ./html)
  --nav FILE        Navigation tree (default: ./gov-job-nav.json)
  --topics FILE     Generated topic index (default: ./topics-index.json)
  --output DIR      Site-data-json root containing bcs/ (default: ../../services/server/site-data-json/govt-job)
  --done-file FILE  Completed-input log (default: ./batch-extract-done.txt)
  --dry-run         Parse and report without writing output or the completion log
  --force           Reprocess logged files; existing MCQs are still deduplicated
  -h, --help        Show this help
`);
}

async function readHtmlBuffer(file) {
  const chunks = [];
  let bytesRead = 0;
  const stream = createReadStream(file, { highWaterMark: 1024 * 1024 });

  for await (const chunk of stream) {
    const remaining = MAX_HTML_BYTES - bytesRead;
    if (remaining <= 0) break;
    const accepted = chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
    chunks.push(accepted);
    bytesRead += accepted.length;
    if (bytesRead >= MAX_HTML_BYTES) break;
  }

  return {
    buffer: Buffer.concat(chunks, bytesRead),
    truncated: statSync(file).size > bytesRead
  };
}

function decodeBase64Json(encoded) {
  const clean = encoded.replace(/\s+/g, '');
  const variants = [
    clean,
    clean.replace(/={0,2}$/, ''),
    clean.replace(/={0,2}$/, '='),
    clean.replace(/={0,2}$/, '==')
  ];

  for (const variant of variants) {
    try {
      const decoded = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.from(variant, 'base64'));
      if (!decoded.trimStart().startsWith('{')) continue;
      const data = JSON.parse(decoded);
      const question = data?.question;
      if (question && typeof question === 'object' && !Array.isArray(question)) {
        const subjectKeys = Object.keys(question).filter(key => Array.isArray(question[key]) && question[key].length > 0);
        if (subjectKeys.length) return { data, subjectKeys };
      }
    } catch {
      // A Flight row can contain non-JSON base64; keep looking for the exam payload.
    }
  }

  return null;
}

function extractPayload(html) {
  const candidates = [];
  const bySize = /([0-9a-z]+):T([0-9a-f]+),/gi;
  let match;

  while ((match = bySize.exec(html)) !== null) {
    const encodedLength = Number.parseInt(match[2], 16);
    if (!Number.isSafeInteger(encodedLength) || encodedLength < 30) continue;
    const start = bySize.lastIndex;
    const encoded = html.slice(start, start + encodedLength);
    if (encoded.length !== encodedLength) continue;
    const result = decodeBase64Json(encoded);
    if (result) return { ...result, recordId: match[1], pattern: 'flight-by-size' };
    candidates.push({ start, end: start + encodedLength });
  }

  const fallbackPatterns = [
    {
      pattern: 'flight-strict',
      regex: /([0-9a-z]+):T[0-9a-f]+,([A-Za-z0-9+/]+?={1,2})(?=[0-9a-z]+:|[^A-Za-z0-9+/=]|$)/gi
    },
    {
      pattern: 'flight-optional-padding',
      regex: /([0-9a-z]+):T[0-9a-f]+,([A-Za-z0-9+/]{40,}={0,2})(?=[0-9a-z]+:|[^A-Za-z0-9+/=]|$)/gi
    },
    {
      pattern: 'bare-eyJ',
      regex: /(eyJ[A-Za-z0-9+/]{100,}={0,2})/g
    }
  ];

  for (const { pattern, regex } of fallbackPatterns) {
    while ((match = regex.exec(html)) !== null) {
      const encoded = pattern === 'bare-eyJ' ? match[1] : match[2];
      const result = decodeBase64Json(encoded);
      if (result) {
        return {
          ...result,
          recordId: pattern === 'bare-eyJ' ? '(inline)' : match[1],
          pattern
        };
      }
    }
  }

  const candidateCount = candidates.length;
  throw new Error(candidateCount
    ? `Found ${candidateCount} size-marked Flight row(s), but none contained a non-empty data.question array.`
    : 'No decodable Next.js Flight payload containing a non-empty data.question array was found.');
}

function normalizeLabel(value) {
  return String(value)
    .normalize('NFC')
    .replace(/&/g, ' and ')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
}

function getBcsTopicNodes(navData) {
  if (!Array.isArray(navData?.nav)) throw new Error('Navigation file must contain a "nav" array.');
  const bcs = navData.nav.find(item => item?.id === 'bcs');
  if (!Array.isArray(bcs?.children)) throw new Error('Navigation tree does not contain a BCS topic list.');
  const nodes = [];
  nodes.push(bcs);
  const visit = children => {
    for (const node of children) {
      nodes.push(node);
      if (Array.isArray(node.children)) visit(node.children);
    }
  };
  visit(bcs.children);
  return nodes;
}

function createTopicResolver(navData, topicsIndex) {
  const labelToId = new Map();
  for (const node of getBcsTopicNodes(navData)) {
    const indexed = topicsIndex?.[node.id];
    if (!indexed || !Array.isArray(indexed.path) || indexed.path[0] !== 'bcs') {
      throw new Error(`Topic "${node.id}" is missing a valid BCS path in topics-index.json.`);
    }

    for (const label of [node.id, node.label?.en, node.label?.bn]) {
      if (!label) continue;
      const normalized = normalizeLabel(label);
      const previous = labelToId.get(normalized);
      if (!previous || indexed.path.length < topicsIndex[previous].path.length) {
        labelToId.set(normalized, node.id);
      }
    }
  }

  const root = topicsIndex.bcs;
  if (!root || !Array.isArray(root.path) || root.path[0] !== 'bcs') {
    throw new Error('BCS root is missing a valid path in topics-index.json.');
  }

  return subject => {
    const topicId = labelToId.get(normalizeLabel(subject));
    if (!topicId) return { id: 'bcs', path: root.path, fallback: true };
    return { id: topicId, path: topicsIndex[topicId].path, fallback: false };
  };
}

function stableHash(value) {
  return createHash('sha256').update(value).digest('hex').slice(0, 20);
}

function questionIdentity(examId, sourceSubject, question) {
  const originalId = question?.id;
  const identity = originalId == null
    ? JSON.stringify([
      question?.question ?? '',
      question?.option1 ?? '',
      question?.option2 ?? '',
      question?.option3 ?? '',
      question?.option4 ?? '',
      question?.answer ?? '',
      question?.exp ?? ''
    ])
    : String(originalId);
  return `${String(examId ?? '')}\u0000${sourceSubject}\u0000${identity}`;
}

function makeMcq(data, examId, sourceSubject, question, serial) {
  const identity = questionIdentity(examId, sourceSubject, question);
  const mcqId = `abufc_lmcq_${stableHash(identity)}`;
  const explanation = question.exp || '';

  return {
    id: mcqId,
    type: 'mcq',
    topicId: '',
    serial,
    content: question.question || '',
    marks: 1,
    classLevel: 'BCS Preliminary',
    subject: 'BCS',
    difficulty: 'medium',
    tags: [
      'bcs',
      data.type ? String(data.type).toLowerCase().replace(/_/g, '-') : 'daily-quiz',
      String(sourceSubject).toLowerCase()
    ],
    options: [1, 2, 3, 4].map(index => ({
      id: `abufc_lmcq_${stableHash(`${identity}\u0000option-${index}`)}`,
      text: question[`option${index}`] || '',
      isCorrect: String(index) === String(question.answer ?? '')
    })),
    explanation: { easy: explanation, medium: explanation, hard: explanation },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    meta: {
      examId,
      examName: data.examname,
      sourceSubject,
      originalQuestionId: question.id,
      ...(question.is_audio ? {
        audio: {
          questionDuration: question.question_duration,
          answerDuration: question.answer_duration,
          explainDuration: question.explain_duration
        }
      } : {})
    }
  };
}

function readDoneFiles(doneFile) {
  if (!existsSync(doneFile)) return new Set();
  return new Set(readFileSync(doneFile, 'utf8')
    .split(/\r?\n/)
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('\t', 1)[0]));
}

function readMcqFile(file) {
  if (!existsSync(file)) return [];
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error(`${file} must contain a JSON array.`);
  return parsed;
}

function writeJsonAtomically(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.${process.pid}.tmp`;
  writeFileSync(temporaryFile, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  renameSync(temporaryFile, file);
}

function appendDoneEntry(doneFile, relativeFile, examId, questionCount, addedCount) {
  if (!existsSync(doneFile)) {
    writeFileSync(doneFile,
      '# LiveMCQ batch extraction completion log\n' +
      '# source HTML\texam ID\tquestions found\tnew MCQs appended\tcompleted at (UTC)\n',
      'utf8');
  }
  writeFileSync(doneFile,
    `${relativeFile}\t${examId ?? ''}\t${questionCount}\t${addedCount}\t${new Date().toISOString()}\n`,
    { encoding: 'utf8', flag: 'a' });
}

async function processFile(file, relativeFile, options, resolveTopic) {
  const { buffer, truncated } = await readHtmlBuffer(file);
  const html = buffer.toString('utf8');
  const { data, subjectKeys, recordId, pattern } = extractPayload(html);
  const examId = data.exam_id ?? path.basename(file, path.extname(file));
  const routed = [];
  const fallbackSubjects = [];

  for (const sourceSubject of subjectKeys) {
    const topic = resolveTopic(sourceSubject);
    if (topic.fallback) fallbackSubjects.push(sourceSubject);
    const questions = data.question[sourceSubject];
    for (const question of questions) routed.push({ topic, sourceSubject, question });
  }

  if (!routed.length) throw new Error('No questions were routed to a BCS topic.');

  const grouped = new Map();
  for (const item of routed) {
    const outputFile = path.join(options.outputDir, ...item.topic.path, 'mcqs.json');
    if (!grouped.has(outputFile)) grouped.set(outputFile, []);
    grouped.get(outputFile).push(item);
  }

  let addedCount = 0;
  for (const [outputFile, items] of grouped) {
    const existing = readMcqFile(outputFile);
    const seenIds = new Set(existing.map(mcq => mcq?.id).filter(Boolean));
    const seenSourceQuestions = new Set(existing
      .filter(mcq => mcq?.meta?.examId != null && mcq?.meta?.originalQuestionId != null)
      .map(mcq => questionIdentity(mcq.meta.examId, mcq.meta.sourceSubject, { id: mcq.meta.originalQuestionId })));
    const topicId = path.basename(path.dirname(outputFile));
    let nextSerial = existing.reduce((max, mcq) => Math.max(max, Number(mcq?.serial) || 0), 0) + 1;
    const additions = [];

    for (const { topic, sourceSubject, question } of items) {
      const identity = questionIdentity(examId, sourceSubject, question);
      const mcq = makeMcq(data, examId, sourceSubject, question, nextSerial);
      mcq.topicId = topicId || topic.id;
      if (seenIds.has(mcq.id) || seenSourceQuestions.has(identity)) continue;
      seenIds.add(mcq.id);
      seenSourceQuestions.add(identity);
      additions.push(mcq);
      nextSerial += 1;
    }

    if (additions.length && !options.dryRun) writeJsonAtomically(outputFile, [...existing, ...additions]);
    addedCount += additions.length;
  }

  return {
    examId,
    questionCount: routed.length,
    addedCount,
    recordId,
    pattern,
    fallbackSubjects: [...new Set(fallbackSubjects)],
    truncated
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  for (const file of [options.navFile, options.topicsFile]) {
    if (!existsSync(file)) throw new Error(`Required file not found: ${file}`);
  }
  if (!existsSync(options.inputDir)) throw new Error(`HTML input directory not found: ${options.inputDir}`);

  const navData = JSON.parse(readFileSync(options.navFile, 'utf8'));
  const topicsIndex = JSON.parse(readFileSync(options.topicsFile, 'utf8'));
  const resolveTopic = createTopicResolver(navData, topicsIndex);
  const doneFiles = readDoneFiles(options.doneFile);
  const files = readdirSync(options.inputDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.html?$/i.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .filter(name => options.force || !doneFiles.has(name));

  if (!files.length) {
    console.log(options.force
      ? 'No HTML files found in the input directory.'
      : 'No unprocessed HTML files. Use --force to reprocess logged files (existing MCQs are deduplicated).');
    return;
  }

  console.log(`${options.dryRun ? 'Dry run: ' : ''}processing ${files.length} HTML file(s).`);
  console.log(`Input : ${options.inputDir}`);
  console.log(`Output: ${options.outputDir}`);
  if (options.dryRun) console.log('Dry run does not change MCQ files or the completion log.');

  let completed = 0;
  let failed = 0;
  let foundQuestions = 0;
  let addedQuestions = 0;

  for (const name of files) {
    const file = path.join(options.inputDir, name);
    try {
      const result = await processFile(file, name, options, resolveTopic);
      foundQuestions += result.questionCount;
      addedQuestions += result.addedCount;
      if (!options.dryRun && !doneFiles.has(name)) {
        appendDoneEntry(options.doneFile, name, result.examId, result.questionCount, result.addedCount);
        doneFiles.add(name);
      }
      completed += 1;
      console.log(
        `OK ${name}: ${result.questionCount} question(s), ${result.addedCount} new; ` +
        `exam ${result.examId}, Flight ${result.recordId}/${result.pattern}` +
        (result.fallbackSubjects.length ? `; BCS-root fallback: ${result.fallbackSubjects.join(', ')}` : '') +
        (result.truncated ? ` (read first ${MAX_HTML_BYTES} bytes)` : '')
      );
    } catch (error) {
      failed += 1;
      console.error(`ERROR ${name}: ${error.message}`);
    }
  }

  console.log(`\nSummary: ${completed} completed, ${failed} failed, ${foundQuestions} questions found, ${addedQuestions} new MCQs.`);
  if (failed) process.exitCode = 1;
}

main().catch(error => {
  console.error(`Fatal: ${error.message}`);
  process.exitCode = 1;
});
