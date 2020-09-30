/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import indention from "../../utils/sidebar/indent"
import { useSidebarContext } from "./sidebar"

function ItemLink({ item, overrideCSS }) {
  const { onLinkClick, getItemState } = useSidebarContext()
  const { isActive, inActiveTree, isExpanded } = getItemState(item)
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
          fontSize: `14px`,
          color: isExpanded ? t => `${t.colors.blue[60]}` : t => `${t.colors.text}`,
          "&&": {
            border: 0,
            ...(inActiveTree && {
              color: t => `${t.colors.link.color}`,
              fontWeight: t => `${t.fontWeights.semiBold}`,
              background: t => `${console.log(t)}`,
            }),
            ...overrideCSS,
          },
          "&:hover": {
            bg: t => `${t.colors.blue[10]}`,
            "&:before": {
              transform: `scale(1)`,
              backgroundColor: t => `${t.colors.link.color}`,
            }
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
          },
          "&:before": {
            backgroundColor: isActive && (t => `${t.colors.link.color}`),
            borderRadius: `50%`,
            transform: isActive ? `scale(1)` : `scale(0)`,
            width: `8px`,
            left: `10px`,
          },
          "&:after": {
            backgroundColor: t => `${t.colors.link.color}`,
            borderTopRightRadius: `4px`,
            borderBottomRightRadius: `4px`,
            opacity: isActive ? 1 : 0,
            width: isActive ? `20px` : 0,
            left: `0px`,
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