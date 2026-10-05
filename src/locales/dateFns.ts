import { fr } from "date-fns/locale";

const dateFnsLocales = { fr } as const;

export function getDateFnsLocale(locale: string) {
  return dateFnsLocales[locale as keyof typeof dateFnsLocales] ?? dateFnsLocales.fr;
}
