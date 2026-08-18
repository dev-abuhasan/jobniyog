// services/types/math-editor.types.ts
import type { Editor as TinyMCEEditorType } from 'tinymce';

// Re-export the actual TinyMCE Editor type
export type TinyMCEEditor = TinyMCEEditorType;

export type QuestionType = 'mcq' | 'written' | 'fillBlank' | 'match';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface QuestionData {
  id?: string;
  type: QuestionType;
  content: string;
  explanation?: string;
  options?: MCQOption[];
  matchingPairs?: MatchingPair[];
  correctAnswer?: string;
  marks: number;
  classLevel: string;
  subject: string;
  difficulty: DifficultyLevel;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TinyEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  placeholder?: string;
  disabled?: boolean;
}

export interface MathEditorProps {
  initialData?: Partial<QuestionData>;
  onSave?: (data: QuestionData) => void;
  onCancel?: () => void;
  className?: string;
  classLevels?: string[];
  subjects?: string[];
  // isOpen?: boolean;
  // onClose?: () => void;
  // onInsert?: (latex: string) => void; // legacy, but we'll keep for backward compatibility
  // targetRef?: React.RefObject<TinyEditorRef>; // new
}

export interface KaTeXWindow extends Window {
  renderMathInElement?: (
    element: HTMLElement,
    options: {
      delimiters: Array<{ left: string; right: string; display: boolean }>;
      throwOnError: boolean;
    }
  ) => void;
}

// Extend window for TinyMCE
declare global {
  interface Window {
    tinymce?: {
      init: (config: unknown) => void;
      get: (id: string) => TinyMCEEditor | null;
    };
    renderMathInElement?: (
      element: HTMLElement,
      options: {
        delimiters: Array<{ left: string; right: string; display: boolean }>;
        throwOnError: boolean;
      }
    ) => void;
  }
}

export interface TinyEditorRef {
  insertContent: (content: string) => void;
  insertMath: (latex: string) => void;
  getContent: () => string;
}

export interface TemplateField {
  label: string;
  key: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface Template {
  name: string;
  latex: string;                // LaTeX with placeholders like {{a}}, {{b}}
  fields: TemplateField[];
  category: string;
}

export type FieldValue =
  | { type: "text"; value: string }
  | { type: "template"; template: Template; fields: Record<string, FieldValue> };
