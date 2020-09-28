const { slash } = require("./path")

function getTemplate(path) {
  return slash(require.resolve(`../templates/${path}.js`))
}

module.exports = {
  getTemplate,
}