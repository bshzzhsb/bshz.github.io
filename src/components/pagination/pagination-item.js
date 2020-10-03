/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "../link"
import { FaAngleLeft, FaAngleRight } from "react-icons/all"

const PaginationItem = ({ to, active, pageNum }) => {
  return (
    <Link
      to={to}
      sx={{
        display: `inline-block`,
        textAlign: `center`,
        width: `2rem`,
        height: `2rem`,
        lineHeight: `2rem`,
        fontSize: t => t.fontSizes[1],
        color: t => active ? t.colors.white : t.colors.text,
        background: active ? t => `${t.colors.blackFade[80]}` : `transparent`,
        "& + a, & + span": {
          borderLeft: t => `${t.borders[1]} ${t.colors.blackFade[10]}`,
        },
        "&:hover": {
          bg: t => active ? `${t.colors.blackFade[80]}` : `${t.colors.blackFade[10]}`,
        },
        "& svg": {
          verticalAlign: `-0.1rem`,
        },
      }}
    >
      {
        pageNum === "left"
          ? <FaAngleLeft />
          : pageNum === "right" ? <FaAngleRight /> : pageNum
      }
    </Link>
  )
}

export default PaginationItem