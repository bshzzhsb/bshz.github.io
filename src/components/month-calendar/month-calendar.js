/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Link from "../link"

function getDayOfMonth(year, month, day = 0) {
  return new Date(year, day === 0 ? month + 1 : month, day).getDate();
}

const getMonthDates = (year, month, preOffset, arr) => {
  let index = 0;
  for (let i = preOffset - 1; i >= 0; i--) {
    let dateStrs = new Date(year - 1, month - 1 < 0 ? 11 : month - 1, 31 - i).toDateString().split(" ");
    dateStrs.shift();
    if (!arr[index]) {
      arr[index] = {};
    }
    arr[index].offset = 20;
    arr[index++].date = dateStrs.join(" ");
  }
  for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    let dateStrs = new Date(year, month, day).toDateString().split(" ");
    dateStrs.shift();
    if (!arr[index]) {
      arr[index] = {};
    }
    if (index / 7 < 2) {
      console.log(index, "left")
      arr[index].offset = 20 + (index / 7) * 10;
    } else if (Math.floor(index / 7) > Math.ceil(arr.length / 7) - 3) {
      arr[index].offset = 85 - (Math.floor(arr.length / 7) - Math.floor(index / 7)) * 10;
      console.log(index, "right", arr[index].offset, Math.ceil(arr.length / 7), Math.floor(index / 7))
    } else {
      arr[index].offset = 50;
    }
    arr[index++].date = dateStrs.join(" ");
  }
}

function Calendar({ blogs, commits, year = new Date().getFullYear(), month = new Date().getMonth() }) {
  let monthDays = getDayOfMonth(year, month);
  let preOffset = new Date(year, month, 1).getDay();
  let arr = Array.from({length: preOffset + monthDays});
  for (let blog of blogs) {
    let date = blog.date;
    if (date[0] === year && date[1] === month + 1) {
      let index = getDayOfMonth(date[0], date[1], date[2]) + preOffset;
      if (!arr[index - 1]) {
        arr[index - 1] = {};
        arr[index - 1].blogs = [blog];
      } else {
        arr[index - 1].blogs.push(blog);
      }
    }
  }

  let week = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  for (let commit of commits) {
    let date = commit.date;
    if (date[0] === year && date[1] === month + 1) {
      let index = getDayOfMonth(date[0], date[1], date[2]) + preOffset;
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
  getMonthDates(year, month, preOffset, arr);

  const today = new Date();
  const todayOfMonth = preOffset + getDayOfMonth(today.getFullYear(), today.getMonth(), today.getDate());
  arr[todayOfMonth - 1].today = true;

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
              "&::before": index === 0 && {
                content: `'${new Date(year, month, 1).toDateString().split(" ")[1]}'`,
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
