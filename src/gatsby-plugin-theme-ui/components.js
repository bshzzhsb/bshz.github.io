import React from "react"

import CodeBlock from "../components/codeblock"
import MdxLink from "../components/mdx-link"
import FAQ from "../components/FAQ"

export default {
  a: MdxLink,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  FAQ,
}