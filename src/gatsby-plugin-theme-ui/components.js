import React from "react"

import CodeBlock from "../components/codeblock"
import FAQ from "../components/doc-components/FAQ"

export default {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  FAQ,
}