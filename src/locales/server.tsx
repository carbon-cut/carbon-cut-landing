'use server'
import content from './fr'

//const unit = content.forms.unit;
const useScopedServerI18n = (scope?: string) => {
    return (...keys: [string, ...unknown[]]) => {
        const scopeParts = scope?.split('.') || []; // Split the scope into parts
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
        if (!scopedContent) return `Missing translation for ${scope}.${keys[0]}`
        else if (typeof scopedContent === 'string') return scopedContent;
        else if (Array.isArray(scopedContent)) return scopedContent;
        else if (typeof scopedContent === 'function') {
            //@ts-ignore
            return scopedContent(keys[1]);
        }
        else return `Invalid translation type for ${scope}.${keys[0]}`;
    };
};

export { useScopedServerI18n };
