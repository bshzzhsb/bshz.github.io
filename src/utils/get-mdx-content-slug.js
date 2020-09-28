const path = require(`path`)

const docSlugFromPath = parsedFilePath => {
  if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
    return `/${parsedFilePath.dir}/${parsedFilePath.name}/`
  } else if (parsedFilePath.dir === ``) {
    return `/${parsedFilePath.name}/`
  } else {
    return `/${parsedFilePath.dir}/`
  }
}

/**
 * Return the slug of the given MDX content node, otherwise return `undefined`.
 * @param {*} node the node to check
 * @param {*} parent the parent of the node, called using `getNode(node.parent)`
 */
function getMdxContentSlug(node, parent) {
  // Only work on markdown nodes 
  if (![`Mdx`].includes(node.internal.type)) {
    return null
  }
  // Make sure the parent is a file node
  if (parent.internal.type !== `File`) {
    return null
  }

  const parsedFilePath = path.parse(parent.relativePath)
  return docSlugFromPath(parsedFilePath)
}

module.exports = { getMdxContentSlug }
