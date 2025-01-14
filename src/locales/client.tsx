import content from './fr'

const useScopedI18n = (scope: string) => {
    return (...keys: [string, ...any[]]) => {
        const scopeParts = scope.split('.'); // Split the scope into parts
        let scopedContent = content;

        // Traverse the content object based on scope parts
        for (const part of scopeParts) {
            //@ts-ignore
            scopedContent = scopedContent?.[part];
            if (!scopedContent) break; // Exit if any part is undefined
        }

        // Return the requested key or a fallback message
        //@ts-ignore
        return scopedContent?.[keys[0]] || `Missing translation for ${scope}.${keys[0]}`;
    };
};

export { useScopedI18n };