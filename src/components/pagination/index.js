/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import PaginationItem from "./pagination-item"

function generatePage(numPages, currentPage) {
  let pageArr = [];
  for (let i=currentPage; i > 1 && i > currentPage - 3; i--) {
    pageArr.unshift(i);
  }
  for (let i=currentPage+1; i < numPages && i < currentPage + 3; i++) {
    pageArr.push(i);
  }
  if (pageArr[0] > 2) {
    pageArr.unshift("...");
  }
  pageArr.unshift(1);
  if (pageArr[pageArr.length - 1] < numPages - 1) {
    pageArr.push("...");
  }
  pageArr.push(numPages);
  return pageArr;
}

function Paginaton({ context }) {
  // const { numPages, currentPage } = context;
  const currentPage  = 2
  const numPages = 5
  let pageArr = generatePage(numPages, currentPage);

  return (
    <div
      sx={{
        display: `flex`,
        justifyContent: `center`
      }}
    >
      <div
        sx={{
          border: t => `${t.borders[1]} ${t.colors.ui.border.subtle}`,
          borderRadius: t => t.space[1],
          overflow: `hidden`
        }}
      >
        {
          currentPage > 1 &&
          <PaginationItem
            to={currentPage === 2 ? `/blog/` : `/blog/page/${currentPage - 1}/`}
            pageNum="left"
          />
        }
        {pageArr.map((item, i) =>
          item === "..." ?
            <PaginationItem
              pageNum={item}
            /> :
            <PaginationItem
              to={`/blog/page/${item}/`}
              pageNum={item}
              active={currentPage === item}
            />
        )}
        {
          currentPage < numPages &&
          <PaginationItem
            to={`/blog/page/${currentPage + 1}/`}
            pageNum="right"
          />
        }
      </div>
    </div>
  )
}

export default Paginaton