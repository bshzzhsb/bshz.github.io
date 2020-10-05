/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react";

function debounce(f1, cb) {
  let tim = null
  return function() {
    f1();
    clearTimeout(tim);
    tim = setTimeout(function() {
      cb.apply(this, arguments);
    }, 500);
  }
}

export function Debounce() {
  const input = React.useRef()
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    const inpEl = input.current;
    const debounceFun = debounce(() => setIsTyping(true),() => setIsTyping(false));
    inpEl.addEventListener('input', debounceFun);
    return (() => {
      inpEl.removeEventListener('input', debounceFun);
    })
  }, [])

  return (
    <React.Fragment>
      <div sx={{ paddingBottom: `20px` }}>
        <span>Debounce:&nbsp;</span>
        <input type="text" ref={input} />
        <span sx={{
          display: `inline-block`,
          transform: isTyping ? `translateY(0)` : `translateY(-100%)`,
          opacity: isTyping ? `1` : `0`,
          transition: `transform 400ms ease-in-out, opacity 400ms ease-in-out`,
        }}>debounce</span>
      </div>
    </React.Fragment>
  )
}

function throttle(f1, cb) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    f1();
    canRun = false;
    setTimeout(function() {
      cb.apply(this, arguments);
      canRun = true;
    }, 500);
  }
}

export function Throttle() {
  const input = React.useRef();
  const [isTyping, setIsTyping] = React.useState(false);
  React.useEffect(() => {
    const inpEl = input.current;
    const throttleFun = throttle(() => setIsTyping(true), () => setIsTyping(false))
    inpEl.addEventListener('input', throttleFun);
    return (() => {
      inpEl.removeEventListener('input', throttleFun);
    })
  }, [])

  return (
    <React.Fragment>
      <div sx={{ paddingBottom: `20px` }}>
        <span>Throttle:&nbsp;</span>
        <input type="text" ref={input} />
        <span sx={{
          display: `inline-block`,
          transform: isTyping ? `translateY(0)` : `translateY(-100%)`,
          opacity: isTyping ? `1` : `0`,
          transition: `transform 100ms ease-in-out, opacity 100ms ease-in-out`,
        }}>throttle</span>
      </div>
    </React.Fragment>
  )
}