// components/templates/math-editor-template.tsx
'use client';

import type { QuestionData } from '@/services/types';
import { useState } from 'react';
import MathEditor from '../organisms/math-editor';

export default function MathEditorTemplate(): React.JSX.Element {
  const [savedQuestions, setSavedQuestions] = useState<QuestionData[]>([
    {
      "id": "abufc_ms7dylqf_10dd9d27b023",
      "type": "mcq",
      "content": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>\n<p><span class=\"math-tex\">awdawdawdad awd awdawdawd</span></p>",
      "marks": 1,
      "classLevel": "Class 1",
      "subject": "Mathematics",
      "difficulty": "medium",
      "tags": [],
      "options": [
        {
          "id": "abufc_ms7dxvf3_a0b4f9358865",
          "text": "<p>awdawd</p>",
          "isCorrect": true
        },
        {
          "id": "abufc_ms7dxvf3_d383fa44e220",
          "text": "<p>adwadaw d</p>",
          "isCorrect": false
        },
        {
          "id": "abufc_ms7dxvf3_7ebbbc501a36",
          "text": "<p>awad awdawd</p>",
          "isCorrect": false
        },
        {
          "id": "abufc_ms7dxvf3_628096ec8ef5",
          "text": "<p>awd aw&nbsp;</p>",
          "isCorrect": false
        }
      ],
      "explanation": "<p><span class=\"math-tex\">$\\begin{array}{r|rrrr} &amp; x^2 &amp; +x &amp; +1 \\\\ x-1 &amp; x^3 &amp; 0x^2 &amp; -x &amp; 1 \\\\ &amp; x^3 &amp; -0x^2 &amp; &amp; \\\\ \\hline &amp; &amp; x^2 &amp; -x &amp; +1 \\\\ &amp; &amp; x^2 &amp; -x &amp; \\\\ \\hline &amp; &amp; &amp; &amp; 0 \\end{array}$</span></p>",
      "createdAt": "2026-07-30T10:43:48.231Z",
      "updatedAt": "2026-07-30T10:43:48.231Z"
    },
    {
      "id": "ntjarke1h",
      "type": "mcq",
      "content": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
      "marks": 1,
      "classLevel": "Class 1",
      "subject": "Mathematics",
      "difficulty": "medium",
      "tags": [],
      "options": [
        {
          "id": "bw3zio7om",
          "text": "<p><span class=\"math-tex\">$\\frac{1}{x}$</span></p>",
          "isCorrect": false
        },
        {
          "id": "knwktkbgb",
          "text": "<p><span class=\"math-tex\">$\\frac{3}{4}$</span></p>",
          "isCorrect": false
        },
        {
          "id": "hjvis2kid",
          "text": "<p><span class=\"math-tex\">$\\frac{3}{4}x^{n}$</span></p>",
          "isCorrect": true
        },
        {
          "id": "l1plo5ucv",
          "text": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
          "isCorrect": false
        }
      ],
      "explanation": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
      "createdAt": "2026-07-30T10:16:55.940Z",
      "updatedAt": "2026-07-30T10:16:55.940Z"
    },
    {
      "id": "ntjarke1h",
      "type": "mcq",
      "content": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
      "marks": 1,
      "classLevel": "Class 1",
      "subject": "Mathematics",
      "difficulty": "medium",
      "tags": [],
      "options": [
        {
          "id": "bw3zio7om",
          "text": "<p><span class=\"math-tex\">$\\frac{1}{x}$</span></p>",
          "isCorrect": false
        },
        {
          "id": "knwktkbgb",
          "text": "<p><span class=\"math-tex\">$\\frac{3}{4}$</span></p>",
          "isCorrect": false
        },
        {
          "id": "hjvis2kid",
          "text": "<p><span class=\"math-tex\">$\\frac{3}{4}x^{n}$</span></p>",
          "isCorrect": true
        },
        {
          "id": "l1plo5ucv",
          "text": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
          "isCorrect": false
        }
      ],
      "explanation": "<p><span class=\"math-tex\">$\\left( x^2 - 2 + \\frac{1}{x^2} \\right)^{ 7 }$</span></p>",
      "createdAt": "2026-07-30T10:16:55.940Z",
      "updatedAt": "2026-07-30T10:31:57.100Z"
    }
  ]);

  const handleSave = (data: QuestionData): void => {
    setSavedQuestions([...savedQuestions, data]);
    console.log('Question saved:', data);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Math Question Creator
        </h1>
        <p className="text-gray-600">
          Create math questions for any level - Class 1 to PhD
        </p>
        {savedQuestions.length > 0 && (
          <p className="text-sm text-green-600 mt-2">
            ✅ {savedQuestions.length} question{savedQuestions.length > 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      <MathEditor
        // initialData={savedQuestions[0]}
        onSave={handleSave}
      />
    </div>
  );
}