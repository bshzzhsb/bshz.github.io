/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import ItemLink from "./item-link"
import Accordion from "./accordion"
import { useSidebarContext } from "./sidebar"

const Item = ({ item }) => {
  const { getItemState } = useSidebarContext();
  const { isActive } = getItemState(item);
  const itemRef = React.useRef(null);

  React.useEffect(() => {
    if (isActive) { //  && !item.link.includes('#')
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [isActive, item])

  if (item.items) {
    return <Accordion itemRef={itemRef} item={item} />
  } else {
    return (
      <li
        ref={itemRef}
        sx={{
          position: `relative`,
          transition: t => `all ${t.transition.speed.fast} ${t.transition.curve.default}`,
          ...(item.level === 0 && {
            "&::before": {
              content: `''`,
              position: `absolute`,
              borderTopWidth: `1px`,
              borderTopStyle: `solid`,
              borderColor: t => `${t.colors.ui.border.subtle}`,
              left: isActive ? 0 : 6,
              right: 0,
              top: 0,
            },
          })
        }}
      >
        <ItemLink item={item} />
      </li>
    )
  }
}

export default Item