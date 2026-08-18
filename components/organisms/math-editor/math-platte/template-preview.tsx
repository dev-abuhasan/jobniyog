"use client";

import React, { useRef, useEffect } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import { Template } from "@/services/types";
import { getDefaultLatex } from "../math-editor-utils";

export function TemplatePreview({ template }: { template: Template }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const latex = getDefaultLatex(template);
            containerRef.current.innerHTML = `$$${latex}$$`;
            try {
                renderMathInElement(containerRef.current, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                    ],
                    throwOnError: false,
                });
            } catch {
                containerRef.current.innerHTML = `<span class="text-red-500 text-xs">Error</span>`;
            }
        }
    }, [template]);

    return (
        <div
            ref={containerRef}
            className="text-sm text-gray-700 min-h-6 flex items-center justify-center overflow-x-auto"
        />
    );
}