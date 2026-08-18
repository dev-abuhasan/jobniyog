"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { TEMPLATES, SYMBOLS, QUICK_PIECES } from "../math-constant";
import { FieldValue, Template, TinyEditorRef } from "@/services/types";
import {
    generateLatexRecursive,
    getDefaultFields,
} from "../math-editor-utils";
import { TemplatePreview } from "./template-preview";

// ---------- Sub-components ----------

// Symbols Tab
const SymbolsTab = ({ onInsertSymbol }: { onInsertSymbol: (symbol: string) => void }) => (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {SYMBOLS.map((sym) => (
            <button
                key={sym.label}
                onClick={() => onInsertSymbol(sym.value)}
                className="p-2 text-sm bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded font-mono transition-colors text-gray-800"
            >
                {sym.label}
            </button>
        ))}
    </div>
);

// Recent Templates
const RecentTemplates = ({
    templates,
    selectedName,
    onSelect,
}: {
    templates: Template[];
    selectedName?: string;
    onSelect: (template: Template) => void;
}) => {
    if (templates.length === 0) return null;
    return (
        <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Recent</p>
            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2">
                {templates.map((t) => (
                    <div
                        key={t.name}
                        className={`shrink-0 w-35 p-2 border rounded-lg cursor-pointer transition ${selectedName === t.name
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:bg-gray-50"
                            }`}
                        onClick={() => onSelect(t)}
                    >
                        <div className="text-xs font-medium text-gray-800 text-center truncate">{t.name}</div>
                        <div className="mt-1 min-h-5 flex items-center justify-center overflow-hidden">
                            <TemplatePreview template={t} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// All templates grid
const TemplateList = ({
    templates,
    selectedName,
    onSelect,
}: {
    templates: Template[];
    selectedName?: string;
    onSelect: (template: Template) => void;
}) => (
    <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 mb-4">
        {templates.map((t) => (
            <div
                key={t.name}
                className={`shrink-0 w-45 p-3 border rounded-lg cursor-pointer transition ${selectedName === t.name
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:bg-gray-50"
                    }`}
                onClick={() => onSelect(t)}
            >
                <div className="text-sm font-medium text-gray-800 text-center truncate">{t.name}</div>
                <div className="mt-1 min-h-7.5 flex items-center justify-center overflow-hidden">
                    <TemplatePreview template={t} />
                </div>
            </div>
        ))}
        {templates.length === 0 && <div className="text-sm text-gray-500 py-4">No templates match your criteria.</div>}
    </div>
);

// Quick Pieces bar
const QuickPieces = ({
    onInsertPiece,
    onClearFocus,
}: {
    onInsertPiece: (piece: string) => void;
    onClearFocus: () => void;
}) => (
    <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-xs font-medium text-gray-500 mr-1">Quick:</span>
        {QUICK_PIECES.map((piece) => (
            <button
                key={piece.label}
                onClick={() => onInsertPiece(piece.value)}
                className="px-2 py-0.5 text-xs bg-white border border-gray-300 rounded hover:bg-blue-50 font-mono"
                type="button"
            >
                {piece.label}
            </button>
        ))}
        <button
            onClick={onClearFocus}
            className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            type="button"
        >
            Clear focus
        </button>
    </div>
);

// Editable LaTeX textarea
const EditableLatex = ({
    value,
    onChange,
    onReset,
    showReset,
    textareaRef,
}: {
    value: string;
    onChange: (value: string) => void;
    onReset?: () => void;
    showReset?: boolean;
    textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}) => (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-semibold text-gray-800">LaTeX (editable)</p>
            {showReset && onReset && (
                <button onClick={onReset} className="text-xs text-blue-600 hover:text-blue-800" type="button">
                    Reset to generated
                </button>
            )}
        </div>
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono text-gray-800 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={3}
            spellCheck={false}
        />
    </div>
);

// Preview block
const Preview = ({ previewRef }: { previewRef: React.RefObject<HTMLDivElement | null> }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        <p className="text-sm font-semibold text-gray-800 mb-2">Preview</p>
        <div
            ref={previewRef}
            className="p-3 bg-white rounded border border-gray-200 min-h-15 flex items-center justify-center text-gray-800 overflow-x-auto"
        />
    </div>
);

// ---------- Main MathPalette component ----------
interface MathPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    targetRef?: React.RefObject<TinyEditorRef | null> | null;
}

export default function MathPalette({ isOpen, onClose, targetRef }: MathPaletteProps) {
    // ---------- State ----------
    const [activeTab, setActiveTab] = useState<"symbols" | "templates">("templates");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [rootFields, setRootFields] = useState<Record<string, FieldValue>>({});
    const [editingPath, setEditingPath] = useState<string[] | null>(null);
    const [showNestedPicker, setShowNestedPicker] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [customLatex, setCustomLatex] = useState<string>("");
    const [focusedFieldPath, setFocusedFieldPath] = useState<string[] | null>(null);
    const [recentTemplates, setRecentTemplates] = useState<Template[]>([]);

    const latexTextareaRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // ---------- Load recent templates from localStorage after mount ----------
    useEffect(() => {
        try {
            const stored = localStorage.getItem("math_recent_templates");
            if (stored) {
                const names = JSON.parse(stored) as string[];
                const recent = names
                    .map((name) => TEMPLATES.find((t) => t.name === name))
                    .filter(Boolean) as Template[];
                setRecentTemplates(recent);
            }
        } catch (e) {
            console.warn("Failed to load recent templates:", e);
        }
    }, []);

    // ---------- Update recent templates ----------
    const updateRecent = (template: Template) => {
        setRecentTemplates((prev) => {
            const filtered = prev.filter((t) => t.name !== template.name);
            const updated = [template, ...filtered].slice(0, 5);
            try {
                localStorage.setItem("math_recent_templates", JSON.stringify(updated.map((t) => t.name)));
            } catch (e) {
                console.warn("Failed to save recent templates:", e);
            }
            return updated;
        });
    };

    // ---------- Insert math ----------
    const insertMath = useCallback((latex: string) => {
        const editor = targetRef?.current;
        if (editor) {
            const content = `<span class="math-tex">$${latex}$</span>`;
            editor.insertContent(content);
            onClose();
        } else {
            console.warn("No target editor ref provided.");
        }
    }, [targetRef, onClose]);

    const insertSymbol = (symbol: string) => {
        insertMath(symbol);
    };

    // ---------- Template selection ----------
    const handleSelectTemplate = (template: Template) => {
        setSelectedTemplate(template);
        const defaultFields = getDefaultFields(template);
        setRootFields(defaultFields);
        const latex = generateLatexRecursive(template, defaultFields);
        setCustomLatex(latex);
        setEditingPath(null);
        setShowNestedPicker(false);
        setFocusedFieldPath(null);
        updateRecent(template);
    };

    // ---------- Update field ----------
    const updateField = (path: string[], newValue: FieldValue) => {
        setRootFields((prev) => {
            const newTree = { ...prev };
            let current: Record<string, FieldValue> = newTree;
            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                const node = current[key];
                if (node?.type !== "template") {
                    const template = TEMPLATES.find((t) => t.name === "Fraction")!;
                    current[key] = { type: "template", template, fields: getDefaultFields(template) };
                }
                current = (current[key] as { type: "template"; fields: Record<string, FieldValue> }).fields;
            }
            const lastKey = path[path.length - 1];
            current[lastKey] = newValue;
            return newTree;
        });
    };

    const handleFieldTextChange = useCallback((path: string[], value: string) => {
        updateField(path, { type: "text", value });
        if (selectedTemplate) {
            const newRoot = { ...rootFields };
            let current: Record<string, FieldValue> = newRoot;
            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                const node = current[key];
                if (node?.type !== "template") break;
                current = node.fields;
            }
            const lastKey = path[path.length - 1];
            current[lastKey] = { type: "text", value };
            const newLatex = generateLatexRecursive(selectedTemplate, newRoot);
            setCustomLatex(newLatex);
        }
    }, [rootFields, selectedTemplate]);

    const insertSymbolIntoField = useCallback((path: string[], symbol: string) => {
        let currentValue = "";
        let current: Record<string, FieldValue> = rootFields;
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            const node = current[key];
            if (node?.type !== "template") return;
            current = node.fields;
        }
        const lastKey = path[path.length - 1];
        const field = current[lastKey];
        if (field?.type === "text") {
            currentValue = field.value;
        }
        const newValue = currentValue ? `${currentValue} ${symbol}` : symbol;
        handleFieldTextChange(path, newValue);
        setShowNestedPicker(false);
        setEditingPath(null);
    }, [handleFieldTextChange, rootFields]);

    // ---------- Nested template handling ----------
    const handleOpenNestedPicker = (path: string[]) => {
        setEditingPath(path);
        setShowNestedPicker(true);
    };

    const handleInsertNestedTemplate = useCallback((nestedTemplate: Template) => {
        if (!editingPath) return;
        const defaultFields = getDefaultFields(nestedTemplate);
        updateField(editingPath, {
            type: "template",
            template: nestedTemplate,
            fields: defaultFields,
        });
        if (selectedTemplate) {
            const newLatex = generateLatexRecursive(selectedTemplate, rootFields);
            setCustomLatex(newLatex);
        }
        setShowNestedPicker(false);
        setEditingPath(null);
        updateRecent(nestedTemplate);
    }, [editingPath, rootFields, selectedTemplate]);

    const handleClearNested = useCallback((path: string[]) => {
        updateField(path, { type: "text", value: "" });
        if (selectedTemplate) {
            const newLatex = generateLatexRecursive(selectedTemplate, rootFields);
            setCustomLatex(newLatex);
        }
    }, [rootFields, selectedTemplate]);

    const generateLatex = useCallback((): string => {
        if (!selectedTemplate) return "";
        return generateLatexRecursive(selectedTemplate, rootFields);
    }, [selectedTemplate, rootFields]);

    const handleInsertTemplate = () => {
        const latexToInsert = customLatex.trim() || generateLatex();
        if (latexToInsert) insertMath(latexToInsert);
    };

    // ---------- Auto-render preview ----------
    useEffect(() => {
        if (activeTab === "templates" && previewRef.current) {
            const latex = customLatex || generateLatex();
            previewRef.current.innerHTML = `<div class="math-display">$$${latex}$$</div>`;
            try {
                renderMathInElement(previewRef.current, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                    ],
                    throwOnError: false,
                });
            } catch {
                previewRef.current.innerHTML = `<span class="text-red-600">Error rendering math</span>`;
            }
        }
    }, [activeTab, selectedTemplate, rootFields, customLatex, generateLatex]);

    // ---------- Update customLatex when fields change ----------
    useEffect(() => {
        if (selectedTemplate) {
            const generated = generateLatex();
            if (latexTextareaRef.current && document.activeElement !== latexTextareaRef.current) {
                setCustomLatex(generated);
            }
        }
    }, [selectedTemplate, rootFields, generateLatex]);

    // ---------- Quick piece insertion ----------
    const insertQuickPiece = (piece: string) => {
        if (focusedFieldPath) {
            insertSymbolIntoField(focusedFieldPath, piece);
        } else {
            const textarea = latexTextareaRef.current;
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const current = customLatex;
                const newLatex = current.substring(0, start) + piece + current.substring(end);
                setCustomLatex(newLatex);
                setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(start + piece.length, start + piece.length);
                }, 0);
            } else {
                setCustomLatex((prev) => prev + piece);
            }
        }
    };

    // ---------- Filtered templates ----------
    const filteredTemplates = useMemo(() => {
        let templates = TEMPLATES;
        if (selectedCategory !== "All") {
            templates = templates.filter((t) => t.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            templates = templates.filter(
                (t) =>
                    t.name.toLowerCase().includes(query) ||
                    t.fields.some((f) => f.label.toLowerCase().includes(query))
            );
        }
        return templates;
    }, [selectedCategory, searchQuery]);

    const categories = useMemo(() => {
        const cats = new Set(TEMPLATES.map((t) => t.category));
        return ["All", ...Array.from(cats)];
    }, []);

    // ---------- Render Field (recursive) ----------
    // Using a named function inside useCallback so recursive calls work.
    const renderField = useCallback(
        function renderField(
            fieldKey: string,
            fieldValue: FieldValue,
            parentTemplate: Template,
            path: string[]
        ) {
            const isNested = fieldValue.type === "template";
            const fieldDef = parentTemplate.fields.find((f) => f.key === fieldKey);
            const isFocused =
                focusedFieldPath &&
                path.length === focusedFieldPath.length &&
                path.every((v, i) => v === focusedFieldPath[i]);

            return (
                <div key={fieldKey} className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                        <label className="text-sm font-medium text-gray-800 min-w-30 shrink-0 mt-1.5">
                            {fieldDef?.label || fieldKey}:
                        </label>
                        {isNested ? (
                            <div className="flex-1 min-w-0 overflow-x-auto">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono whitespace-nowrap">
                                            {fieldValue.template.name}
                                        </span>
                                        <button
                                            onClick={() => handleClearNested(path)}
                                            className="text-xs text-red-600 hover:text-red-800"
                                            type="button"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="ml-6 border-l-2 border-blue-200 pl-4">
                                        {Object.entries(fieldValue.fields).map(([nestedKey, nestedField]) =>
                                            renderField(
                                                nestedKey,
                                                nestedField,
                                                fieldValue.template,
                                                [...path, nestedKey]
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 min-w-0 overflow-x-auto">
                                <input
                                    type="text"
                                    value={fieldValue.value}
                                    onChange={(e) => handleFieldTextChange(path, e.target.value)}
                                    onFocus={() => setFocusedFieldPath(path)}
                                    placeholder={fieldDef?.placeholder || ""}
                                    className={`w-full rounded-md border px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-1 ${isFocused
                                        ? "border-blue-500 ring-blue-200 bg-blue-50"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        }`}
                                />
                            </div>
                        )}
                        <button
                            onClick={() => handleOpenNestedPicker(path)}
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shrink-0"
                            type="button"
                            disabled={isNested}
                        >
                            {isNested ? "Replace" : "Insert Template"}
                        </button>
                    </div>
                    {editingPath &&
                        editingPath.length === path.length &&
                        editingPath.every((v, i) => v === path[i]) &&
                        showNestedPicker && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 overflow-x-auto">
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-blue-800 mb-2">Insert Symbol</p>
                                    <div className="flex flex-wrap gap-1">
                                        {SYMBOLS.map((sym) => (
                                            <button
                                                key={sym.label}
                                                onClick={() => {
                                                    if (editingPath)
                                                        insertSymbolIntoField(editingPath, sym.value);
                                                }}
                                                className="px-2 py-1 text-sm bg-white text-gray-800 border border-blue-300 rounded hover:bg-blue-100 transition font-mono"
                                            >
                                                {sym.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-800 mb-2">Insert Template</p>
                                    <div className="flex flex-wrap gap-2">
                                        {TEMPLATES.map((t) => (
                                            <button
                                                key={t.name}
                                                onClick={() => handleInsertNestedTemplate(t)}
                                                className="px-3 py-1.5 text-sm bg-white text-gray-800 border border-blue-300 rounded-full hover:bg-blue-100 transition"
                                            >
                                                {t.name}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => {
                                                setShowNestedPicker(false);
                                                setEditingPath(null);
                                            }}
                                            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            );
        },
        [focusedFieldPath, editingPath, showNestedPicker, handleClearNested, handleFieldTextChange, insertSymbolIntoField, handleInsertNestedTemplate]
    );

    // ---------- Render ----------
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto overflow-x-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Insert Math</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-800 hover:text-gray-800 text-2xl transition-colors"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 border-b border-gray-200">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "symbols"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-800 hover:text-gray-800"
                            }`}
                        onClick={() => setActiveTab("symbols")}
                    >
                        Symbols
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "templates"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-800 hover:text-gray-800"
                            }`}
                        onClick={() => setActiveTab("templates")}
                    >
                        Templates
                    </button>
                </div>

                {/* Symbols Tab */}
                {activeTab === "symbols" && <SymbolsTab onInsertSymbol={insertSymbol} />}

                {/* Templates Tab */}
                {activeTab === "templates" && (
                    <div>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 mb-4 items-center">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 min-w-37.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 text-xs rounded-full border transition ${selectedCategory === cat
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent */}
                        <RecentTemplates
                            templates={recentTemplates}
                            selectedName={selectedTemplate?.name}
                            onSelect={handleSelectTemplate}
                        />

                        {/* Template grid */}
                        <TemplateList
                            templates={filteredTemplates}
                            selectedName={selectedTemplate?.name}
                            onSelect={handleSelectTemplate}
                        />

                        {/* Builder */}
                        <div className="space-y-4 mt-4 border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-semibold text-gray-800">
                                    {selectedTemplate ? `Building: ${selectedTemplate.name}` : "Build from scratch"}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedTemplate(null);
                                        setRootFields({});
                                        setCustomLatex("");
                                        setFocusedFieldPath(null);
                                        setEditingPath(null);
                                        setShowNestedPicker(false);
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                    type="button"
                                >
                                    {selectedTemplate ? "Clear template" : "Start from scratch"}
                                </button>
                            </div>

                            <QuickPieces
                                onInsertPiece={insertQuickPiece}
                                onClearFocus={() => setFocusedFieldPath(null)}
                            />

                            {selectedTemplate && (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    {Object.entries(rootFields).map(([key, field]) =>
                                        renderField(key, field, selectedTemplate, [key])
                                    )}
                                </div>
                            )}

                            <EditableLatex
                                value={customLatex}
                                onChange={setCustomLatex}
                                onReset={() => {
                                    if (selectedTemplate) {
                                        const generated = generateLatex();
                                        setCustomLatex(generated);
                                    }
                                }}
                                showReset={!!selectedTemplate}
                                textareaRef={latexTextareaRef}
                            />

                            <Preview previewRef={previewRef} />

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleInsertTemplate}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Insert
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}