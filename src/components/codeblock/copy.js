/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import copyToClipBoard from "../../utils/copy-to-clipboard"

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

function Copy({ className, content, fileName, duration = 3000 }) {
  const [copied, setCopied] = React.useState(false)
  const label = copied
    ? `${fileName ? fileName + ` ` : ``}copied to clipboard`
    : `${fileName ? fileName + `: ` : ``}copy code to clipboard`

  return (
    <button
      name={label}
      className={className}
      disabled={copied}
      sx={{
        backgroundColor: `transparent`,
        border: `none`,
        cursor: `pointer`,
        color: t => `${t.colors.code.copyButton}`,
        fontSize: 1,
        fontFamily: t => `${t.fonts.gloria}`,
        lineHeight: t => `${t.lineHeights.solid}`,
        p: 2,
        "&[disabled]": {
          cursor: `not-allowed`,
        },
        "&:not([disabled]):hover": {
          bg: t => `${t.colors.grey[30]}`,
        },
        "&:active": {
          boxShadow: t => `${t.shadows.floating}`,
        },
      }}
      onClick={async () => {
        await copyToClipBoard(content)
        setCopied(true)
        await delay(duration)
        setCopied(false)
      }}
    >
      {copied ? `Copied` : `Copy`}
    </button>
  )
}

export default Copy