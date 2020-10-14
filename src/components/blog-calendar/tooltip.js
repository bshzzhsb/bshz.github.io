/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Link from "../link"

function Tooltip({ content, top, left, className }) {

  return (
    <div
      className={className}
      sx={{
        position: `fixed`,
        top: `${top}px`,
        left: `${left}px`,
        backgroundColor: t => t.colors.blackFade[80],
      }}
    >
      {content.blogs && content.blogs.map((blog, i) => (
        <React.Fragment>
          <Link
            to={blog.slug}
            sx={{
              color: t => t.colors.white,
              "&:nth-last-child(2)": {
                mr: t => t.space[2],
              },
            }}
          >
            {blog.title}
          </Link>
          {i < content.blogs.length - 1 && '、'}
        </React.Fragment>
      ))}
      {content.commits && (
        <span sx={{mr: t => t.space[2]}}>
          {content.commits}
        </span>
      )}
      {content.date}
    </div>
  )
}

export default Tooltip