import { enUS, fr } from "date-fns/locale";

const dateFnsLocales = { fr, en: enUS } as const;

export function getDateFnsLocale(locale: string) {
  return dateFnsLocales[locale as keyof typeof dateFnsLocales] ?? dateFnsLocales.fr;
}
