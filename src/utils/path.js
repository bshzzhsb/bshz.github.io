/**
 * 将 windows 中的 '\' 转成 '/'
 * @param path
 * @return slashed path
 */
function slash(path) {
  return path.replace(/\\/g, `/`)
}

module.exports = {
  slash,
}