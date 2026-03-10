import { translate } from 'google-translate-api-x';

export const translateContent = async (text) => {
  if (!text) return { en: "", ar: "", fr: "", es: "", ru: "" };
  
  const targetLangs = ['ar', 'fr', 'es', 'ru'];
  const result = { en: text };

  for (const lang of targetLangs) {
    try {
      const res = await translate(text, { to: lang });
      result[lang] = res.text;
    } catch (err) {
      result[lang] = text; // If translation fails, just use English
    }
  }
  return result;
};