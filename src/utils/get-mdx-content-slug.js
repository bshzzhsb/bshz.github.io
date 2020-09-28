const path = require('path')

const docSlugFromPath = parsedFilePath => {
  if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    return `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    return `/${parsedFilePath.name}/`;
  } else {
    // index.js
    return `/${parsedFilePath.dir}/`;
  }
}

function getMdxContentSlug(node, parent) {
  if (!['Mdx'].includes(node.internal.type) || parent.internal.type !== 'File') {
    return null;
  }
  const parsedFilePath = path.parse(parent.relativePath);
  return docSlugFromPath(parsedFilePath);
}

module.exports = { getMdxContentSlug }