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
      <li ref={itemRef}>
        <ItemLink item={item} />
      </li>
    )
  }
}

export default Item