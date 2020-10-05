/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Item from "./item"
import Link from "../link"
import getActiveItemParents from "../../utils/sidebar/get-active-item-parents"
import getActiveItem from "../../utils/sidebar/get-active-item"

function isItemInActiveTree(item, activeItem, activeItemParents) {
  return [activeItem, ...activeItemParents].some(itemTree => itemTree.title === item.title)
}

function getOpenItemHash(itemList, activeItem, activeItemParents) {
  console.log(itemList);
  let result = {};
  for (let item of itemList) {
    if (item.items) {
      result[item.title] = isItemInActiveTree(item, activeItem, activeItemParents);
      result = {
        ...result,
        ...getOpenItemHash(item.items, activeItem, activeItemParents),
      }
    }
  }
  return result;
}

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
  console.log(activeItem);

  const activeItemParents = React.useMemo(
    () => getActiveItemParents(itemList, activeItem),
    [itemList, activeItem]
  )

  const initialHash = getOpenItemHash(itemList, activeItem, activeItemParents);
  console.log(initialHash);
  const [openSectionHash, setOpenSectionHash] = React.useState(initialHash);

  const toggleSection = React.useCallback(item => {
    setOpenSectionHash(openSectionHash => {
      return {
        ...openSectionHash,
        [item.title]: !openSectionHash[item.title],
      }
    })
  }, [])

  const getItemState = React.useCallback(
    item => {
      return {
        isExpanded: openSectionHash[item.title],
        isActive: item.title === activeItem.title,
        inActiveTree: isItemInActiveTree(item, activeItem, activeItemParents),
      }
    },
    [openSectionHash, activeItem, activeItemParents]
  )

  const context = React.useMemo(() => {
    return {
      getItemState,
      onSectionTitleClick: toggleSection,
    };
  }, [getItemState, toggleSection])

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
              px: `1.5rem`,
              color: t => `${t.colors.grey[50]}`,
              fontSize: `14px`,
              pt: `1rem`,
              margin: 0,
              fontWeight: t => `${t.fontWeights.body}`,
              textTransform: `uppercase`,
              letterSpacing: `tracked`,
            }}
          >
            INDEX
          </h3>
          <ul
            sx={{
              fontWeight: t => `${t.fontWeights.body}`,
              "& li": {
                listStyle: `none`,
              },
            }}
          >
            {itemList.map(item => (
              <Item item={item} key={item.title} />
            ))}
          </ul>
        </nav>
      </section>
    </SidebarContext.Provider>
  )
}

export default Sidebar