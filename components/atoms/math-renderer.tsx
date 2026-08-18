import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Props Interface supporting theme and localization controls
interface MathRendererProps {
  text: string;
  theme?: "light" | "dark";
  language?: "en" | "bn";
}

export interface MathItem {
  id: number;
  topic: string;
  question: string;
  formula: string;
}

const MathRenderer = ({ 
  text, 
  theme = "light", 
  language = "en" 
}: MathRendererProps): React.JSX.Element => {
  
  // Dynamic font scaling or family overrides depending on language
  const fontClass = language === "bn" ? "font-sans tracking-normal" : "font-sans";
  
  // Explicit tailwind colors matching your layout requirements
  const textThemeClass = theme === "dark" ? "text-slate-100" : "text-slate-800";

  return (
    <div 
      className={`${textThemeClass} ${fontClass} leading-relaxed`}
      dir={language === "bn" ? "ltr" : "ltr"} // Math expressions always render Left-to-Right
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MathRenderer;
