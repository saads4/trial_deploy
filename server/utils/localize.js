export const localizeField = (field, lang) => {

  if (!field) return "";

  if (typeof field === "object") {
    return field[lang] || field.en || "";
  }

  return field;
};