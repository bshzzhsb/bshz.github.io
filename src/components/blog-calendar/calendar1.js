/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Link from "../link"

function getYearDaysCount(year, month = 12, day = 0) {
  let days = 0;
  for (let i = 1; i <= month; i++) {
    days += new Date(year, i, i === month ? day : 0).getDate();
  }
  return days;
}

const getYearDates = (year, preOffset) => {
  let yearDates = [];
  for (let i = preOffset - 1; i >= 0; i--) {
    let dateStrs = new Date(year - 1, 11, 31 - i).toDateString().split(" ");
    dateStrs.shift();
    yearDates.push(dateStrs.join(" "));
  }
  for (let i = 0; i < 12; i++) {
    for (let day = 1; day <= new Date(year, i + 1, 0).getDate(); day++) {
      let dateStrs = new Date(year, i, day).toDateString().split(" ");
      dateStrs.shift();
      yearDates.push(dateStrs.join(" "));
    }
  }
  return yearDates;
}

function Calendar1({ blogs, commits, year = new Date().getFullYear() }) {
  let yearDays = getYearDaysCount(year);
  let preOffset = new Date(year, 0, 1).getDay();
  let cols = new Array(Math.ceil((yearDays + preOffset) / 7)).fill('');
  let arr = Array.from({length: preOffset + yearDays});
  for (let blog of blogs) {
    let date = blog.date;
    if (date[0] === year) {
      let index = getYearDaysCount(date[0], date[1], date[2]) + preOffset;
      if (!arr[index - 1]) {
        arr[index - 1] = {};
        arr[index - 1].blogs = [blog];
      } else {
        arr[index - 1].blogs.push(blog);
      }
    }
  }
  let yearDates = getYearDates(year, preOffset);
  let day = 0;

  let firstDaysOfMonth = Array.from({length: 12}).map((_, i) => getYearDaysCount(year, i, 0) + preOffset);

  let week = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  for (let commit of commits) {
    let date = commit.date;
    if (date[0] === year) {
      let index = getYearDaysCount(date[0], date[1], date[2]) + preOffset;
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

  console.log(arr)

  return (
    <ul
      sx={{
        listStyle: `none`,
        display: `flex`,
        justifyContent: `flex-end`,
        m: 0,
        pt: t => t.space[4],
        scrollbarWidth: `none`,
        zIndex: -1,
      }}
    >
      <li>
        <ul
          sx={{
            listStyle: `none`,
            display: `flex`,
            flexDirection: `column`,
          }}
        >
          {week.map((item, i) => (
            <li
              key={i}
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
        </ul>
      </li>
      {Array.from({length: cols.length}).map((_, col) => (
        <li key={col}>
          <ul
            sx={{
              listStyle: `none`,
              display: `flex`,
              flexDirection: `column`,
              position: `relative`,
            }}
          >
            {Math.floor(firstDaysOfMonth[0] / 7) === col && firstDaysOfMonth.shift() && (
              <li
                sx={{
                  position: `absolute`,
                  top: t => `-${t.space[5]}`,
                  left: `2px`,
                  fontSize: t => t.fontSizes[0],
                }}
              >
                {new Date(year, 11 - firstDaysOfMonth.length, 1).toDateString().split(" ")[1]}
              </li>
            )}
            {Array.from({length: col < cols.length - 1 ? 7 : arr.length % 7}).map((_, index) => (
              <li
                key={index}
                sx={{
                  position: `relative`,
                }}
              >
                <div
                  sx={{
                    backgroundColor: t => arr[col * 7 + index]
                      ? arr[col * 7 + index].blogs
                        ? arr[col * 7 + index].commits
                          ? t.colors.green[60]
                          : t.colors.green[20]
                        : arr[col * 7 + index].commits.length > 5
                          ? t.colors.blue[60]
                          : arr[col * 7 + index].commits.length > 2
                            ? t.colors.blue[40]
                            : t.colors.blue[20]
                      : t.colors.grey[10],
                    width: t => t.space[3],
                    height: t => t.space[3],
                    m: `2px`,
                    boxSizing: `border-box`,
                    border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
                    borderRadius: `1px`,
                    "&:hover + div": {
                      display: `inline-block`,
                    },
                  }}
                />
                <div
                  sx={{
                    position: `absolute`,
                    display: `none`,
                    zIndex: 100,
                    top: t => `-${t.space[8]}`,
                    left: `8px`,
                    whiteSpace: `nowrap`,
                    transform: `translateX(-50%)`,
                    color: t => t.colors.white,
                    background: t => t.colors.blackFade[80],
                    borderRadius: `5px`,
                    px: t => t.space[3],
                    py: t => t.space[2],
                    fontSize: t => t.fontSizes[0],
                    "&:hover": {
                      display: `inline-block`,
                    },
                    "&::after": {
                      content: `''`,
                      borderColor: t => `${t.colors.blackFade[80]} transparent transparent transparent`,
                      borderWidth: `4px`,
                      borderStyle: `solid`,
                      position: `absolute`,
                      left: `calc(50% - 4px)`,
                      bottom: `-8px`,
                    },
                  }}
                >
                  {arr[day] && arr[day].blogs && arr[day].blogs.map((dayBlog, i) => (
                    <React.Fragment key={dayBlog.slug}>
                      <Link
                        to={dayBlog.slug}
                        sx={{
                          color: t => t.colors.white,
                          "&:nth-last-child(2)": {
                            mr: t => t.space[2],
                          },
                        }}
                      >
                        {dayBlog.title}
                      </Link>
                      {i < arr[day].blogs.length - 1 && '、'}
                    </React.Fragment>
                  ))}
                  {arr[day] && arr[day].commits && (
                    <span sx={{mr: t => t.space[2]}}>
                      {`${arr[day].commits.length} commit${arr[day].commits.length > 1 ? 's' : ''}`}
                    </span>
                  )}
                  <span
                    sx={{
                      color: t => t.colors.whiteFade[60],
                    }}
                  >
                    {yearDates[day++]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Calendar1
