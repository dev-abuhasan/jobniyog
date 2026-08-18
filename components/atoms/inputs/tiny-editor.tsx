"use client";

import { Editor } from "@tinymce/tinymce-react";
import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { TinyEditorProps, TinyMCEEditor, KaTeXWindow, TinyEditorRef } from "@/services/types";

const TINY_PLUGINS = [
  "advlist", "autolink", "lists", "link", "image", "charmap",
  "preview", "searchreplace", "visualblocks", "code", "fullscreen",
  "insertdatetime", "media", "table", "help", "wordcount"
];

const TinyEditor = forwardRef<TinyEditorRef, TinyEditorProps>(
  function TinyEditor(
    {
      value,
      onChange,
      height = 320,
      placeholder = "Write your math content here...",
      disabled = false,
    },
    ref
  ) {
    const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY as string;
    const editorRef = useRef<TinyMCEEditor | null>(null);

    // Load KaTeX renderer (for preview inside the editor)
    useEffect(() => {
      if (typeof window !== 'undefined' && !window.renderMathInElement) {
        window.renderMathInElement = function () { };
      }
    }, []);

    // Render math in editor using KaTeX auto-render
    const renderEditorMath = useCallback((editor: TinyMCEEditor): void => {
      try {
        const body = editor.getBody();
        const win = editor.getWin() as KaTeXWindow;
        if (win?.renderMathInElement) {
          win.renderMathInElement(body, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false }
            ],
            throwOnError: false
          });
        }
      } catch (error) {
        console.warn('Math rendering error:', error);
      }
    }, []);

    // Insert content helper (used by parent via ref)
    const insertContent = useCallback((content: string) => {
      const editor = editorRef.current;
      if (editor) {
        editor.insertContent(content);
        renderEditorMath(editor);
      }
    }, [renderEditorMath]);

    // Insert inline math (wraps LaTeX in <span class="math-tex">$...$</span>)
    const insertMath = useCallback((latex: string) => {
      const content = `<span class="math-tex">$${latex}$</span>`;
      insertContent(content);
    }, [insertContent]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      insertContent,
      insertMath,
      getContent: () => editorRef.current?.getContent() || "",
    }), [insertContent, insertMath]);

    // Setup editor – only basic events, no custom math buttons
    const setupEditor = useCallback((editor: TinyMCEEditor): void => {
      editorRef.current = editor;

      // Re‑render math on any change
      editor.on("init", () => renderEditorMath(editor));
      editor.on("NodeChange", () => renderEditorMath(editor));
      editor.on("KeyUp", () => renderEditorMath(editor));
      editor.on("Change", () => renderEditorMath(editor));

      // No custom math buttons or shortcuts – they are all moved to the unified palette.
    }, [renderEditorMath]);

    // Simplified toolbar – only basic formatting
    const toolbar = [
      "undo redo | formatselect | bold italic underline strikethrough |",
      "alignleft aligncenter alignright alignjustify |",
      "bullist numlist outdent indent |",
      "link image table | removeformat code"
    ].join('');

    return (
      <div className="relative">
        <Editor
          key="tiny-editor"
          apiKey={apiKey}
          value={value}
          onEditorChange={(val: string) => onChange(val)}
          disabled={disabled}
          init={{
            height,
            menubar: false,
            branding: false,
            plugins: TINY_PLUGINS,
            toolbar,
            toolbar_mode: "sliding",
            skin: "oxide",
            content_css: "default",
            placeholder,
            content_style: `
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.8;
                color: #1a1a1a;
                background-color: #ffffff;
                padding: 20px;
                min-height: ${height}px;
              }
              .math-tex {
                background-color: #f0f7ff;
                padding: 2px 8px;
                border-radius: 4px;
                color: #0369a1;
                font-family: 'Courier New', monospace;
                font-weight: 600;
                display: inline-block;
                margin: 0 2px;
              }
              div.math-tex {
                display: block;
                text-align: center;
                padding: 16px;
                margin: 8px 0;
                background-color: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
              }
              .math-error {
                color: #dc2626;
                background-color: #fef2f2;
                padding: 2px 8px;
                border-radius: 4px;
                font-family: monospace;
              }
              .mcq-option {
                display: block;
                padding: 8px 16px;
                margin: 4px 0;
                background-color: #f8fafc;
                border-left: 4px solid #3b82f6;
                border-radius: 4px;
              }
              .mcq-correct {
                border-left-color: #22c55e;
                background-color: #f0fdf4;
              }
              .question-marks {
                display: inline-block;
                padding: 2px 12px;
                background-color: #fef3c7;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                color: #92400e;
              }
            `,
            extended_valid_elements: "span[*],div[*],p[*],br[*],strong[*],em[*],u[*],strike[*]",
            verify_html: false,
            valid_children: "+span[div],+div[span]",
            setup: (editor: TinyMCEEditor) => setupEditor(editor),
          }}
        />
      </div>
    );
  }
);

TinyEditor.displayName = 'TinyEditor';

export default TinyEditor;