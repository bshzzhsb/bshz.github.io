/** @jsx jsx */
import { jsx } from "theme-ui"

import indention from "../../utils/sidebar/indent"
import { useTOCContext } from "./index"

const TOCItem = ({ item, level = 0 }) => {
  const indent = indention(level);
  const activeItem = useTOCContext();

  return (
    <li>
      <span
        sx={{
          pl:`calc(${indent} + 8px)`,
          cursor: `pointer`,
          position: `relative`,
          display: `inline-block`,
          height: t => t.space[6],
          fontSize: t => t.fontSizes[1],
          width: `100%`,
          overflow: `hidden`,
          whiteSpace: `nowrap`,
          textOverflow: `ellipsis`,
          fontWeight: t => item.title === activeItem ? t.fontWeights.semiBold : t.fontWeights.body,
          "&::before": {
            content: item.title === activeItem && `''`,
            width: `2px`,
            height: t => t.space[3],
            position: `absolute`,
            left: 0,
            top: t => `calc(${t.space[6]} / 2 - ${t.space[3]} / 2)`,
            background: t => t.colors.green[60],
          },
        }}
        onClick={() => {window.scrollTo({top: document.getElementById(item.title).offsetTop, behavior: "smooth"})}}
      >
        {item.title}
      </span>
      {item.items && (
        <ul
          sx={{
            listStyle: `none`,
          }}
        >
          {item.items.map((item) => (
            <TOCItem item={item} level={level+1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default TOCItem