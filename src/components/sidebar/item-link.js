/** @jsx jsx */
import { jsx } from "theme-ui"

import indention from "../../utils/sidebar/indent"

function ItemLink({ item }) {
  // const { onLinkClick, getItemState } = use
  const level = item.level;
  const indent = indention(level+1);

  return (
    <span
      sx={{
        display: `flex`,
        alignItems: `center`,
        position: `relative`,
        "&:before": {
          content: `''`,
          position: `absolute`,
          left: indent,
          bottom: 0,
          bg: ``, // TODO
        }
      }}
    >
      { item.title }
    </span>
  )
}

export default ItemLink