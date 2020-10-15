/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Link from "../link"

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
    arr[index].offset = 20;
    arr[index++].date = dateStrs.join(" ");
  }
  for (let i = 0; i < 12; i++) {
    for (let day = 1; day <= new Date(year, i + 1, 0).getDate(); day++) {
      let dateStrs = new Date(year, i, day).toDateString().split(" ");
      dateStrs.shift();
      if (!arr[index]) {
        arr[index] = {};
      }
      if (index / 7 < 3) {
        arr[index].offset = 20 + (index / 7) * 10;
      } else if (Math.floor(index / 7) > Math.floor(arr.length / 7) - 4) {
        arr[index].offset = 85 - (Math.floor(arr.length / 7) - Math.floor(index / 7)) * 10;
      } else {
        arr[index].offset = 50;
      }
      arr[index++].date = dateStrs.join(" ");
    }
  }
}

function Calendar({ blogs, commits, year = new Date().getFullYear() }) {
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

  const today = new Date();
  console.log(today)
  const todayOfYear = preOffset + getDayOfYear(today.getFullYear(), today.getMonth() + 1, today.getDate());
  arr[todayOfYear - 1].today = true;

  return (
    <React.Fragment>
      <ul
        sx={{
          listStyle: `none`,
          display: `flex`,
          flexDirection: `column`,
          height: t => `calc(${t.space[4]} * 7)`,
          flexWrap: `wrap`,
          overflow: `scroll`,
          m: 0,
          pt: t => t.space[8],
          pb: t => t.space[2],
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
              pr: t => Math.floor(index / 7) === Math.floor(arr.length / 7) ? t.space[1] : t.space[0],
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
                backgroundColor: t =>
                  arr[index].today
                  ? t.colors.purple[60]
                  : arr[index].blogs || arr[index].commits
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
                "&:hover + div": {
                  display: `block`,
                }
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
                transform: `translateX(-${arr[index].offset}%)`,
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
                  left: `calc(${arr[index].offset}% - 4px)`,
                  bottom: `-8px`,
                },
              }}
            >
              {arr[index] && arr[index].blogs && arr[index].blogs.map((dayBlog, i) => (
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
                  {i < arr[index].blogs.length - 1 && '、'}
                </React.Fragment>
              ))}
              {arr[index] && arr[index].commits && (
                <span sx={{mr: t => t.space[2]}}>
                      {`${arr[index].commits.length} commit${arr[index].commits.length > 1 ? 's' : ''}`}
                    </span>
              )}
              <span
                sx={{
                  color: t => t.colors.whiteFade[60],
                }}
              >
                {arr[index].date}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div
        sx={{
          fontSize: t => t.fontSizes[0],
          display: `flex`,
          alignItems: `center`,
          justifyContent: `flex-end`,
          pb: t => t.space[2],
        }}
      >
        <span
          sx={{
            backgroundColor: t => t.colors.green[20],
            width: t => t.space[3],
            height: t => t.space[3],
            mr: t => t.space[1],
            boxSizing: `border-box`,
            border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
            borderRadius: `1px`,
            display: `inline-block`,
          }}
        />
        blog &nbsp;&nbsp;
        <span
          sx={{
            backgroundColor: t => t.colors.blue[20],
            width: t => t.space[3],
            height: t => t.space[3],
            mr: t => t.space[1],
            boxSizing: `border-box`,
            border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
            borderRadius: `1px`,
            display: `inline-block`,
          }}
        />
          commit
      </div>
    </React.Fragment>
  )
}

export default Calendar
