const throttle = (fn, wait) => {
  let last = 0
  let timer = null

  return function() {
    let self = this
    let args = arguments
    let now = +new Date()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    const remainWaitTime = wait - (now - last)

    if (remainWaitTime <= 0) {
      last = now
      fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        last = +new Date()
        fn.apply(self, args)
        timer = null
      }, remainWaitTime)
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
    let self = this
    let args = arguments

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
      timer = null
    }, delay)
  }
}

const debounceScroll = debounce(scrollCallback, 1000)

document.addEventListener('scroll', debounceScroll)
