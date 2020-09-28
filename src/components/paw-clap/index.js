/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import styles from "./index.module.scss"
import PawClapIcon from "../../assets/icons/paw-clap-icon"

function PawClap() {
  const [liked, setLiked] = React.useState(false)

  let confettiAmount = 60,
    confettiColors = [
      "#7d32f5",
      "#f6e434",
      "#63fdf1",
      "#e672da",
      "#295dfe",
      "#6e57ff",
    ],
    random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    createConfetti = to => {
      let elem = document.createElement("i")
      elem.style.setProperty("--x", random(-260, 260) + "px")
      elem.style.setProperty("--y", random(-160, 160) + "px")
      elem.style.setProperty("--r", random(0, 360) + "deg")
      elem.style.setProperty("--s", random(0.6, 1))
      elem.style.setProperty("--b", confettiColors[random(0, 5)])
      to.appendChild(elem)
    }

  function pawClick(elem) {
    if (!elem.classList.contains(styles.animation)) {
      setLiked(true)
      elem.classList.add(styles.animation)
      for (let i = 0; i < confettiAmount; i++) {
        createConfetti(elem)
      }
      setTimeout(() => {
        elem.classList.add(styles.confetti)
        setTimeout(() => {
          elem.classList.add(styles.liked)
        }, 400)
        setTimeout(() => {
          elem.querySelectorAll("i").forEach(i => i.remove())
        }, 600)
      }, 260)
    } else {
      setLiked(false)
      elem.classList.remove(styles.animation, styles.liked, styles.confetti)
    }
  }

  return (
    <div className={styles.pawButton} onClick={(e) => pawClick(e.currentTarget)}>
      <div className={styles.text}>
        <PawClapIcon name={`heart`} liked={liked} />
        <span>Like</span>
      </div>
      <div className={styles.paws}>
        <PawClapIcon name={`paw`} className={styles.paw} />
        <div className={styles.pawEffect}>
          <div></div>
        </div>
        <PawClapIcon name={`pawClap`} className={styles.pawClap} />
      </div>
    </div>
  )
}

export default PawClap
