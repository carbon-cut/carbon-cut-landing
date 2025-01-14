import content from './fr'

const useScopedI18n = (scope: string) => {
    return (...keys: [string, ...unknown[]]) => {
        const scopeParts = scope.split('.'); // Split the scope into parts
        let scopedContent = content;

        // Traverse the content object based on scope parts
        for (const part of scopeParts) {
            //@ts-ignore
            scopedContent = scopedContent?.[part];
            if (!scopedContent) break; // Exit if any part is undefined
        }

        const scopedKeys = keys[0].split('.')

        // Traverse the content object based on scope parts
        for (const part of scopedKeys) {
            //@ts-ignore
            scopedContent = scopedContent?.[part];
            if (!scopedContent) break; // Exit if any part is undefined
        }

        // Return the requested key or a fallback message
        if (!scopedContent || typeof scopedContent != 'string') return `Missing translation for ${scope}.${keys[0]}`
        
        return scopedContent;
    };
};

export { useScopedI18n };