import React from "react";
import type { DifficultyLevel } from "@/services/types";
import { DIFFICULTY_OPTIONS } from "./math-constant";

interface DifficultyTagsProps {
    difficulty: DifficultyLevel;
    setDifficulty: (level: DifficultyLevel) => void;
    tags: string[];
    currentTag: string;
    setCurrentTag: (tag: string) => void;
    addTag: () => void;
    removeTag: (tag: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DifficultyTags({
    difficulty,
    setDifficulty,
    tags,
    currentTag,
    setCurrentTag,
    addTag,
    removeTag,
    onKeyPress,
}: DifficultyTagsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b border-gray-200">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                </label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {DIFFICULTY_OPTIONS.map((diff) => (
                        <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={onKeyPress}
                        placeholder="Add tag (e.g., algebra, calculus)"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        type="button"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="text-blue-600 hover:text-blue-800"
                                type="button"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}