import React, { RefObject, useEffect, useRef } from "react";
import type { MCQOption, QuestionType } from "@/services/types";
import renderMathInElement from "katex/contrib/auto-render";

interface PreviewSectionProps {
    showPreview: boolean;
    content: string;
    explanation: string;
    previewRef: RefObject<HTMLDivElement | null>;
    explanationPreviewRef: RefObject<HTMLDivElement | null>;
    questionType: QuestionType;
    options: MCQOption[];
}

export default function PreviewSection({
    showPreview,
    content,
    explanation,
    previewRef,
    explanationPreviewRef,
    questionType,
    options,
}: PreviewSectionProps) {
    const optionsContainerRef = useRef<HTMLDivElement>(null);

    // Render math in question
    useEffect(() => {
        if (showPreview && previewRef.current) {
            const timer = setTimeout(() => {
                try {
                    renderMathInElement(previewRef.current!, {
                        delimiters: [
                            { left: "$$", right: "$$", display: true },
                            { left: "$", right: "$", display: false },
                        ],
                        throwOnError: false,
                    });
                } catch (error) {
                    console.warn("KaTeX rendering error in question:", error);
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [showPreview, content, previewRef]);

    // Render math in explanation
    useEffect(() => {
        if (showPreview && explanationPreviewRef.current && explanation) {
            const timer = setTimeout(() => {
                try {
                    renderMathInElement(explanationPreviewRef.current!, {
                        delimiters: [
                            { left: "$$", right: "$$", display: true },
                            { left: "$", right: "$", display: false },
                        ],
                        throwOnError: false,
                    });
                } catch (error) {
                    console.warn("KaTeX rendering error in explanation:", error);
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [showPreview, explanation, explanationPreviewRef]);

    // Render math in options
    useEffect(() => {
        if (showPreview && optionsContainerRef.current) {
            const timer = setTimeout(() => {
                try {
                    renderMathInElement(optionsContainerRef.current!, {
                        delimiters: [
                            { left: "$$", right: "$$", display: true },
                            { left: "$", right: "$", display: false },
                        ],
                        throwOnError: false,
                    });
                } catch (error) {
                    console.warn("KaTeX rendering error in options:", error);
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [showPreview, options]);

    if (!showPreview) return null;

    return (
        <div className="p-6 pt-0">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
                {/* Question Preview */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Question Preview</h3>
                    <div
                        ref={previewRef}
                        className="prose max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* Options Preview */}
                {questionType === "mcq" && options.length > 0 && (
                    <div>
                        <h4 className="text-md font-medium text-gray-700 mb-3">Options:</h4>
                        <div ref={optionsContainerRef} className="space-y-2">
                            {options.map((option, index) => (
                                <div
                                    key={option.id}
                                    className={`p-3 rounded-md border-2 transition-all ${option.isCorrect
                                            ? "border-green-400 bg-green-50"
                                            : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-700">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        <div
                                            className="flex-1 prose max-w-none text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: option.text || "(Empty)" }}
                                        />
                                        {option.isCorrect && (
                                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                ✓ Correct
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Explanation Preview */}
                {explanation && (
                    <div>
                        <h4 className="text-md font-medium text-gray-700 mb-2">Explanation:</h4>
                        <div
                            ref={explanationPreviewRef}
                            className="prose max-w-none text-gray-800 p-4 bg-blue-50 rounded-lg border border-blue-200"
                            dangerouslySetInnerHTML={{ __html: explanation }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}