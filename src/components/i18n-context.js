import React from "react"
import { defaultLang } from "../utils/i18n"

const LocaleContext = React.createContext(defaultLang)

export function useLocale() {
  return React.useContext(LocaleContext)
}