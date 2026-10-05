export type LocaleKey = string;

export declare function useI18n(): (key: string, ...args: any[]) => string;
export declare function useScopedI18n(scope: string): (key: string, ...args: any[]) => string;
export declare const I18nProviderClient: (props: any) => JSX.Element;
export declare function useCurrentLocale(): string;
