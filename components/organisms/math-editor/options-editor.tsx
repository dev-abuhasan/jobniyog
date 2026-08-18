"use client";

import React, { useState, useRef } from "react";
import type { MCQOption, TinyEditorRef } from "@/services/types";
import { TinyEditorDynamic } from "@/components/templates/dynamic-import";
import MathPalette from "./math-platte";

interface OptionsEditorProps {
    options: MCQOption[];
    addOption: () => void;
    removeOption: (id: string) => void;
    updateOptionText: (id: string, text: string) => void;
    toggleCorrectAnswer: (id: string) => void;
}

export default function OptionsEditor({
    options,
    addOption,
    removeOption,
    updateOptionText,
    toggleCorrectAnswer,
}: OptionsEditorProps) {
    const optionRefs = useRef<Map<string, TinyEditorRef | null>>(new Map());
    const [mathTargetRef, setMathTargetRef] = useState<React.RefObject<TinyEditorRef | null> | null>(null);
    const [showMathPalette, setShowMathPalette] = useState(false);

    const openMathPalette = (optionId: string) => {
        const ref = optionRefs.current.get(optionId);
        // Create a ref object that points to the editor instance
        const refObj = {
            current: ref || null,
        } as React.RefObject<TinyEditorRef | null>;
        setMathTargetRef(refObj);
        setShowMathPalette(true);
    };

    const closeMathPalette = () => {
        setShowMathPalette(false);
        setMathTargetRef(null);
    };

    return (
        <div className="p-6 pt-0 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Options</h3>
                {options.length < 6 && (
                    <button
                        onClick={addOption}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        type="button"
                    >
                        + Add Option
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {options.map((option, index) => (
                    <div
                        key={option.id}
                        className="flex items-start gap-3 p-3 border rounded-md bg-white hover:shadow-sm transition-shadow"
                    >
                        <span className="text-sm font-medium text-gray-500 w-8 mt-2">
                            {String.fromCharCode(65 + index)}
                        </span>
                        <div className="flex-1">
                            <TinyEditorDynamic
                                ref={(ref) => {
                                    if (ref) {
                                        optionRefs.current.set(option.id, ref);
                                    } else {
                                        optionRefs.current.delete(option.id);
                                    }
                                }}
                                value={option.text}
                                onChange={(text) => updateOptionText(option.id, text)}
                                height={80}
                                placeholder={`Option ${index + 1}`}
                            />
                        </div>
                        <button
                            onClick={() => openMathPalette(option.id)}
                            className="px-2 py-1 text-sm bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 text-blue-600 mt-1"
                            type="button"
                            title="Insert math"
                        >
                            Σ Insert Math
                        </button>
                        <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <input
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={() => toggleCorrectAnswer(option.id)}
                                className="rounded border-gray-300 bg-white text-blue-600 focus:ring-blue-500"
                            />
                            Correct
                        </label>
                        {options.length > 2 && (
                            <button
                                onClick={() => removeOption(option.id)}
                                className="text-red-400 hover:text-red-600 mt-1"
                                type="button"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Full MathPalette – same as used for question/explanation */}
            <MathPalette
                isOpen={showMathPalette}
                onClose={closeMathPalette}
                targetRef={mathTargetRef}
            />
        </div>
    );
}