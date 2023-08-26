const throttle = (fn, interval) => {
  let last = 0

  return function() {
    let context = this
    let args = arguments
    let now = +new Date()

    if (now - last > interval) {
      last = now
      fn.apply(context, args)
    }
  }
}
const scrollCallback = () => {
  console.log('触发滚动事件');
}

const throttleScroll = throttle(scrollCallback, 1000)

const debounce = (fn, delay) => {
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

const betterDebounce = (fn, delay) => {
  let timer = null
  let last = 0

  return function () {
    let now = +new Date()

    if (now - last < delay) {
      timer && clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        fn.apply(this, arguments)
      }, delay)
    } else {
      last = now
      fn.apply(this, arguments)
    }
  }
}

const debounceScroll = betterDebounce(scrollCallback, 1000)

document.addEventListener('scroll', debounceScroll)
