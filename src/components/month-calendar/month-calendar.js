/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import Link from "../link"

function getDayOfMonth(year, month, day = 0) {
  return new Date(year, day === 0 ? month + 1 : month, day).getDate();
}

function Calendar({ blogs, commits, year = new Date().getFullYear(), month = new Date().getMonth() }) {
  let monthDays = getDayOfMonth(year, month);
  let preOffset = new Date(year, month, 1).getDay();
  let arr = Array.from({length: monthDays}).map(() => ({}));
  for (let blog of blogs) {
    let date = blog.date;
    if (date[0] === year && date[1] === month + 1) {
      let index = +date[2];
      if (!arr[index - 1].blogs) {
        arr[index - 1].blogs = [blog];
      } else {
        arr[index - 1].blogs.push(blog);
      }
    }
  }

  let week = ['', '一', '', '三', '', '五', ''];

  for (let commit of commits) {
    let date = commit.date;
    if (date[0] === year && date[1] === month + 1) {
      let index = +date[2];
      if (!arr[index - 1].commits) {
        arr[index - 1].commits = [commit];
      } else if (!arr[index - 1].commits) {
        arr[index - 1].commits = [commit];
      } else {
        arr[index - 1].commits.push(commit);
      }
    }
  }

  const today = new Date();
  const todayOfMonth = today.getDate();
  if (month === today.getMonth()) {
    arr[todayOfMonth - 1].today = true;
  }

  return (
    <React.Fragment>
      <ul
        sx={{
          listStyle: `none`,
          display: `flex`,
          flexDirection: `row`,
          width: t => `calc(${t.space[6]} * 7)`,
          flexWrap: `wrap`,
          m: 0,
          pt: t => t.space[4],
          pb: t => t.space[2],
          alignSelf: `center`,
          boxSizing: `content-box`,
        }}
      >
        {week.map((item, index) => (
          <li
            key={index}
            sx={{
              width: t => t.space[4],
              height: t => t.space[5],
              fontSize: t => t.fontSizes[0],
              mx: t => t.space[1],
              mb: t => t.space[1],
            }}
          >
            {item}
          </li>
        ))}
        {Array.from({length: preOffset}).map(() => (
          <li
            sx={{
              width: t => t.space[4],
              height: t => t.space[4],
              m: t => t.space[1],
            }}
          />
        ))}
        {arr.map((item, index) => (
          <li
            key={index}
            sx={{
              position: `relative`,
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
                width: t => t.space[4],
                height: t => t.space[4],
                m: t => t.space[1],
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
                left: t => t.space[3],
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
              <span sx={{color: t => t.colors.whiteFade[60]}}>
                {index + 1}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div
        sx={{
          fontSize: t => t.fontSizes[1],
          display: `flex`,
          alignItems: `center`,
          justifyContent: `flex-end`,
          pb: t => t.space[2],
        }}
      >
        <span
          sx={{
            backgroundColor: t => t.colors.green[20],
            width: t => t.space[4],
            height: t => t.space[4],
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
            width: t => t.space[4],
            height: t => t.space[4],
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
