/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

function getDayOfYear(year, month = 12, day = 0) {
  let days = 0;
  for (let i = 1; i <= month; i++) {
    days += new Date(year, i, i === month ? day : 0).getDate();
  }
  return days;
}

const getYearDates = (year, preOffset, arr) => {
  let index = 0;
  for (let i = preOffset - 1; i >= 0; i--) {
    let dateStrs = new Date(year - 1, 11, 31 - i).toDateString().split(" ");
    dateStrs.shift();
    if (!arr[index]) {
      arr[index] = {};
    }
    arr[index++].date = dateStrs.join(" ");
  }
  for (let i = 0; i < 12; i++) {
    for (let day = 1; day <= new Date(year, i + 1, 0).getDate(); day++) {
      let dateStrs = new Date(year, i, day).toDateString().split(" ");
      dateStrs.shift();
      if (!arr[index]) {
        arr[index] = {};
      }
      arr[index++].date = dateStrs.join(" ");
    }
  }
}

function Calendar({ blogs, commits, cb, year = new Date().getFullYear() }) {
  const dates = React.useRef();
  React.useEffect(() => {
    const datesEl = dates.current;
    const showTooltip = (e) => {
      if (e.target.tagName === 'DIV' && e.target.dataset !== undefined) {
        const { top, left, width, height } = e.target.getBoundingClientRect();
        console.log(e.target.dataset.index)
      }
    }
    datesEl.addEventListener("mouseover", showTooltip)

    return (() => {
      datesEl.removeEventListener("mouseover", showTooltip)
    })
  }, [])

  let yearDays = getDayOfYear(year);
  let preOffset = new Date(year, 0, 1).getDay();
  let arr = Array.from({length: preOffset + yearDays});
  for (let blog of blogs) {
    let date = blog.date;
    if (date[0] === year) {
      let index = getDayOfYear(date[0], date[1], date[2]) + preOffset;
      if (!arr[index - 1]) {
        arr[index - 1] = {};
        arr[index - 1].blogs = [blog];
      } else {
        arr[index - 1].blogs.push(blog);
      }
    }
  }

  let firstDaysOfMonth = Array.from({length: 12}).map((_, i) => getDayOfYear(year, i, 0) + preOffset);

  let week = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  for (let commit of commits) {
    let date = commit.date;
    if (date[0] === year) {
      let index = getDayOfYear(date[0], date[1], date[2]) + preOffset;
      if (!arr[index - 1]) {
        arr[index - 1] = {};
        arr[index - 1].commits = [commit];
      } else if (!arr[index - 1].commits) {
        arr[index - 1].commits = [commit];
      } else {
        arr[index - 1].commits.push(commit);
      }
    }
  }
  getYearDates(year, preOffset, arr);

  return (
    <ul
      ref={dates}
      sx={{
        listStyle: `none`,
        display: `flex`,
        // justifyContent: `flex-end`,
        flexDirection: `column`,
        height: t => `calc(${t.space[4]} * 7)`,
        flexWrap: `wrap`,
        overflow: `scroll`,
        m: 0,
        pt: t => t.space[4],
        scrollbarWidth: `none`,
        boxSizing: `content-box`,
      }}
    >
      {week.map((item, index) => (
        <li
          key={index}
          sx={{
            width: t => t.space[6],
            height: t => item ? t.space[4] : t.space[3],
            fontSize: t => t.fontSizes[0],
            m: item ? `0` : `2px`,
          }}
        >
          {item}
        </li>
      ))}
      {arr.map((item, index) => (
        <li
          key={index}
          sx={{
            position: `relative`,
            "&::before": Math.floor(index / 7) === Math.floor(firstDaysOfMonth[0] / 7) && firstDaysOfMonth.shift() && {
              content: `'${new Date(year, 11 - firstDaysOfMonth.length, 1).toDateString().split(" ")[1]}'`,
              position: `absolute`,
              top: t => `-${t.space[5]}`,
              left: t => `calc(${t.space[1]} / 2)`,
              fontSize: t => t.fontSizes[0],
            },
          }}
        >
          <div
            data-index={index}
            sx={{
              backgroundColor: t => arr[index].blogs || arr[index].commits
                ? arr[index].blogs
                  ? arr[index].commits
                    ? t.colors.green[60]
                    : t.colors.green[20]
                  : arr[index].commits.length > 5
                    ? t.colors.blue[60]
                    : arr[index].commits.length > 2
                      ? t.colors.blue[40]
                      : t.colors.blue[20]
                : t.colors.grey[10],
              width: t => t.space[3],
              height: t => t.space[3],
              m: t => `calc(${t.space[1]} / 2)`,
              boxSizing: `border-box`,
              border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
              borderRadius: `1px`,
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export default Calendar
