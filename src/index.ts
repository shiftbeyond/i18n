interface CreateTranslatorProps {
  language: string;
  translations: { [key: string]: { [key: string]: string } };
  replaceString?: string;
  linebreakString?: string;
  noWrapString?: string;
}

const escapeString = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createTranslator = <Term extends string>({
  language,
  translations,
  replaceString = '###',
  linebreakString = '///',
  noWrapString = '+++',
}: CreateTranslatorProps) => {
  const translate = (term: Term, capitalize?: boolean): string => {
    let translation: string;
    try {
      const alias = translations[term].alias;
      if (alias) {
        translation = (translations[alias] as any)[language];
      }
      translation = translations[term][language];
    } catch (error) {
      translation = term;
    }

    return capitalize
      ? translation.charAt(0).toUpperCase() + translation.slice(1)
      : translation;
  };

  const t = (
    term: Term | Term[],
    options?: { replace?: boolean; capitalize?: boolean },
  ): string => {
    const terms = Array.isArray(term) ? term : [term];
    if (options?.replace) {
      const [mainTerm, ...subTerms] = terms;
      const mainTranslation = translate(mainTerm);
      return mainTranslation
        .replace(
          replaceString,
          subTerms.map((term) => translate(term, options.capitalize)).join(' '),
        )
        .replace(new RegExp(escapeString(linebreakString), 'g'), '\n')
        .replace(new RegExp(escapeString(noWrapString), 'g'), '\u00A0');
    } else {
      return terms
        .map((term) => translate(term, options?.capitalize))
        .join(' ')
        .replace(new RegExp(escapeString(linebreakString), 'g'), '\n')
        .replace(new RegExp(escapeString(noWrapString), 'g'), '\u00A0');
    }
  };

  const pluralize = (term: string) => `${term}s` as unknown as Term;

  return { t, pluralize, replaceString, linebreakString, noWrapString };
};
