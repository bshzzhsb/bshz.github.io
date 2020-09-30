import React from "react"
import Layout from "../components/layout"

export default function Home({ location }) {
  console.log(location)
  return (
    <Layout location={location}>
      <div>Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!</div>
    </Layout>
  )
}
