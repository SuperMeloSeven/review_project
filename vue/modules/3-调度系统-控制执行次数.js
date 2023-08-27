const bucket = new WeakMap()
const effectStack = []

const data = {
  foo: 1,
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

function effect(fn, options = {}) {
  const effectFn = () => {
    // 调用 cleanUp 完成清除工作
    cleanUp(effectFn)
    // 当 effectFn 执行时， 将其设置为当前激活的副作用函数
    activeEffect = effectFn
    //
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }

  // 将options挂载到effectFn上
  effectFn.options = options
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  effectFn()
}
function cleanUp(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0
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

  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到activeEffect.deps数组中
  activeEffect.deps.push(deps)
}
function trigger(target, key) {
  const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)

    const effectsToRun = new Set()
    effects && effects.forEach(effectFn => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
      if (effectFn !== activeEffect) { // 新增
        effectsToRun.add(effectFn)
      }
    })
    effectsToRun.forEach(effectFn => {
      //
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn)
      } else {
        // 否则直接执行副作用函数
        effectFn()
      }
    })
}

const jobQueue = new Set()
// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列里
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  // 如果队列正在刷新，则什么都不做
  if (isFlushing) return
  // 设置为true，代表正在刷新
  isFlushing = true
  // 在微任务队列中刷新 jobQueue
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    // 结束后重置 isFlushing
    isFlushing = false
  })
}

effect(() => {
  console.log(obj.foo);
}, {
  scheduler(fn) {
    // 每次调度时，将副作用函数添加到 jobQueue 队列中
    jobQueue.add(fn)
    // 调用 flushJob 刷新队列
    flushJob()
  }
})
obj.foo++
obj.foo++

