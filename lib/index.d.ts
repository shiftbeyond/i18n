interface CreateTranslatorProps {
    language: string;
    translations: {
        [key: string]: {
            [key: string]: string;
        };
    };
    replaceString?: string;
    linebreakString?: string;
}
export declare const createTranslator: <Term extends string>({ language, translations, replaceString, linebreakString, }: CreateTranslatorProps) => {
    t: (term: Term | Term[], replace?: boolean) => string;
    pluralize: (term: string) => Term;
};
export {};
