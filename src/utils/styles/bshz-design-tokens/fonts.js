const f = () => {
  const system = [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji"
  ]
  const body = system

  const monospace = [
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace"
  ]

  const serif = ["Georgia", "Times New Roman", "Times", "serif"]

  const dancingScript = ["Dancing Script"]

  const gloria = ['Gloria Hallelujah']

  const noto = ['noto serif sc']

  const fonts = { body, system, monospace, serif, dancingScript, gloria, noto }

  let fontsStrings = {}
  for (const fontFamily in fonts) {
    fontsStrings[fontFamily] = fonts[fontFamily].join(", ")
  }

  return { fonts, fontsStrings }
}

export const { fonts: fontsLists, fontsStrings: fonts } = f()

