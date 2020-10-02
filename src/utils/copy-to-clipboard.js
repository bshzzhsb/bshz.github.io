const copyToClipBoard = str => {
  const clipboard = window.navigator.clipboard;
  return clipboard.writeText(str);
}

export default copyToClipBoard