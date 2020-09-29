/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Item from "./item"
import getActiveItemParents from "../../utils/sidebar/get-active-item-parents"
import getActiveItem from "../../utils/sidebar/get-active-item"

const SidebarContext = React.createContext({})
export function useSidebarContext() {
  return React.useContext(SidebarContext)
}

function Sidebar({ mdxTitle, location, itemList }) {
  const scrollRef = React.useRef(null)

  const activeItem = React.useMemo(
    () => getActiveItem(itemList, location),
    [itemList, location]
  )

  const activeItemParents = React.useMemo(
    () => getActiveItemParents(itemList, activeItem),
    [itemList, activeItem]
  )

  console.log(activeItem, activeItemParents)

  const context = React.useMemo(() => {
    return {

    };
  }, [])

  return (
    <SidebarContext.Provider value={context}>
      <section>
        <nav
          ref={scrollRef}
          sx={{
            display: `block`,
          }}
        >
          <h3
            sx={{
              px: `6rem`,
            }}
          >
            { mdxTitle }
          </h3>
          <ul>
            {itemList.map(item => (
              <Item item={item} />
            ))}
          </ul>
        </nav>
      </section>
    </SidebarContext.Provider>
  )
}

export default Sidebar