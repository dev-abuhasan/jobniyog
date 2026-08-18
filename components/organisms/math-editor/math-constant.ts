import { Template } from "@/services/types";

export const DEFAULT_CLASS_LEVELS = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "HSC 1st Year", "HSC 2nd Year",
    "Bachelor", "Masters", "PhD",
    "BCS Exam", "Job Exam",
];

export const DEFAULT_SUBJECTS = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Higher Math", "Statistics", "General Math",
    "English Language", "English Literature",
];

export const DIFFICULTY_OPTIONS = ["easy", "medium", "hard", "expert"] as const;
export const QUESTION_TYPES = ["mcq", "written", "fillBlank", "match"] as const;


export const TEMPLATES: Template[] = [
    // ---------- Algebra ----------
    {
        name: "Fraction",
        category: "Algebra",
        latex: "\\frac{{{a}}}{{{b}}}",
        fields: [
            { label: "Numerator", key: "a", placeholder: "e.g. 3", defaultValue: "3" },
            { label: "Denominator", key: "b", placeholder: "e.g. 4", defaultValue: "4" },
        ],
    },
    {
        name: "Square Root",
        category: "Algebra",
        latex: "\\sqrt{{{a}}}",
        fields: [
            { label: "Radicand", key: "a", placeholder: "e.g. 2x", defaultValue: "x" },
        ],
    },
    {
        name: "nth Root",
        category: "Algebra",
        latex: "\\sqrt[{{{n}}}]{ {{a}} }",
        fields: [
            { label: "Index (n)", key: "n", placeholder: "e.g. 3", defaultValue: "3" },
            { label: "Radicand", key: "a", placeholder: "e.g. x", defaultValue: "x" },
        ],
    },
    {
        name: "Power of Expression",
        category: "Algebra",
        latex: "\\left( {{expr}} \\right)^{ {{n}} }",
        fields: [
            { label: "Expression", key: "expr", placeholder: "e.g. x^2 - 2 + 1/x^2", defaultValue: "x^2 - 2 + \\frac{1}{x^2}" },
            { label: "Power (n)", key: "n", placeholder: "e.g. 7", defaultValue: "7" },
        ],
    },
    {
        name: "Binomial Expansion",
        category: "Algebra",
        latex: "( {{a}} + {{b}} )^{ {{n}} }",
        fields: [
            { label: "First term (a)", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "Second term (b)", key: "b", placeholder: "y", defaultValue: "y" },
            { label: "Power (n)", key: "n", placeholder: "2", defaultValue: "2" },
        ],
    },
    {
        name: "Difference of squares",
        category: "Algebra",
        latex: "{{a}}^2 - {{b}}^2 = ({{a}} - {{b}})({{a}} + {{b}})",
        fields: [
            { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
        ],
    },
    {
        name: "Square of sum",
        category: "Algebra",
        latex: "( {{a}} + {{b}} )^2 = {{a}}^2 + 2{{a}}{{b}} + {{b}}^2",
        fields: [
            { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
        ],
    },
    {
        name: "Square of difference",
        category: "Algebra",
        latex: "( {{a}} - {{b}} )^2 = {{a}}^2 - 2{{a}}{{b}} + {{b}}^2",
        fields: [
            { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
        ],
    },
    {
        name: "Cube of sum",
        category: "Algebra",
        latex: "( {{a}} + {{b}} )^3 = {{a}}^3 + 3{{a}}^2{{b}} + 3{{a}}{{b}}^2 + {{b}}^3",
        fields: [
            { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
        ],
    },
    {
        name: "Cube of difference",
        category: "Algebra",
        latex: "( {{a}} - {{b}} )^3 = {{a}}^3 - 3{{a}}^2{{b}} + 3{{a}}{{b}}^2 - {{b}}^3",
        fields: [
            { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
            { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
        ],
    },
    {
        name: "Quadratic Formula",
        category: "Algebra",
        latex: "x = \\frac{ -{{b}} \\pm \\sqrt{ {{b}}^2 - 4{{a}}{{c}} } }{ 2{{a}} }",
        fields: [
            { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
            { label: "b", key: "b", placeholder: "-3", defaultValue: "-3" },
            { label: "c", key: "c", placeholder: "2", defaultValue: "2" },
        ],
    },
    // ---------- Calculus ----------
    {
        name: "Integral (Definite)",
        category: "Calculus",
        latex: "\\int_{ {{lower}} }^{ {{upper}} } {{function}} \\, dx",
        fields: [
            { label: "Lower limit", key: "lower", placeholder: "0", defaultValue: "0" },
            { label: "Upper limit", key: "upper", placeholder: "1", defaultValue: "1" },
            { label: "Function", key: "function", placeholder: "x^2", defaultValue: "x^2" },
        ],
    },
    {
        name: "Derivative",
        category: "Calculus",
        latex: "\\frac{d}{d{{var}}} {{func}}",
        fields: [
            { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
            { label: "Function", key: "func", placeholder: "e.g. f(x)", defaultValue: "f(x)" },
        ],
    },
    {
        name: "Partial Derivative",
        category: "Calculus",
        latex: "\\frac{\\partial}{\\partial {{var}}} {{func}}",
        fields: [
            { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
            { label: "Function", key: "func", placeholder: "e.g. f(x,y)", defaultValue: "f(x,y)" },
        ],
    },
    {
        name: "Limit",
        category: "Calculus",
        latex: "\\lim_{ {{var}} \\to {{value}} } {{func}}",
        fields: [
            { label: "Variable", key: "var", placeholder: "x", defaultValue: "x" },
            { label: "Value", key: "value", placeholder: "\\infty", defaultValue: "\\infty" },
            { label: "Function", key: "func", placeholder: "f(x)", defaultValue: "f(x)" },
        ],
    },
    {
        name: "Summation",
        category: "Calculus",
        latex: "\\sum_{ {{start}} }^{ {{end}} } {{term}}",
        fields: [
            { label: "Start", key: "start", placeholder: "i=1", defaultValue: "i=1" },
            { label: "End", key: "end", placeholder: "n", defaultValue: "n" },
            { label: "Term", key: "term", placeholder: "a_i", defaultValue: "a_i" },
        ],
    },
    {
        name: "Product (Pi notation)",
        category: "Calculus",
        latex: "\\prod_{ {{start}} }^{ {{end}} } {{term}}",
        fields: [
            { label: "Start", key: "start", placeholder: "i=1", defaultValue: "i=1" },
            { label: "End", key: "end", placeholder: "n", defaultValue: "n" },
            { label: "Term", key: "term", placeholder: "a_i", defaultValue: "a_i" },
        ],
    },
    // ---------- Trigonometry ----------
    {
        name: "Sine",
        category: "Trigonometry",
        latex: "\\sin( {{angle}} )",
        fields: [
            { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
        ],
    },
    {
        name: "Cosine",
        category: "Trigonometry",
        latex: "\\cos( {{angle}} )",
        fields: [
            { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
        ],
    },
    {
        name: "Tangent",
        category: "Trigonometry",
        latex: "\\tan( {{angle}} )",
        fields: [
            { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
        ],
    },
    // ---------- Matrices ----------
    {
        name: "Matrix 2×2",
        category: "Matrices",
        latex: "\\begin{pmatrix} {{a}} & {{b}} \\\\ {{c}} & {{d}} \\end{pmatrix}",
        fields: [
            { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
            { label: "b", key: "b", placeholder: "2", defaultValue: "2" },
            { label: "c", key: "c", placeholder: "3", defaultValue: "3" },
            { label: "d", key: "d", placeholder: "4", defaultValue: "4" },
        ],
    },
    {
        name: "Matrix 3×3",
        category: "Matrices",
        latex: "\\begin{pmatrix} {{a}} & {{b}} & {{c}} \\\\ {{d}} & {{e}} & {{f}} \\\\ {{g}} & {{h}} & {{i}} \\end{pmatrix}",
        fields: [
            { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
            { label: "b", key: "b", placeholder: "2", defaultValue: "2" },
            { label: "c", key: "c", placeholder: "3", defaultValue: "3" },
            { label: "d", key: "d", placeholder: "4", defaultValue: "4" },
            { label: "e", key: "e", placeholder: "5", defaultValue: "5" },
            { label: "f", key: "f", placeholder: "6", defaultValue: "6" },
            { label: "g", key: "g", placeholder: "7", defaultValue: "7" },
            { label: "h", key: "h", placeholder: "8", defaultValue: "8" },
            { label: "i", key: "i", placeholder: "9", defaultValue: "9" },
        ],
    },
    {
        name: "Column Vector (3×1)",
        category: "Matrices",
        latex: "\\begin{pmatrix} {{x}} \\\\ {{y}} \\\\ {{z}} \\end{pmatrix}",
        fields: [
            { label: "x-component", key: "x", placeholder: "1", defaultValue: "1" },
            { label: "y-component", key: "y", placeholder: "2", defaultValue: "2" },
            { label: "z-component", key: "z", placeholder: "3", defaultValue: "3" },
        ],
    },
    // ---------- Logic & Sets ----------
    {
        name: "Absolute Value",
        category: "Logic & Sets",
        latex: "\\left| {{expr}} \\right|",
        fields: [
            { label: "Expression", key: "expr", placeholder: "e.g. x", defaultValue: "x" },
        ],
    },
    {
        name: "Set Builder",
        category: "Logic & Sets",
        latex: "\\{ {{var}} \\mid {{condition}} \\}",
        fields: [
            { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
            { label: "Condition", key: "condition", placeholder: "e.g. x \\in \\mathbb{R}", defaultValue: "x \\in \\mathbb{R}" },
        ],
    },
    {
        name: "Piecewise Function",
        category: "Logic & Sets",
        latex: "\\begin{cases} {{expr1}} & \\text{if } {{cond1}} \\\\ {{expr2}} & \\text{if } {{cond2}} \\end{cases}",
        fields: [
            { label: "Expression 1", key: "expr1", placeholder: "x", defaultValue: "x" },
            { label: "Condition 1", key: "cond1", placeholder: "x \\ge 0", defaultValue: "x \\ge 0" },
            { label: "Expression 2", key: "expr2", placeholder: "-x", defaultValue: "-x" },
            { label: "Condition 2", key: "cond2", placeholder: "x < 0", defaultValue: "x < 0" },
        ],
    },
    // ---------- Binomial ----------
    {
        name: "Binomial Coefficient",
        category: "Binomial",
        latex: "\\binom{ {{n}} }{ {{k}} }",
        fields: [
            { label: "n", key: "n", placeholder: "5", defaultValue: "5" },
            { label: "k", key: "k", placeholder: "2", defaultValue: "2" },
        ],
    },
    // ---------- Long Division ----------
    {
        name: "Long Division (Polynomial)",
        category: "Algebra",
        latex: `\\begin{array}{r|rrrr}
      & {{q1}} & +{{q2}} & +{{q3}} \\\\
      {{divisor}} & {{d0}} & {{d1}} & {{d2}} & {{d3}} \\\\
      & {{d0}} & -{{d1}} & & \\\\
      \\hline
      & & {{r1}} & -{{r2}} & +{{r3}} \\\\
      & & {{r1}} & -{{r2}} & \\\\
      \\hline
      & & & & {{rem}}
    \\end{array}`,
        fields: [
            { label: "Quotient term 1", key: "q1", placeholder: "x^2", defaultValue: "x^2" },
            { label: "Quotient term 2", key: "q2", placeholder: "x", defaultValue: "x" },
            { label: "Quotient term 3", key: "q3", placeholder: "1", defaultValue: "1" },
            { label: "Divisor", key: "divisor", placeholder: "x-1", defaultValue: "x-1" },
            { label: "Dividend term 0", key: "d0", placeholder: "x^3", defaultValue: "x^3" },
            { label: "Dividend term 1", key: "d1", placeholder: "0x^2", defaultValue: "0x^2" },
            { label: "Dividend term 2", key: "d2", placeholder: "-x", defaultValue: "-x" },
            { label: "Dividend term 3", key: "d3", placeholder: "1", defaultValue: "1" },
            { label: "Remainder", key: "rem", placeholder: "0", defaultValue: "0" },
            { label: "r1", key: "r1", placeholder: "x^2", defaultValue: "x^2" },
            { label: "r2", key: "r2", placeholder: "x", defaultValue: "x" },
            { label: "r3", key: "r3", placeholder: "1", defaultValue: "1" },
        ],
    },
    // ---------- Custom LaTeX (escape hatch) ----------
    {
        name: "Custom LaTeX",
        category: "Custom",
        latex: "{{raw}}",
        fields: [
            { label: "LaTeX Code", key: "raw", placeholder: "e.g. \\int_0^1 x^2 dx", defaultValue: "\\int_0^1 x^2 dx" },
        ],
    },
];


export const SYMBOLS = [
    // Greek
    { label: "\\pi", value: "\\pi" },
    { label: "\\infty", value: "\\infty" },
    { label: "\\alpha", value: "\\alpha" },
    { label: "\\beta", value: "\\beta" },
    { label: "\\gamma", value: "\\gamma" },
    { label: "\\delta", value: "\\delta" },
    { label: "\\epsilon", value: "\\epsilon" },
    { label: "\\zeta", value: "\\zeta" },
    { label: "\\eta", value: "\\eta" },
    { label: "\\theta", value: "\\theta" },
    { label: "\\iota", value: "\\iota" },
    { label: "\\kappa", value: "\\kappa" },
    { label: "\\lambda", value: "\\lambda" },
    { label: "\\mu", value: "\\mu" },
    { label: "\\nu", value: "\\nu" },
    { label: "\\xi", value: "\\xi" },
    { label: "\\omicron", value: "\\omicron" },
    { label: "\\pi", value: "\\pi" },
    { label: "\\rho", value: "\\rho" },
    { label: "\\sigma", value: "\\sigma" },
    { label: "\\tau", value: "\\tau" },
    { label: "\\upsilon", value: "\\upsilon" },
    { label: "\\phi", value: "\\phi" },
    { label: "\\chi", value: "\\chi" },
    { label: "\\psi", value: "\\psi" },
    { label: "\\omega", value: "\\omega" },
    // Upper-case Greek
    { label: "\\Gamma", value: "\\Gamma" },
    { label: "\\Delta", value: "\\Delta" },
    { label: "\\Theta", value: "\\Theta" },
    { label: "\\Lambda", value: "\\Lambda" },
    { label: "\\Xi", value: "\\Xi" },
    { label: "\\Pi", value: "\\Pi" },
    { label: "\\Sigma", value: "\\Sigma" },
    { label: "\\Upsilon", value: "\\Upsilon" },
    { label: "\\Phi", value: "\\Phi" },
    { label: "\\Psi", value: "\\Psi" },
    { label: "\\Omega", value: "\\Omega" },
    // Operators
    { label: "\\partial", value: "\\partial" },
    { label: "\\nabla", value: "\\nabla" },
    { label: "\\sum", value: "\\sum" },
    { label: "\\int", value: "\\int" },
    { label: "\\prod", value: "\\prod" },
    { label: "\\lim", value: "\\lim" },
    // Arrows
    { label: "\\rightarrow", value: "\\rightarrow" },
    { label: "\\leftarrow", value: "\\leftarrow" },
    { label: "\\leftrightarrow", value: "\\leftrightarrow" },
    { label: "\\Rightarrow", value: "\\Rightarrow" },
    { label: "\\Leftarrow", value: "\\Leftarrow" },
    { label: "\\Longleftrightarrow", value: "\\Longleftrightarrow" },
    // Relations
    { label: "\\approx", value: "\\approx" },
    { label: "\\neq", value: "\\neq" },
    { label: "\\leq", value: "\\leq" },
    { label: "\\geq", value: "\\geq" },
    { label: "\\subset", value: "\\subset" },
    { label: "\\supset", value: "\\supset" },
    { label: "\\subseteq", value: "\\subseteq" },
    { label: "\\supseteq", value: "\\supseteq" },
    { label: "\\in", value: "\\in" },
    { label: "\\notin", value: "\\notin" },
    // Common
    { label: "\\sqrt{}", value: "\\sqrt{}" },
    { label: "\\frac{}{}", value: "\\frac{}{}" },
    { label: "^{}", value: "^{}" },
    { label: "_{}", value: "_{}" },
    { label: "\\binom{n}{k}", value: "\\binom{n}{k}" },
];

export const QUICK_PIECES = [
    // Variables & constants
    { label: "x", value: "x" },
    { label: "y", value: "y" },
    { label: "z", value: "z" },
    { label: "a", value: "a" },
    { label: "b", value: "b" },
    { label: "c", value: "c" },
    { label: "n", value: "n" },
    { label: "k", value: "k" },
    { label: "\\pi", value: "\\pi" },
    { label: "\\infty", value: "\\infty" },

    // Algebra
    { label: "x^2", value: "x^2" },
    { label: "x^3", value: "x^3" },
    { label: "x^n", value: "x^{n}" },
    { label: "1/x", value: "\\frac{1}{x}" },
    { label: "\\frac{a}{b}", value: "\\frac{a}{b}" },
    { label: "(a+b)^2", value: "(a+b)^2" },
    { label: "(a-b)^2", value: "(a-b)^2" },
    { label: "(a+b)^3", value: "(a+b)^3" },
    { label: "(a-b)^3", value: "(a-b)^3" },
    { label: "a^2 - b^2", value: "a^2 - b^2" },
    { label: "a^2 + b^2", value: "a^2 + b^2" },
    { label: "\\sqrt{x}", value: "\\sqrt{x}" },
    { label: "\\sqrt[n]{x}", value: "\\sqrt[n]{x}" },
    { label: "\\left( \\right)", value: "\\left( \\right)" },
    { label: "\\left[ \\right]", value: "\\left[ \\right]" },
    { label: "\\left\\{ \\right\\}", value: "\\left\\{ \\right\\}" },

    // Arithmetic
    { label: "+", value: "+" },
    { label: "-", value: "-" },
    { label: "\\times", value: "\\times" },
    { label: "\\div", value: "\\div" },
    { label: "\\cdot", value: "\\cdot" },
    { label: "\\pm", value: "\\pm" },
    { label: "\\mp", value: "\\mp" },
    { label: "=", value: "=" },
    { label: "\\neq", value: "\\neq" },
    { label: "\\approx", value: "\\approx" },
    { label: "\\leq", value: "\\leq" },
    { label: "\\geq", value: "\\geq" },

    // Calculus
    { label: "\\frac{d}{dx}", value: "\\frac{d}{dx}" },
    { label: "\\frac{dy}{dx}", value: "\\frac{dy}{dx}" },
    { label: "\\frac{\\partial}{\\partial x}", value: "\\frac{\\partial}{\\partial x}" },
    { label: "\\int_{a}^{b}", value: "\\int_{a}^{b}" },
    { label: "\\sum_{i=1}^{n}", value: "\\sum_{i=1}^{n}" },
    { label: "\\prod_{i=1}^{n}", value: "\\prod_{i=1}^{n}" },
    { label: "\\lim_{x \\to \\infty}", value: "\\lim_{x \\to \\infty}" },

    // Trigonometry
    { label: "\\sin \\theta", value: "\\sin \\theta" },
    { label: "\\cos \\theta", value: "\\cos \\theta" },
    { label: "\\tan \\theta", value: "\\tan \\theta" },
    { label: "\\sin^2 \\theta + \\cos^2 \\theta = 1", value: "\\sin^2 \\theta + \\cos^2 \\theta = 1" },

    // Logarithms & Exponentials
    { label: "\\ln x", value: "\\ln x" },
    { label: "\\log_a b", value: "\\log_a b" },
    { label: "e^x", value: "e^x" },
    { label: "e^{i\\pi}", value: "e^{i\\pi}" },

    // Vectors & Matrices
    { label: "\\vec{v}", value: "\\vec{v}" },
    { label: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", value: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
    { label: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}", value: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}" },

    // Logic & Sets
    { label: "\\forall", value: "\\forall" },
    { label: "\\exists", value: "\\exists" },
    { label: "\\not\\exists", value: "\\not\\exists" },
    { label: "\\land", value: "\\land" },
    { label: "\\lor", value: "\\lor" },
    { label: "\\neg", value: "\\neg" },
    { label: "\\implies", value: "\\implies" },
    { label: "\\iff", value: "\\iff" },
    { label: "\\in", value: "\\in" },
    { label: "\\notin", value: "\\notin" },
    { label: "\\subset", value: "\\subset" },
    { label: "\\subseteq", value: "\\subseteq" },
    { label: "\\cup", value: "\\cup" },
    { label: "\\cap", value: "\\cap" },
    { label: "\\emptyset", value: "\\emptyset" },

    // Special formatting
    { label: "\\mathrm{Big}", value: "\\mathrm{Big}" },
    { label: "\\left(", value: "\\left(" },
    { label: "\\right)", value: "\\right)" },
    { label: "\\left[", value: "\\left[" },
    { label: "\\right]", value: "\\right]" },
    { label: "\\left\\{", value: "\\left\\{" },
    { label: "\\right\\}", value: "\\right\\}" },
];


// export const TEMPLATES: Template[] = [
//     {
//         name: "Fraction",
//         latex: "\\frac{{{a}}}{{{b}}}",
//         fields: [
//             { label: "Numerator", key: "a", placeholder: "e.g. 3", defaultValue: "3" },
//             { label: "Denominator", key: "b", placeholder: "e.g. 4", defaultValue: "4" },
//         ],
//     },
//     {
//         name: "Square Root",
//         latex: "\\sqrt{{{a}}}",
//         fields: [
//             { label: "Radicand", key: "a", placeholder: "e.g. 2x", defaultValue: "x" },
//         ],
//     },
//     {
//         name: "nth Root",
//         latex: "\\sqrt[{{{n}}}]{ {{a}} }",
//         fields: [
//             { label: "Index (n)", key: "n", placeholder: "e.g. 3", defaultValue: "3" },
//             { label: "Radicand", key: "a", placeholder: "e.g. x", defaultValue: "x" },
//         ],
//     },
//     {
//         name: "Integral (Definite)",
//         latex: "\\int_{ {{lower}} }^{ {{upper}} } {{function}} \\, dx",
//         fields: [
//             { label: "Lower limit", key: "lower", placeholder: "0", defaultValue: "0" },
//             { label: "Upper limit", key: "upper", placeholder: "1", defaultValue: "1" },
//             { label: "Function", key: "function", placeholder: "x^2", defaultValue: "x^2" },
//         ],
//     },
//     {
//         name: "Summation",
//         latex: "\\sum_{ {{start}} }^{ {{end}} } {{term}}",
//         fields: [
//             { label: "Start", key: "start", placeholder: "i=1", defaultValue: "i=1" },
//             { label: "End", key: "end", placeholder: "n", defaultValue: "n" },
//             { label: "Term", key: "term", placeholder: "a_i", defaultValue: "a_i" },
//         ],
//     },
//     {
//         name: "Limit",
//         latex: "\\lim_{ {{var}} \\to {{value}} } {{function}}",
//         fields: [
//             { label: "Variable", key: "var", placeholder: "x", defaultValue: "x" },
//             { label: "Value", key: "value", placeholder: "\\infty", defaultValue: "\\infty" },
//             { label: "Function", key: "function", placeholder: "f(x)", defaultValue: "f(x)" },
//         ],
//     },
//     {
//         name: "Quadratic Formula",
//         latex: "x = \\frac{ -{{b}} \\pm \\sqrt{ {{b}}^2 - 4{{a}}{{c}} } }{ 2{{a}} }",
//         fields: [
//             { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
//             { label: "b", key: "b", placeholder: "-3", defaultValue: "-3" },
//             { label: "c", key: "c", placeholder: "2", defaultValue: "2" },
//         ],
//     },
//     {
//         name: "Matrix 2×2",
//         latex: "\\begin{pmatrix} {{a}} & {{b}} \\\\ {{c}} & {{d}} \\end{pmatrix}",
//         fields: [
//             { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
//             { label: "b", key: "b", placeholder: "2", defaultValue: "2" },
//             { label: "c", key: "c", placeholder: "3", defaultValue: "3" },
//             { label: "d", key: "d", placeholder: "4", defaultValue: "4" },
//         ],
//     },
//     {
//         name: "Piecewise Function",
//         latex: "\\begin{cases} {{expr1}} & \\text{if } {{cond1}} \\\\ {{expr2}} & \\text{if } {{cond2}} \\end{cases}",
//         fields: [
//             { label: "Expression 1", key: "expr1", placeholder: "x", defaultValue: "x" },
//             { label: "Condition 1", key: "cond1", placeholder: "x \\ge 0", defaultValue: "x \\ge 0" },
//             { label: "Expression 2", key: "expr2", placeholder: "-x", defaultValue: "-x" },
//             { label: "Condition 2", key: "cond2", placeholder: "x < 0", defaultValue: "x < 0" },
//         ],
//     },
//     {
//         name: "Binomial Coefficient",
//         latex: "\\binom{ {{n}} }{ {{k}} }",
//         fields: [
//             { label: "n", key: "n", placeholder: "5", defaultValue: "5" },
//             { label: "k", key: "k", placeholder: "2", defaultValue: "2" },
//         ],
//     },
//     {
//         name: "Long Division (Polynomial)",
//         latex: `\\begin{array}{r|rrrr}
//       & {{q1}} & +{{q2}} & +{{q3}} \\\\
//       {{divisor}} & {{d0}} & {{d1}} & {{d2}} & {{d3}} \\\\
//       & {{d0}} & -{{d1}} & & \\\\
//       \\hline
//       & & {{r1}} & -{{r2}} & +{{r3}} \\\\
//       & & {{r1}} & -{{r2}} & \\\\
//       \\hline
//       & & & & {{rem}}
//     \\end{array}`,
//         fields: [
//             { label: "Quotient term 1", key: "q1", placeholder: "x^2", defaultValue: "x^2" },
//             { label: "Quotient term 2", key: "q2", placeholder: "x", defaultValue: "x" },
//             { label: "Quotient term 3", key: "q3", placeholder: "1", defaultValue: "1" },
//             { label: "Divisor", key: "divisor", placeholder: "x-1", defaultValue: "x-1" },
//             { label: "Dividend term 0", key: "d0", placeholder: "x^3", defaultValue: "x^3" },
//             { label: "Dividend term 1", key: "d1", placeholder: "0x^2", defaultValue: "0x^2" },
//             { label: "Dividend term 2", key: "d2", placeholder: "-x", defaultValue: "-x" },
//             { label: "Dividend term 3", key: "d3", placeholder: "1", defaultValue: "1" },
//             { label: "Remainder", key: "rem", placeholder: "0", defaultValue: "0" },
//             { label: "r1", key: "r1", placeholder: "x^2", defaultValue: "x^2" },
//             { label: "r2", key: "r2", placeholder: "x", defaultValue: "x" },
//             { label: "r3", key: "r3", placeholder: "1", defaultValue: "1" },
//         ],
//     },
//     {
//         name: "Power of Expression",
//         latex: "\\left( {{expr}} \\right)^{ {{n}} }",
//         fields: [
//             { label: "Expression", key: "expr", placeholder: "e.g. x^2 - 2 + 1/x^2", defaultValue: "x^2 - 2 + \\frac{1}{x^2}" },
//             { label: "Power (n)", key: "n", placeholder: "e.g. 7", defaultValue: "7" },
//         ],
//     },
//     {
//         name: "Logarithm",
//         latex: "\\log_{ {{base}} }( {{arg}} )",
//         fields: [
//             { label: "Base", key: "base", placeholder: "e.g. 10", defaultValue: "10" },
//             { label: "Argument", key: "arg", placeholder: "e.g. x", defaultValue: "x" },
//         ],
//     },
//     {
//         name: "Natural Log (ln)",
//         latex: "\\ln( {{arg}} )",
//         fields: [
//             { label: "Argument", key: "arg", placeholder: "e.g. x", defaultValue: "x" },
//         ],
//     },
//     {
//         name: "Sine",
//         latex: "\\sin( {{angle}} )",
//         fields: [
//             { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
//         ],
//     },
//     {
//         name: "Cosine",
//         latex: "\\cos( {{angle}} )",
//         fields: [
//             { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
//         ],
//     },
//     {
//         name: "Tangent",
//         latex: "\\tan( {{angle}} )",
//         fields: [
//             { label: "Angle", key: "angle", placeholder: "e.g. \\theta", defaultValue: "\\theta" },
//         ],
//     },
//     {
//         name: "Derivative",
//         latex: "\\frac{d}{d{{var}}} {{func}}",
//         fields: [
//             { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
//             { label: "Function", key: "func", placeholder: "e.g. f(x)", defaultValue: "f(x)" },
//         ],
//     },
//     {
//         name: "Partial Derivative",
//         latex: "\\frac{\\partial}{\\partial {{var}}} {{func}}",
//         fields: [
//             { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
//             { label: "Function", key: "func", placeholder: "e.g. f(x,y)", defaultValue: "f(x,y)" },
//         ],
//     },
//     {
//         name: "Absolute Value",
//         latex: "\\left| {{expr}} \\right|",
//         fields: [
//             { label: "Expression", key: "expr", placeholder: "e.g. x", defaultValue: "x" },
//         ],
//     },
//     {
//         name: "Set Builder",
//         latex: "\\{ {{var}} \\mid {{condition}} \\}",
//         fields: [
//             { label: "Variable", key: "var", placeholder: "e.g. x", defaultValue: "x" },
//             { label: "Condition", key: "condition", placeholder: "e.g. x \\in \\mathbb{R}", defaultValue: "x \\in \\mathbb{R}" },
//         ],
//     },
//     {
//         name: "Column Vector (3×1)",
//         latex: "\\begin{pmatrix} {{x}} \\\\ {{y}} \\\\ {{z}} \\end{pmatrix}",
//         fields: [
//             { label: "x-component", key: "x", placeholder: "1", defaultValue: "1" },
//             { label: "y-component", key: "y", placeholder: "2", defaultValue: "2" },
//             { label: "z-component", key: "z", placeholder: "3", defaultValue: "3" },
//         ],
//     },
//     {
//         name: "Matrix 3×3",
//         latex: "\\begin{pmatrix} {{a}} & {{b}} & {{c}} \\\\ {{d}} & {{e}} & {{f}} \\\\ {{g}} & {{h}} & {{i}} \\end{pmatrix}",
//         fields: [
//             { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
//             { label: "b", key: "b", placeholder: "2", defaultValue: "2" },
//             { label: "c", key: "c", placeholder: "3", defaultValue: "3" },
//             { label: "d", key: "d", placeholder: "4", defaultValue: "4" },
//             { label: "e", key: "e", placeholder: "5", defaultValue: "5" },
//             { label: "f", key: "f", placeholder: "6", defaultValue: "6" },
//             { label: "g", key: "g", placeholder: "7", defaultValue: "7" },
//             { label: "h", key: "h", placeholder: "8", defaultValue: "8" },
//             { label: "i", key: "i", placeholder: "9", defaultValue: "9" },
//         ],
//     },
//     {
//         name: "Product (Pi notation)",
//         latex: "\\prod_{ {{start}} }^{ {{end}} } {{term}}",
//         fields: [
//             { label: "Start", key: "start", placeholder: "i=1", defaultValue: "i=1" },
//             { label: "End", key: "end", placeholder: "n", defaultValue: "n" },
//             { label: "Term", key: "term", placeholder: "a_i", defaultValue: "a_i" },
//         ],
//     },
//     {
//         name: "Limit (general)",
//         latex: "\\lim_{ {{var}} \\to {{value}} } {{func}}",
//         fields: [
//             { label: "Variable", key: "var", placeholder: "x", defaultValue: "x" },
//             { label: "Value", key: "value", placeholder: "\\infty", defaultValue: "\\infty" },
//             { label: "Function", key: "func", placeholder: "f(x)", defaultValue: "f(x)" },
//         ],
//     },
//     {
//         name: "Binomial Expansion (generic)",
//         latex: "( {{a}} + {{b}} )^{ {{n}} }",
//         fields: [
//             { label: "First term (a)", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "Second term (b)", key: "b", placeholder: "y", defaultValue: "y" },
//             { label: "Power (n)", key: "n", placeholder: "2", defaultValue: "2" },
//         ],
//     },
//     {
//         name: "Difference of squares",
//         latex: "{{a}}^2 - {{b}}^2 = ({{a}} - {{b}})({{a}} + {{b}})",
//         fields: [
//             { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
//         ],
//     },
//     {
//         name: "Square of sum",
//         latex: "( {{a}} + {{b}} )^2 = {{a}}^2 + 2{{a}}{{b}} + {{b}}^2",
//         fields: [
//             { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
//         ],
//     },
//     {
//         name: "Square of difference",
//         latex: "( {{a}} - {{b}} )^2 = {{a}}^2 - 2{{a}}{{b}} + {{b}}^2",
//         fields: [
//             { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
//         ],
//     },
//     {
//         name: "Cube of sum",
//         latex: "( {{a}} + {{b}} )^3 = {{a}}^3 + 3{{a}}^2{{b}} + 3{{a}}{{b}}^2 + {{b}}^3",
//         fields: [
//             { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
//         ],
//     },
//     {
//         name: "Cube of difference",
//         latex: "( {{a}} - {{b}} )^3 = {{a}}^3 - 3{{a}}^2{{b}} + 3{{a}}{{b}}^2 - {{b}}^3",
//         fields: [
//             { label: "a", key: "a", placeholder: "x", defaultValue: "x" },
//             { label: "b", key: "b", placeholder: "y", defaultValue: "y" },
//         ],
//     },
//     {
//         name: "Quadratic formula (general)",
//         latex: "x = \\frac{ -{{b}} \\pm \\sqrt{ {{b}}^2 - 4{{a}}{{c}} } }{ 2{{a}} }",
//         fields: [
//             { label: "a", key: "a", placeholder: "1", defaultValue: "1" },
//             { label: "b", key: "b", placeholder: "-3", defaultValue: "-3" },
//             { label: "c", key: "c", placeholder: "2", defaultValue: "2" },
//         ],
//     },
// ];