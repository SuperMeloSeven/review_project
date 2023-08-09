const $app = document.querySelector('#app')
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
const bucket = new WeakMap()
let activeEffect
const effect = function (fn) {
  activeEffect = fn
  fn()
}

const state = new Proxy({ name: 'hh', age: 100}, {
  get(target, key) {
    console.log(target, '---target');

    const value = target[key]
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

    console.log(`get ${key}:${target[key]}`);
    return value
  },
  set(target, key, newValue) {
    console.log(`set ${key}:${newValue}`);
    target[key] = newValue

    const depsMap = bucket.get(target)

    if (!depsMap) return

    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())

    console.log(depsMap, '---depsMap');
    console.log(bucket, '---bucket');
  }
})

effect(() => {
  console.log('执行了effect');
  $app.innerText = `hello ${ state.name }, are you ${ state.age } years old?`
})

effect(() => {
  console.log('执行了effect2');
  $app.innerText = `hello2 ${ state.name }`
})

setTimeout(() => {
  state.name = 'Vue3'
  state.age = '1000'
}, 1000)
