import { FieldValue, Template } from "@/services/types";

export function generateId(): string {
    const prefix = "abufc";
    const timestamp = Date.now().toString(36);
    const random = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    return `${prefix}_${timestamp}_${random}`;
}

export function createDefaultOptions() {
    return [
        { id: generateId(), text: "", isCorrect: false },
        { id: generateId(), text: "", isCorrect: false },
        { id: generateId(), text: "", isCorrect: false },
        { id: generateId(), text: "", isCorrect: false },
    ];
}


export function generateLatexRecursive(template: Template, fields: Record<string, FieldValue>): string {
    let latex = template.latex;
    Object.entries(fields).forEach(([key, field]) => {
        let replacement = "";
        if (field.type === "text") {
            replacement = field.value || key;
        } else {
            replacement = generateLatexRecursive(field.template, field.fields);
        }
        latex = latex.replace(new RegExp(`{{${key}}}`, "g"), replacement);
    });
    return latex;
}

export function getDefaultFields(template: Template): Record<string, FieldValue> {
    const fields: Record<string, FieldValue> = {};
    template.fields.forEach((f) => {
        fields[f.key] = { type: "text", value: f.defaultValue || "" };
    });
    return fields;
}

export function getDefaultLatex(template: Template): string {
    let latex = template.latex;
    template.fields.forEach((field) => {
        const value = field.defaultValue || field.key;
        latex = latex.replace(new RegExp(`{{${field.key}}}`, "g"), value);
    });
    return latex;
}
