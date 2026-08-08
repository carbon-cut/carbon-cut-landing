export declare function getI18n(): Promise<(key: string, ...args: any[]) => string>;
export declare function getScopedI18n(
  scope: string
): Promise<(key: string, ...args: any[]) => string>;
export declare function getStaticParams(): { locale: string }[];
export declare function getCurrentLocale(): Promise<string>;
