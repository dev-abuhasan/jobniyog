"use client";

import React, { useState, useRef } from "react";
import MathRenderer from "../atoms/math-renderer";

type MathVisualInputProps = {
    value: string;
    onChange: (value: string) => void;
    theme?: "light" | "dark";
    language?: "en" | "bn";
};

// Math button data structure
interface MathToken {
    label: string; // Visual icon or representation on button
    snippet: string; // The raw escaped LaTeX command inserted into text
}

export default function MathVisualInput({
    value,
    onChange,
    theme = "light",
    language = "en",
}: MathVisualInputProps): React.JSX.Element {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showPreview, setShowPreview] = useState<boolean>(true);

    // Math action pads grouped by calculation types
    const generalOperators: MathToken[] = [
        { label: "+", snippet: " + " },
        { label: "−", snippet: " - " },
        { label: "×", snippet: " \\times " },
        { label: "÷", snippet: " \\div " },
        { label: "±", snippet: " \\pm " },
        { label: "=", snippet: " = " },
    ];

    const advancedStructures: MathToken[] = [
        { label: "Fraction (¼)", snippet: "\\frac{a}{b}" },
        { label: "Square Root (√)", snippet: "\\sqrt{x}" },
        { label: "Power (x²)", snippet: "x^{2}" },
        { label: "Subscript (x₁)", snippet: "x_{1}" },
        { label: "Integral (∫)", snippet: "\\int_{a}^{b} f(x)dx" },
        { label: "Summation (∑)", snippet: "\\sum_{i=1}^{n}" },
        { label: "Pi (π)", snippet: "\\pi" },
        { label: "Infinity (∞)", snippet: "\\infty" },
    ];

    // UI Strings supporting Localization
    const dictionary = {
        en: {
            placeholder: "Type your text here. Wrap equations in $$ or $ for expressions...",
            operators: "Basic Operators",
            advanced: "Advanced Math Layouts",
            previewTitle: "Live Secure Render Preview",
            togglePreview: "Toggle Preview",
        },
        bn: {
            placeholder: "এখানে টেক্সট লিখুন। গাণিতিক সমীকরণের জন্য $$ বা $ ব্যবহার করুন...",
            operators: "সাধারণ অপারেটরসমূহ",
            advanced: "উন্নত ম্যাথ লেআউট",
            previewTitle: "সুরক্ষিত লাইভ প্রিভিউ",
            togglePreview: "প্রিভিউ পরিবর্তন করুন",
        },
    };

    const text = dictionary[language];

    // Insert LaTeX block at exact cursor location smoothly
    const insertMathSnippet = (snippet: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentText = textarea.value;

        // Splice snippet straight into current cursor location
        const updatedText =
            currentText.substring(0, startPos) +
            snippet +
            currentText.substring(endPos, currentText.length);

        onChange(updatedText);

        // Reposition cursor right after inserted math chunk
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(startPos + snippet.length, startPos + snippet.length);
        }, 10);
    };

    // Dynamic Theme Colors
    const isDark = theme === "dark";
    const bgMain = isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200";
    const bgPad = isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200";
    const textColor = isDark ? "text-slate-100" : "text-slate-800";
    const btnColor = isDark ? "bg-slate-700 hover:bg-slate-600 text-slate-200" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200";

    return (
        <div className={`w-full border rounded-xl p-4 shadow-sm ${bgMain} ${textColor}`}>
            {/* 1. MATH BUTTON PADS SECTION */}
            <div className={`p-3 rounded-lg mb-3 border ${bgPad}`}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-500">
                    {text.operators}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {generalOperators.map((op, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => insertMathSnippet(op.snippet)}
                            className={`px-3 py-1 text-sm font-semibold rounded transition ${btnColor}`}
                        >
                            {op.label}
                        </button>
                    ))}
                </div>

                <p className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-500">
                    {text.advanced}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {advancedStructures.map((struct, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => insertMathSnippet(struct.snippet)}
                            className={`px-2.5 py-1 text-xs font-medium rounded transition ${btnColor}`}
                        >
                            {struct.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. TEXT INPUT AREA */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={text.placeholder}
                rows={5}
                className={`w-full p-3 rounded-lg border outline-none font-mono text-sm transition focus:ring-2 focus:ring-indigo-500 ${isDark
                    ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                    }`}
            />

            {/* 3. PREVIEW SYSTEM */}
            <div className="mt-3 flex justify-between items-center">
                <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition"
                >
                    [{showPreview ? "Hide" : "Show"}] {text.togglePreview}
                </button>
            </div>

            {showPreview && value.trim() && (
                <div className={`mt-3 p-4 border rounded-lg overflow-x-auto ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
                    }`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                        {text.previewTitle}
                    </p>
                    {/* Renders equations locally via serverless hooks styled defensively against copy events */}
                    <MathRenderer text={value} />
                </div>
            )}
        </div>
    );
}
