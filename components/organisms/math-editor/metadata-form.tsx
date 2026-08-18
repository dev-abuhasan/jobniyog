import React from "react";
import type { QuestionType } from "@/services/types";

interface MetadataFormProps {
    questionType: QuestionType;
    setQuestionType: (type: QuestionType) => void;
    classLevel: string;
    setClassLevel: (level: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    marks: number;
    setMarks: (marks: number) => void;
    classLevels: string[];
    subjects: string[];
}

export default function MetadataForm({
    questionType,
    setQuestionType,
    classLevel,
    setClassLevel,
    subject,
    setSubject,
    marks,
    setMarks,
    classLevels,
    subjects,
}: MetadataFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gray-50">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                </label>
                <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="mcq">MCQ (Multiple Choice)</option>
                    <option value="written">Written</option>
                    <option value="fillBlank">Fill in the Blank</option>
                    <option value="match">Matching</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Level
                </label>
                <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {classLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                </label>
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {subjects.map((sub) => (
                        <option key={sub} value={sub}>
                            {sub}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                </label>
                <input
                    type="number"
                    min="1"
                    value={marks}
                    onChange={(e) => setMarks(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    );
}