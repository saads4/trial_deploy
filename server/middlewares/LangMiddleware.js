const allowedLanguages = ["en", "ar", "fr", "es", "ru"];

export const detectLanguage = (req, res, next) => {

  const requestedLang = req.headers["x-language"];

  if (allowedLanguages.includes(requestedLang)) {
    req.lang = requestedLang;
  } else {
    req.lang = "en";
  }

  next();
};