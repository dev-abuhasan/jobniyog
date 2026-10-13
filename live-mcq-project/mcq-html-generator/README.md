# MCQ HTML → JSON Generator

## Run
Open `index.html` in a modern browser. No Node.js/server required. Tailwind CSS is loaded from its CDN, so internet access is needed for styling; the generator itself runs locally in the browser.

## Use
1. Save the source webpage as a complete HTML file, or paste its full HTML source.
2. Select the file or paste the HTML.
3. Optionally set the payload `subjectKey`; leave it blank to extract every subject array.
4. Click **Generate MCQs**.
5. Preview, then click **Download JSON**.

The extraction logic follows the supplied Node.js script and expects a quoted Next.js Flight payload matching `"2d:T<hex>,<base64>"`, which decodes to JSON with `data.question[subjectKey]`.

This tool does not log in to websites or make network requests. Use only HTML you are authorized to save and process. Website internals can change, so validate generated output before importing it into another project.

## Bulk extraction with Node.js

For a directory of saved pages, run the batch extractor from the project root:

```sh
node live-mcq-project/page-wise-data/batch-extract.js --dry-run
node live-mcq-project/page-wise-data/batch-extract.js
```

The script reads every `.html` file in `live-mcq-project/page-wise-data/html/`, uses `gov-job-nav.json` and `topics-index.json` to route every non-empty subject array into `bcs/<topic>/mcqs.json`, and appends new questions without duplicating previously imported questions. Subject labels that do not match a BCS topic are placed in `bcs/mcqs.json` so they are retained without being assigned to a potentially incorrect subject. Its default output is `services/server/site-data-json/govt-job/`; use `--output DIR` to choose a different site-data root. Completed source files are recorded in `live-mcq-project/page-wise-data/batch-extract-done.txt`; failed files are not marked complete and can be retried. `--force` reprocesses logged files while still deduplicating MCQs.

The extractor reads input HTML as a stream and keeps at most the first 400 MB in memory. Next.js Flight payloads are expected near the beginning of each saved page.
