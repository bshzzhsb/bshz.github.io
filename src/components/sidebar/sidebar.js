/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import getActiveItem from "../../utils/sidebar/get-active-item"
import getActiveItemParents from "../../utils/sidebar/get-active-item-parents"
import Item from "./item"

function isItemInActiveTree(item, activeItem, activeItemParents) {
  return (
    activeItem.title === item.title ||
    activeItemParents.some(parent => parent.title === item.title)
  )
}

function getOpenItemHash(itemList, activeItem, activeItemParents) {
  let result = {}
  for (let item of itemList) {
    if (item.items) {
      result[item.title] = isItemInActiveTree(
        item,
        activeItem,
        activeItemParents
      )
      result = {
        ...result,
        ...getOpenItemHash(item.items, activeItem, activeItemParents),
      }
    }
  }
  return result
}

const SidebarContext = React.createContext({})

export function useSidebarContext() {
  return React.useContext(SidebarContext)
}

export default function Sidebar({
  title,
  location,
  itemList,
  activeItemHash,
  disableAccordions,
  closeSidebar,
}) {
  const scrollRef = React.useRef(null)

  const activeItem = React.useMemo(
    () => getActiveItem(itemList, location, activeItemHash),
    [itemList, location, activeItemHash]
  )

  const activeItemParents = React.useMemo(
    () => getActiveItemParents(itemList, activeItem),
    [itemList, activeItem]
  )

  const initialHash = getOpenItemHash(itemList, activeItem, activeItemParents)

  const [openSectionHash, setOpenSectionHash] = React.useState(initialHash)

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
        isExpanded: openSectionHash[item.title] || disableAccordions,
        isActive: item.title === activeItem.title,
        inActiveTree: isItemInActiveTree(item, activeItem, activeItemParents),
      }
    },
    [openSectionHash, disableAccordions, activeItem, activeItemParents]
  )

  const context = React.useMemo(() => {
    return {
      getItemState,
      disableAccordions,
      onLinkClick: closeSidebar,
      onSectionTitleClick: toggleSection,
    }
  }, [getItemState, disableAccordions, closeSidebar, toggleSection])

  return (
    <SidebarContext.Provider value={context}>
      <section
        aria-label="Secondary Navigation"
        id="SecondaryNavigation"
        className="docSearch-sidebar"
        sx={{ height: `100%` }}
      >
        <nav
          ref={scrollRef}
          sx={{
            WebkitOverflowScrolling: `touch`,
            bg: `background`,
            border: 0,
            display: `block`,
            overflowY: `auto`,
            transition: t =>
              `opacity ${t.transition.speed.default} ${t.transition.curve.default}`,
            zIndex: 10,
            borderRightWidth: `1px`,
            borderRightStyle: `solid`,
            borderColor: `ui.border`,
            height: `100%`,
          }}
        >
          <h3
            sx={{
              color: `textMuted`,
              px: 6,
              fontSize: 1,
              pt: 6,
              margin: 0,
              fontWeight: `body`,
              textTransform: `uppercase`,
              letterSpacing: `tracked`,
            }}
          >
            {title}
          </h3>
          <ul
            sx={{
              m: 0,
              py: 4,
              fontSize: 1,
              bg: `background`,
              "& li": {
                m: 0,
                listStyle: `none`,
              },
              "& > li:last-child > span:before": {
                display: `none`,
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