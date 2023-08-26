const bucket = new WeakMap()

const data = {
  ok: true,
  text: 'hello world'
}
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
  }
})

let activeEffect

function effect(fn) {
  activeEffect = fn
  fn()
}

function track(target, key) {
  if (!activeEffect) return target[key]

  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合deps中
  deps.add(activeEffect)
}
function trigger(target, key) {
  const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
}

effect(() => {
  console.log(`effect run`);
  document.body.innerText = obj.ok ? obj.text : 'not'
})

setTimeout(() => {
  obj.ok = false // 此时页面变成了not

  setTimeout(() => {
    obj.text = 'other' // 页面依然是not，但是副作用函数却还会执行一次
  }, 1000)
}, 1000)

