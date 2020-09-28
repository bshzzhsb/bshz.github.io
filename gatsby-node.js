const Promise = require(`bluebird`)

const blog = require(`./src/utils/node/blog.js`)
const sections = [blog]

exports.createPages = async helpers => {
  await Promise.all(sections.map(section => section.createPages(helpers)))
}

// Create slugs for files, set released status for blog posts.
exports.onCreateNode = helpers => {
  sections.forEach(section => section.onCreateNode(helpers))
}
