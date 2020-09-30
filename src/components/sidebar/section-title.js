/** @jsx jsx */
import { jsx } from "theme-ui"

import ChevronSvg from "./chevron-svg"
import indention from "../../utils/sidebar/indent"
import ItemLink from "./item-link"
import { useSidebarContext } from "./sidebar"

const Chevron = ({ isExpanded }) => {
  return (
    <span
      sx={{
        display: `flex`,
        alignItems: `center`,
        flexShrink: 1,
        ml: `auto`,
        height: `100%`,
        width: `100%`,
        pt: `calc((40px-1.125rem) / 2)`,
        minHeight: `40px`,
        minWidth: `40px`,
      }}
    >
      <ChevronSvg
        cssProps={{
          color: `textMuted`,
          mx: `auto`,
          transform: isExpanded ? `rotate(180deg)` : `rotate(270deg)`,
          transition: t => `transform ${t.transition.speed.fast} ${t.transition.curve.default}`,
        }}
      />
    </span>
  )
}

const SectionHeading = ({ children, item }) => {
  const { getItemState } = useSidebarContext();
  const { isExpanded } = getItemState(item);
  const indent = indention(item.level + 1);
  return (
    <span
      sx={{
        display: `flex`,
        alignItems: `center`,
        letterSpacing: `0.3px`,
        margin: 0,
        p: `0.5rem 2.5rem 0.5rem ${indent}`,
        fontSize: `14px`,
        color: isExpanded ? t => `${t.colors.blue[60]}` : ``,
        "&:hover": {
          color: t => `${t.colors.blue[60]}`,
        }
      }}
    >
      {children}
    </span>
  )
}

const Title = ({ item, uid }) => {
  const { onSectionTitleClick, getItemState } = useSidebarContext();
  const { isExpanded } = getItemState(item);
  return (
    <div
      aria-expanded={isExpanded}
      aria-controls={uid}
      sx={{
        position: `relative`,
        textAlign: `left`,
        width: `100%`,
        border: 0,
        cursor: `pointer`,
        minHeight: `40px`,
        "&:hover": {
          bg: t => `${t.colors.blue[10]}`,
        },
      }}
      onClick={() => onSectionTitleClick(item)}
    >
      <SectionHeading item={item}>
        { item.title }
        <span
          sx={{
            position: `absolute`,
            top: 0,
            bottom: 0,
            right: 0,
            minHeight: `40px`,
            width: `40px`,
          }}
        >
          <Chevron isExpanded={isExpanded} />
        </span>
      </SectionHeading>
    </div>
  )
}

const SplitTitle = ({ itemRef, item, uid }) => {
  const { getItemState, onSectionTitleClick } = useSidebarContext();
  const { isExpanded } = getItemState(item);
  return (
    <span
      ref={itemRef}
      sx={{
        display: `flex`,
        position: `relative`,
        width: `100%`,
      }}
    >
      <span
        sx={{
          flexGrow: 1,
        }}
      >
        <ItemLink
          item={item}
        />
      </span>
      <div
        aria-controls={uid}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `${item.title} collapse` : `${item.title} expand`}
        sx={{
          position: `absolute`,
          ml: `auto`,
          minHeight: `40px`,
          top: 0,
          right: 0,
          bottom: 0,
          width: `40px`,
          zIndex: 1,
          "&:hover": {
            bg: t => `${t.colors.blue[10]}`,
            "&:before": {
              transform: `scale(1)`,
              backgroundColor: t => `${t.colors.link.color}`,
            },
          },
        }}
        onClick={() => onSectionTitleClick(item)}
      >
        <Chevron isExpanded={isExpanded} />
      </div>
    </span>
  )
}

function SectionTitle({ itemRef, item, uid }) {
  if (item.link) {
    return <SplitTitle item={item} uid={uid} itemRef={itemRef} />;
  }
  return <Title item={item} uid={uid} />
}

export default SectionTitle