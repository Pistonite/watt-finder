
const LANG = {};
const LANGUAGES = [
  { name: "English", locale: "en_US" },
  { name: "\u7b80\u4f53\u4e2d\u6587", locale: "zh_CN" }
];
const LANG_FILES = {};

LANGUAGES.forEach(lang => document.write(`<script src="lang/${lang.locale}.js"></script>`));

LANG.localize = key => LANG.language ? (LANG.language[key] ? LANG.language[key] : key) : key;
LANG.setupLanguage = () => {
  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = 0;
    localStorage.setItem("lang", 0);
  }
  LANG.loadLanguage(parseInt(lang));
};

LANG.loadLanguage = (i) => {
  LANG.language = LANG_FILES[LANGUAGES[i].locale];
};

LANG.$makeLanguageSelector = () => {
  const $selector = $("<select>");
  LANGUAGES.forEach((lang, i) => $selector.append($("<option>").val(i).text(lang.name)));
  const lang = localStorage.getItem("lang");
  $selector.val(parseInt(lang));
  $selector.on("input", () => {
    const i = parseInt($selector.val());
    LANG.loadLanguage(i);
    localStorage.setItem("lang", i);
    window.location.reload();
  });
  return $selector;
};

