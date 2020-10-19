const formatDate = (date) => {
  if (typeof date !== "object") {
    date = new Date(date);
  }
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}

export default formatDate