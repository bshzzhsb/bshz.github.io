import React from "react"

import CodeBlock from "../components/codeblock"
import FAQ from "../components/doc-components/FAQ"

const h1 = ({ children }) => (
  <h1 id={children}>{children}</h1>
)

export default {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  FAQ,
  h1: ({ children }) => <h1 id={children}>{children}</h1>,
  h2: ({ children }) => <h2 id={children}>{children}</h2>,
  h3: ({ children }) => <h3 id={children}>{children}</h3>,
  h4: ({ children }) => <h4 id={children}>{children}</h4>,
  h5: ({ children }) => <h5 id={children}>{children}</h5>,
  h6: ({ children }) => <h6 id={children}>{children}</h6>,
}