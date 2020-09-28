const defaultLang = `en`

function isDefaultLang(locale) {
  return locale === defaultLang
}

/**
 * Get the path prefixed with the locale
 * @param {string} locale the locale to prefix with
 * @param {string} path the path to prefix
 */
function localizedPath(locale, path) {
  // Our default language isn't prefixed for back-compat
  if (isDefaultLang(locale)) {
    return path
  }

  const [, base] = path.split(`/`)

  // If for whatever reason we receive an already localized path
  // (e.g. if the path was made with location.pathname)
  // just return it as-is.
  console.log(path, locale);
  
  if (base === locale) {
    return path
  }

  // If it's another language, prefix with the locale
  return `/${locale}${path}`
}

function getLocaleAndBasePath(path) {
  return { locale: defaultLang, basePath: decodeURI(path) }
}

module.exports = {
  defaultLang,
  localizedPath,
  getLocaleAndBasePath,
}