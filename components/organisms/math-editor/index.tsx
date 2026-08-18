"use client";

import React, { useState, useCallback, useRef } from "react";
import "katex/dist/katex.min.css";
import type {
    QuestionData,
    MathEditorProps,
    QuestionType,
    DifficultyLevel,
    MCQOption,
    TinyEditorRef,
} from "@/services/types";
import { TinyEditorDynamic } from "@/components/templates/dynamic-import";
import { generateId, createDefaultOptions } from "./math-editor-utils";
import { DEFAULT_CLASS_LEVELS, DEFAULT_SUBJECTS } from "./math-constant";
import MetadataForm from "./metadata-form";
import DifficultyTags from "./difficulty-tags";
import OptionsEditor from "./options-editor";
import PreviewSection from "./preview-section";
import MathPalette from "./math-platte";

export default function MathEditor({
    initialData,
    onSave,
    onCancel,
    className = "",
    classLevels = DEFAULT_CLASS_LEVELS,
    subjects = DEFAULT_SUBJECTS,
}: MathEditorProps): React.JSX.Element {
    // ---------- State ----------
    const [questionType, setQuestionType] = useState<QuestionType>(
        initialData?.type || "mcq"
    );
    const [content, setContent] = useState<string>(initialData?.content || "");
    const [explanation, setExplanation] = useState<string>(initialData?.explanation || "");
    const [marks, setMarks] = useState<number>(initialData?.marks || 1);
    const [classLevel, setClassLevel] = useState<string>(
        initialData?.classLevel || classLevels[0]
    );
    const [subject, setSubject] = useState<string>(
        initialData?.subject || subjects[0]
    );
    const [difficulty, setDifficulty] = useState<DifficultyLevel>(
        initialData?.difficulty || "medium"
    );
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [currentTag, setCurrentTag] = useState<string>("");
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showMathPalette, setShowMathPalette] = useState<boolean>(false);
    const [options, setOptions] = useState<MCQOption[]>(
        initialData?.options || createDefaultOptions()
    );
    // Key to force remount of PreviewSection after save
    const [previewKey, setPreviewKey] = useState(0);

    // ---------- Target ref for MathPalette ----------
    const [currentTargetRef, setCurrentTargetRef] = useState<React.RefObject<TinyEditorRef | null> | null>(null);

    // ---------- Refs ----------
    const editorRef = useRef<TinyEditorRef | null>(null);
    const explanationRef = useRef<TinyEditorRef | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const explanationPreviewRef = useRef<HTMLDivElement>(null);

    // ---------- Open MathPalette ----------
    const openMathPalette = (targetRef: React.RefObject<TinyEditorRef | null>) => {
        setCurrentTargetRef(targetRef);
        setShowMathPalette(true);
    };

    // ---------- Validation ----------
    const validate = useCallback((): boolean => {
        if (!content.trim()) {
            setError("Please add question content");
            return false;
        }
        if (questionType === "mcq") {
            const hasEmptyOption = options.some((opt) => !opt.text.trim());
            if (hasEmptyOption) {
                setError("Please fill all option texts");
                return false;
            }
            const hasCorrectAnswer = options.some((opt) => opt.isCorrect);
            if (!hasCorrectAnswer) {
                setError("Please mark at least one correct answer");
                return false;
            }
        }
        setError("");
        return true;
    }, [content, questionType, options]);

    // ---------- Save ----------
    const handleSave = useCallback((): void => {
        if (!validate()) return;
        const questionData: QuestionData = {
            id: initialData?.id || generateId(),
            type: questionType,
            content,
            marks,
            classLevel,
            subject,
            difficulty,
            tags,
            options: questionType === "mcq" ? options : undefined,
            explanation: explanation || undefined,
            createdAt: initialData?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        onSave?.(questionData);
        // Force PreviewSection to remount after save
        setPreviewKey((prev) => prev + 1);
    }, [
        validate,
        initialData,
        questionType,
        content,
        marks,
        classLevel,
        subject,
        difficulty,
        tags,
        options,
        explanation,
        onSave,
    ]);

    // ---------- Option handlers ----------
    const addOption = useCallback((): void => {
        if (options.length < 6) {
            setOptions([...options, { id: generateId(), text: "", isCorrect: false }]);
        }
    }, [options]);

    const removeOption = useCallback((id: string): void => {
        if (options.length > 2) {
            setOptions(options.filter((opt) => opt.id !== id));
        }
    }, [options]);

    const updateOptionText = useCallback((id: string, text: string): void => {
        setOptions(
            options.map((opt) => (opt.id === id ? { ...opt, text } : opt))
        );
    }, [options]);

    const toggleCorrectAnswer = useCallback((id: string): void => {
        setOptions(
            options.map((opt) => ({
                ...opt,
                isCorrect: opt.id === id ? !opt.isCorrect : opt.isCorrect,
            }))
        );
    }, [options]);

    // ---------- Tag handlers ----------
    const addTag = useCallback((): void => {
        const trimmedTag = currentTag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setCurrentTag("");
        }
    }, [currentTag, tags]);

    const removeTag = useCallback((tag: string): void => {
        setTags(tags.filter((t) => t !== tag));
    }, [tags]);

    // ---------- Render ----------
    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {initialData?.id ? "Edit Question" : "Create New Question"}
                </h2>
            </div>

            {/* Metadata */}
            <MetadataForm
                questionType={questionType}
                setQuestionType={setQuestionType}
                classLevel={classLevel}
                setClassLevel={setClassLevel}
                subject={subject}
                setSubject={setSubject}
                marks={marks}
                setMarks={setMarks}
                classLevels={classLevels}
                subjects={subjects}
            />

            {/* Difficulty + Tags */}
            <DifficultyTags
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                tags={tags}
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
                addTag={addTag}
                removeTag={removeTag}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                    }
                }}
            />

            {/* Question Content */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Question Content
                    </label>
                    <button
                        onClick={() => openMathPalette(editorRef)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        type="button"
                    >
                        ∑ Insert Math
                    </button>
                </div>
                <TinyEditorDynamic
                    ref={editorRef}
                    value={content}
                    onChange={setContent}
                    height={250}
                    placeholder="Type your question here..."
                />
            </div>

            {/* MCQ Options */}
            {questionType === "mcq" && (
                <OptionsEditor
                    options={options}
                    addOption={addOption}
                    removeOption={removeOption}
                    updateOptionText={updateOptionText}
                    toggleCorrectAnswer={toggleCorrectAnswer}
                />
            )}

            {/* Explanation Section */}
            <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Explanation (optional)
                    </label>
                    <button
                        onClick={() => openMathPalette(explanationRef)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        type="button"
                    >
                        ∑ Insert Math
                    </button>
                </div>
                <TinyEditorDynamic
                    ref={explanationRef}
                    value={explanation}
                    onChange={setExplanation}
                    height={150}
                    placeholder="Add an explanation for this question..."
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 p-6 pt-0 border-t border-gray-200">
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    type="button"
                >
                    {showPreview ? "Hide Preview" : "Preview Question"}
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    type="button"
                >
                    {initialData?.id ? "Update Question" : "Save Question"}
                </button>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Preview */}
            <PreviewSection
                key={previewKey}
                showPreview={showPreview}
                content={content}
                explanation={explanation}
                previewRef={previewRef}
                explanationPreviewRef={explanationPreviewRef}
                questionType={questionType}
                options={options}
            />

            {/* Math Palette */}
            <MathPalette
                isOpen={showMathPalette}
                onClose={() => setShowMathPalette(false)}
                targetRef={currentTargetRef}
            />
        </div>
    );
}