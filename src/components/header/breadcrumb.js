/** @jsx jsx */
import { jsx } from "theme-ui"

import Link from "../link"

function Breadcrumb({ siteTitle, mdxTitle }) {

  return (
    <div sx={{
      mx: `1rem`,
    }}>
      <Link
        to="/"
        sx={{
          color: t => mdxTitle ? t.colors.black : t.colors.blackFade[70],
        }}
      >
        {siteTitle}
      </Link>
      {mdxTitle && (
        <span sx={{ color: t => t.colors.blackFade[70] }}>
          &nbsp;/ {mdxTitle}
        </span>
      )}
    </div>
  )
}

export default Breadcrumb