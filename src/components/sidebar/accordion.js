/** @jsx jsx */
import { jsx } from "theme-ui"

import Item from "./item"

function Accordion({ itemRef, item }) {
  return (
    <li>
      { item.title }
      <ul>
        {item.items.map(subitem => (
          <Item
            item={subitem}
          />
        ))}
      </ul>
    </li>
  )
}

export default Accordion