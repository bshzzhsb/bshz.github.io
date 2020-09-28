const Promise = require('bluebird');

const blog = require('./src/utils/node/blog');
const sections = [blog];

exports.createPages = async helpers => {
  await Promise.all(sections.map(section => section.createPages(helpers)));
}

exports.onCreateNode = helpers => {
  sections.forEach(section => section.onCreateNode(helpers));
}