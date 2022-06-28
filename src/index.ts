interface CreateTranslatorProps {
  language: string;
  translations: { [key: string]: { [key: string]: string } };
  replaceString?: string;
}

export const createTranslator = <Term extends string>({
  language,
  translations,
  replaceString = '###',
}: CreateTranslatorProps) => {
  const translate = (term: Term): string => {
    try {
      const alias = translations[term].alias;
      if (alias) {
        return (translations[alias] as any)[language];
      }
      return translations[term][language];
    } catch (error) {
      return term;
    }
  };

  const t = (term: Term | Term[], replace?: boolean): string => {
    const terms = Array.isArray(term) ? term : [term];
    if (replace) {
      const [mainTerm, ...subTerms] = terms;
      const mainTranslation = translate(mainTerm);
      return mainTranslation.replace(
        replaceString,
        subTerms.map(translate).join(' '),
      );
    } else {
      return terms.map((term) => translate(term)).join(' ');
    }
  };

  const pluralize = (term: string) => `${term}s` as unknown as Term;

  return { t, pluralize };
};