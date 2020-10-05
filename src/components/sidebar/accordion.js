/** @jsx jsx */
import { jsx } from "theme-ui"

import { useSidebarContext } from "./sidebar"
import Item from "./item"
import SectionTitle from "./section-title"

function Accordion({ itemRef, item }) {
  const { getItemState } = useSidebarContext()
  const { inActiveTree, isExpanded } = getItemState(item)
  const uid = `item_${item.title.replace(/[^-a-zA-Z0-9]/g, '_')}`

  return (
    <li
      sx={{
        position: `relative`,
        bg: item.level === 0 && inActiveTree && (t => `${t.colors.blue[5]}`),
        transition: t => `all ${t.transition.speed.fast} ${t.transition.curve.default}`,
        ...(item.level === 0 && {
          "&::before": {
            content: `''`,
            position: `absolute`,
            borderTopWidth: `1px`,
            borderTopStyle: `solid`,
            borderColor: t => `${t.colors.ui.border.subtle}`,
            left: isExpanded && inActiveTree ? 0 : 6,
            right: 0,
            top: 0,
          },
        })
      }}
    >
      <SectionTitle
        item={item}
        uid={uid}
      />
      {isExpanded && (
        <ul
          id={uid}
        >
          {item.items.map(subitem => (
            <Item
              item={subitem}
              key={subitem.title}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default Accordion