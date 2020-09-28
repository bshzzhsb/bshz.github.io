/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"

function scrollFunc(url) {
  const id = url.substring(1)
  document.getElementById(id).scrollIntoView({
    block: "start",
    behavior: "smooth"
  })
}

const openToc = (e) => {
  if (e.keyCode === 84) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
}

export const ListItem = styled(({ className, active, level, item }) => {
  return (
    <li className={className}>
      {item.title && (
        <div role="button"
             sx={{
               cursor: `pointer`
             }}
             onClick={() => scrollFunc(item.url)}
             onKeyDown={openToc}
             tabIndex="0"
        >
          {item.title}
        </div>
      )}
      {item.items && (
        <ul>
          {item.items.map((subitem) => (
            <ListItem
              level={level + 1}
              key={subitem.title}
              item={subitem}
            />
          ))}
        </ul>
      )}
    </li>
  )
})`
  list-style: none;
  margin-bottom: 0;
  div {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.1rem 0 0.1rem ${props => (props.level || 0) * 0.8}rem;
    display: block;
    position: relative;
    &:hover {
      color: #1ed3c6 !important;
    }
    ${props =>
  props.active &&
  `
      color: #1ED3C6;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
  ul {
    margin: 0 !important;
  }
`