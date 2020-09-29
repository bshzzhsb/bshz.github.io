import React from "react"

import ItemLink from "./item-link"
import Accordion from "./accordion"

const Item = ({ item, isSteps }) => {
  if (item.items) {
    return <Accordion item={item} />
  } else {
    return (
      <li>
        <ItemLink item={item} />
      </li>
    )
  }
}

export default Item