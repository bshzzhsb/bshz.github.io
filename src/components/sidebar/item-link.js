/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import indention from "../../utils/sidebar/indent"
import { useSidebarContext } from "./sidebar"

function ItemLink({ item, overrideCSS }) {
  const { onLinkClick, getItemState } = useSidebarContext()
  const { isActive, inActiveTree } = getItemState(item)
  const level = item.level;
  const indent = indention(level+1);

  return (
    <span
      sx={{
        display: `flex`,
        alignItems: `center`,
        position: `relative`,
      }}
    >
      <Link
        sx={{
          minHeight: `40px`,
          lineHeight: `32px`,
          pl: indent,
          pr: 4,
          py: 1,
          textDecoration: `none`,
          width: `100%`,
          zIndex: 1,
          "&&": {
            border: 0,
            ...(inActiveTree && {
              color: t => `${t.colors.link.color}`,
              fontWeight: t => `${t.fontWeights.semiBold}`
            }),
            ...overrideCSS,
          },
          "&:before, &:after": {
            content: `''`,
            left: t => (
              level === 0 || level === 1 ? `calc(${indent}-${t.space[4]})` : `calc(${indent} - ${t.space[6]})`
            ),
            top: `16px`,
            height: `8px`,
            position: `absolute`,
            transition: t => `all ${t.transition.speed.default} ${t.transition.curve.default}`,
            width: `8px`,
          },
          "&:before": {
            bgColor: isActive && (t => `${t.colors.link.color}`),
            borderRadius: `50%`,
            transform: isActive ? `scale(1)` : `scale(0.1)`,
          },
          "&:after": {
            bgColor: t => `${t.colors.link.color}`,
            borderRadius: `50%`,
            opacity: isActive ? 1 : 0,
            width: isActive ? `40px` : 0,
          }
        }}
        onClick={onLinkClick}
        to={item.link}
      >
        { item.title }
      </Link>
    </span>
  )
}

export default ItemLink