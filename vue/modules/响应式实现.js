// const $app = document.querySelector('#app')
// const $app2 = document.querySelector('#app2')

// const bucket = new Set()

/** 方案1 */
// const state = new Proxy({ text: 'hello js' }, {
//   get(target, key) {
//     bucket.add(effect)
//     console.log(`get ${key}:${target[key]}`);
//     return target[key]
//   },
//   set(target, key, newValue) {
//     console.log(`set ${key}:${newValue}`);
//     target[key] = newValue
//     bucket.forEach(fn => fn())
//   }
// })

// function effect() {
//   console.log('执行effect');
//   $app.innerText = state.text
// }
// effect()

// setTimeout(() => {
//   state.text = 'hello vue3'
// }, 2000)

/** 方案2 */
// let activeEffect
// const effect = function(fn) {
//   activeEffect = fn
//   fn()
// }
// const state = new Proxy({ text: 'hello js1', text2: 'hello js2' }, {
//   get(target, key) {
//     bucket.add(activeEffect)
//     console.log(`get ${key}:${target[key]}`);
//     return target[key]
//   },
//   set(target, key, newValue) {
//     console.log(`set ${key}:${newValue}`);
//     target[key] = newValue
//     bucket.forEach(fn => fn())
//   }
// })
// effect(() => {
//   console.log('执行了effect1');
//   $app.innerText = state.text
// })
// effect(() => {
//   console.log('执行了effect2');
//   $app2.innerText = state.text2
// })

// setTimeout(() => {
//   state.text = 'hello vue3'
//   state.text2 = 'hello2 vue3'
// }, 2000)

/** 方案3 */
// const bucket = new WeakMap()
// let activeEffect
// const effect = function (fn) {
//   activeEffect = fn
//   fn()
// }

// const state = new Proxy({ name: 'hh', age: 100}, {
//   get(target, key) {
//     const value = target[key]
//     if (!activeEffect) return

//     let depsMap = bucket.get(target)
//     if (!depsMap) {
//       bucket.set(target, (depsMap = new Map()))
//     }
//     let deps = depsMap.get(key)
//     if (!deps) {
//       depsMap.set(key, (deps = new Set()))
//     }
//     deps.add(activeEffect)

//     console.log(`get ${key}:${target[key]}`);
//     return value
//   },
//   set(target, key, newValue) {
//     console.log(`set ${key}:${newValue}`);
//     target[key] = newValue

//     const depsMap = bucket.get(target)

//     if (!depsMap) return

//     const effects = depsMap.get(key)
//     effects && effects.forEach(fn => fn())
//   }
// })

// effect(() => {
//   console.log('执行了effect------');
//   $app.innerText = `hello ${ state.name }, are you ${ state.age } years old?`
// })

// setTimeout(() => {
//   state.name = 'Vue3'
//   state.age = 12
// }, 1000)

/** 方案4 reactive抽象 */
const bucket = new WeakMap()
const effectStack = []
let activeEffect
const effect = function(fn, options = {}) {
  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = fn
    // 入栈
    effectStack.push(effectFn)
    fn()
    // 出栈
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }

  effectFn.deps = []
  // 将options参数挂在effectFn上，便于effectFn执行时可以读取到scheduler
  console.log(options, '---options');
  effectFn.options = options
  effectFn()
}
function cleanUp(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

function track(target, key) {
  if (!activeEffect) return

  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)

  if (!depsMap) return

  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

function reactive(state) {
  return new Proxy(state, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, newValue) {
      target[key] = newValue
      trigger(target, key)
    }
  })
}

// const state = reactive({
//   foo: true,
//   bar: true
// })

/** 嵌套情况 */
// effect(function effectFn1() {
//   console.log(`effectFn1---`);

//   effect(function effectFn2() {
//     console.log(`effectFn2---`);
//     console.log(state.bar, '---state.bar');
//   })

//   console.log(state.foo, '---state.foo');
// })

// setTimeout(() => {
//   state.foo = false
// }, 1000)

/** 调度执行 */
const state = reactive({
  num: 1
})

effect(() => {
  console.log(state.num, '---state.num');
}, {
  scheduler(fn) {
    setTimeout(() => {
      fn()
    }, 0)
  }
})

state.num++

console.log(`end`);
