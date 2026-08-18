"use client";
import React, { useState } from "react";
import MathVisualInput from "../molecules/math-visual-input";

type UniversalMathCreatorProps = {
    role?: "admin" | "user"; // Determines the tool access level
    initialValue?: string;
    onSave?: (content: string) => void;
};

export default function UniversalMathCreator({
    role = "user", // Defaults to a safe standard generic user experience
    initialValue = "",
    onSave
}: UniversalMathCreatorProps): React.JSX.Element {

    const [mathPostText, setMathPostText] = useState<string>(
        initialValue || (role === "admin"
            ? "Solve the formula: $$x = \\frac{a}{b}$$"
            : "Type your math answer here... Example: $E = mc^2$")
    );

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
    const [currentLang, setCurrentLang] = useState<"en" | "bn">("en");

    const handlePublish = () => {
        if (onSave) {
            onSave(mathPostText);
        } else {
            alert(currentLang === "bn" ? "পোস্ট সফলভাবে সংরক্ষিত হয়েছে!" : "Post successfully saved!");
        }
    };

    // UI Localizations based on role and language
    const dictionary = {
        en: {
            title: role === "admin" ? "Admin Panel: Content Creator" : "User Portal: Submit Response",
            submitBtn: role === "admin" ? "Publish Article" : "Submit Answer",
        },
        bn: {
            title: role === "admin" ? "অ্যাডমিন প্যানেল: কন্টেন্ট ক্রিয়েটর" : "ইউজার পোর্টাল: উত্তর সাবমিট করুন",
            submitBtn: role === "admin" ? "আর্টিকেল পাবলিশ করুন" : "উত্তর জমা দিন",
        }
    };

    const labels = dictionary[currentLang];
    const isDark = currentTheme === "dark";

    return (
        <div className={`min-h-screen p-8 transition-colors duration-200 ${"bg-slate-100 text-slate-800"}`}>
            <div className="max-w-xl mx-auto space-y-4">

                {/* Dynamic Action Header Controls */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div>
                        <h1 className="text-sm font-bold">{labels.title}</h1>
                        <p className="text-[11px] font-medium text-slate-400 capitalize">
                            Role: <span className={role === "admin" ? "text-red-500" : "text-emerald-500"}>{role}</span>
                        </p>
                    </div>
                </div>

                {/* Universal Input Handler */}
                {/* Note: Update your MathVisualInput to accept an optional 'role' prop if you want to conditionally hide advanced pads for 'user' tier */}
                <MathVisualInput
                    value={mathPostText}
                    onChange={setMathPostText}
                    theme={currentTheme}
                    language={currentLang}
                // role={role} <- Pass role downwards to strip button groups if user role is active
                />

                {/* Submit Execution Block */}
                <div className="flex justify-end">
                    <button
                        onClick={handlePublish}
                        className={`w-full sm:w-auto px-6 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition ${role === "admin"
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            }`}
                    >
                        {labels.submitBtn}
                    </button>
                </div>

            </div>
        </div>
    );
}
