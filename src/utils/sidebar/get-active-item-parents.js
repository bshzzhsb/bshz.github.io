const isParentActive = (sections, parentTitle) => {
  for (let section of sections) {
    if (section.title === parentTitle) {
      return section;
    }
    if (section.items) {
      for (let item of section.items) {
        const activeSubItem = isParentActive([item], parentTitle);
        if (activeSubItem) {
          return activeSubItem;
        }
      }
    }
  }
}