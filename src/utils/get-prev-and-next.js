const { loadYaml } = require(`./load-yaml`)
const docLinksData = loadYaml(`src/data/links.yaml`)

const docLinks = docLinksData[0].items

// flatten sidebar links trees for easier next/prev link calculation
function flattenList(itemList) {
  return itemList.reduce((reducer, { items, ...rest }) => {
    reducer.push(rest)
    if (items) reducer.push(...flattenList(items))
    return reducer
  }, [])
}

const flattenedDocs = flattenList(docLinks)

// with flattened tree object finding next and prev is just getting the next index
function getSibling(index, list, direction) {
  if (direction === `next`) {
    const next = index === list.length - 1 ? null : list[index + 1]
    // for tutorial links that use subheadings on the same page skip the link and try the next item
    if (next && next.link && next.link.includes(`#`)) {
      return getSibling(index + 1, list, `next`)
    }
    return next
  } else if (direction === `prev`) {
    const prev = index === 0 ? null : list[index - 1]
    if (prev && prev.link && prev.link.includes(`#`)) {
      return getSibling(index - 1, list, `prev`)
    }
    return prev
  } else {
    return null
  }
}

function findDoc(doc) {
  if (!doc.link) return null
  return (
    doc.link === this.link ||
    doc.link === this.link.substring(0, this.link.length - 1)
  )
}

function getPrevAndNext(slug) {
  const docIndex = flattenedDocs.findIndex(findDoc, {
    link: slug,
  })

  // add values to page context for next and prev page
  let prevAndNext = {}
  if (docIndex > -1) {
    prevAndNext.prev = getSibling(docIndex, flattenedDocs, `prev`)
    prevAndNext.next = getSibling(docIndex, flattenedDocs, `next`)
  }
  return prevAndNext
}

module.exports = { getPrevAndNext }
