/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"

const Question = styled(`div`)`
  --md-admonition-icon--question: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 00-2-2 2 2 0 00-2 2H8a4 4 0 014-4 4 4 0 014 4 3.2 3.2 0 01-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10c0-5.53-4.5-10-10-10z"/></svg>');
`

const FAQ = ({children, title}) => {
  return (
    <Question sx={{
      borderLeft: `0.2rem solid #64dd17`,
      borderRadius: `0.1rem`,
      m: `1.5625em 0`,
      p: `0 0.6rem`,
      lineHeight: `1.6`,
      fontSize: `0.8rem`,
      overflow: `hidden`,
      boxShadow: `0 .2rem .5rem rgba(0,0,0,.05),0 0 .05rem rgba(0,0,0,.1)`,
      pageBreakInside: `avoid`,
      colorAdjust: `exact`,
    }}>
        <p sx={{
          bg: `rgba(100, 221, 23, 0.1)`,
          position: `relative`,
          m: `0 -0.6rem`,
          p: `0.4rem 0.6rem 0.4rem 2.4rem`,
          fontWeight: `700`,
          height: `2.4rem`,
          lineHeight: `24px`,
          "::before": {
            bg: `#64dd17`,
            maskImage: `var(--md-admonition-icon--question)`,
            content: `''`,
            position: `absolute`,
            top: `0.6rem`,
            left: `0.6rem`,
            width: `1.2rem`,
            height: `1.2rem`,
            borderRadius: `0.6rem`,
          }
        }}>{title}</p>
        <p sx={{
          m: `0.8em 0 0.6rem 0`
        }}>{children}</p>
    </Question>
  )
}

export default FAQ