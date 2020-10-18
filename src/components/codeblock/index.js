/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

import Copy from "./copy"

function CodeBlock({ children: { props: { children, className, title }}}) {
  const language = className.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={undefined}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && (
            <div className="gatsby-code-title">
              <div sx={{ fontSize: 0 }}>{title}</div>
            </div>
          )}
          <div className="gatsby-highlight">
            <Copy
              content={children}
              fileName={title}
              sx={{
                position: `absolute`,
                right: t => t.space[1],
                top: t => t.space[1],
                borderRadius: 2,
              }}
            />
            <pre className={`language-${language}`}>
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })
                  const className = [lineProps.className].join(' ')
                  return (
                    <div
                      key={i}
                      {...Object.assign({}, lineProps, {
                        className,
                      })}
                    >
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  )
}

export default CodeBlock