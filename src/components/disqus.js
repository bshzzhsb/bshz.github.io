/** @jsx jsx */
import { jsx } from "theme-ui"
import { Disqus as DisqusComments } from "gatsby-plugin-disqus"

const Disqus = ({ disqusConfig }) => (
  <div
    sx={{
      position: `relative`,
      boxShadow: t => `${t.shadows.floating}, inset 0 0 0 1px ${t.colors.ui.border.subtle}`,
      borderRadius: t => t.radii[2],
      mt: t => t.space[4],
      p: t => t.space[6],
      "&:after": {
        background: t =>
          `${t.colors.white}
          repeating-linear-gradient(
            135deg,
            ${t.colors.red[50]},
            ${t.colors.red[50]} 20px,
            transparent 20px,
            transparent 40px,
            ${t.colors.blue[50]} 40px,
            ${t.colors.blue[50]} 60px,
            transparent 60px,
            transparent 80px
          )`,
        position: `absolute`,
        left: 0,
        right: 0,
        bottom: 0,
        content: `''`,
        height: t => t.space[1],
        borderRadius: t => `0 0 ${t.radii[2]} ${t.radii[2]}`,
      },
    }}
  >
    <DisqusComments config={disqusConfig} />
  </div>
)

export default Disqus