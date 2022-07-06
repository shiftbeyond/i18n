interface CreateTranslatorProps {
    language: string;
    translations: {
        [key: string]: {
            [key: string]: string;
        };
    };
    replaceString?: string;
    linebreakString?: string;
    noWrapString?: string;
}
export declare const createTranslator: <Term extends string>({ language, translations, replaceString, linebreakString, noWrapString, }: CreateTranslatorProps) => {
    t: (term: Term | Term[], options?: {
        replace?: boolean;
    }) => string;
    pluralize: (term: string) => Term;
    replaceString: string;
    linebreakString: string;
    noWrapString: string;
};
export {};
