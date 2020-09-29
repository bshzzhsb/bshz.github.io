/** @jsx jsx */
import { jsx } from "theme-ui"

function Breadcrumb({siteTitle, mdxTitle}) {
  // const [isActive, setIsActive] = React.useState(false);

  return (
    <div sx={{
      mx: `1rem`,
    }}>
      {siteTitle}-{mdxTitle}
    </div>
  )
}

export default Breadcrumb