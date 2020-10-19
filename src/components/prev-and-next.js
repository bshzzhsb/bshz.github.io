/** @jsx jsx */
import { jsx } from "theme-ui"
import { MdArrowBack, MdArrowForward } from "react-icons/all"

import Link from "./link"

const prevNextLinkStyles = {
  color: t => t.colors.blue[50],
  fontSize: t => t.fontSizes[3],
  fontWeight: t => t.fontWeights.semiBold,
  lineHeight: t => t.lineHeights.dense,
  display: `flex`,
  alignItems: `center`
}

const prevNextLabelStyles = {
  color: t => t.colors.blackFade[80],
  fontSize: t => t.fontSizes[2],
  mb: 2
}

const PrevAndNext = ({ prev = null, next = null, ...props }) => {
  if (!prev && !next) {
    return null
  }
  return (
    <nav
      aria-label="pagination"
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        width: `100%`,
        mt: t => t.space[7],
        mb: t => t.space[4],
      }}
      {...props}
    >
      <div sx={{ flex: `1 1 48%` }}>
        {prev && (
          <Link to={prev.link} sx={prevNextLinkStyles}>
            <MdArrowBack
              sx={{
                flexShrink: 0,
                mr: `0.5rem`,
                verticalAlign: `sub`
              }}
            />
            <div>
              <div sx={prevNextLabelStyles}>Previous</div>
              <span
                sx={{
                  display: `inline-flex`,
                  alignItems: `center`
                }}
              >
                {prev.title}
              </span>
            </div>
          </Link>
        )}
      </div>
      <div
        sx={{
          flex: `1 1 48%`,
          textAlign: `right`,
          justifySelf: `flex-end`,
        }}
      >
        {next && (
          <Link
            to={next.link}
            sx={{
              ...prevNextLinkStyles,
              justifyContent: `flex-end`,
            }}
          >
            <div>
              <div sx={prevNextLabelStyles}>Next</div>
              <span
                sx={{
                  display: `inline-flex`,
                  alignItems: `center`
                }}
              >
                {next.title}
              </span>
            </div>
            <MdArrowForward
              sx={{
                flexShrink: 0,
                ml: `0.5rem`,
                verticalAlign: `sub`
              }}
            />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default PrevAndNext