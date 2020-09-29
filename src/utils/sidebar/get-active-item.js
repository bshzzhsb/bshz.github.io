const isItemActive = (location, item, activeItemHash) => {
  const basePath = decodeURI(location.pathname);
  if (item.link === basePath) {
    return item;
  }
  return false;
}

const getActiveItem = (itemList, location, activeItemHash) => {
  for (let item of itemList) {
    if (item.link) {
      if (isItemActive(location, item, activeItemHash)) {
        return item;
      }
    }
    if (item.items) {
      let activeItem = getActiveItem(item.items, location, activeItemHash);
      if (activeItem) {
        return activeItem
      }
    }
  }
  return false;
}

export default getActiveItem