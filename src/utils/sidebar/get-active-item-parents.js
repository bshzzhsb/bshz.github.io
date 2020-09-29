//
const getParent = (sections, parentTitle) => {
  for (let section of sections) {
    if (section.title === parentTitle) {
      return section
    }
    if (section.items) {
      const activeParentItem = getParent(section.items, parentTitle)
      if (activeParentItem) {
        return activeParentItem
      }
    }
  }
}

const getActiveItemParents = (itemList, activeItem, activeItemParents = []) => {
  if (activeItem.parentTitle) {
    const bar = getParent(itemList, activeItem.parentTitle)
    activeItemParents.push(bar)
    return getActiveItemParents(itemList, bar, activeItemParents)
  } else {
    return activeItemParents;
  }
}

export default getActiveItemParents