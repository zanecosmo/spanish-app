export const hasNoCharacters = (text: string) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") return false;
    };
    return true;
};

export const validateInput = (value: string | null, input: string): string | null => {
    if (value === null) return `DOM does not contain ${input}-input element`;
    if (value.length === 0) return `must enter a value for the ${input} input`;
    if (hasNoCharacters(value)) return `${input} input must contain characters`;
    return null;
};