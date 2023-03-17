Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    console.error('type error');
  }

  const args = [...arguments].slice(1) // 过滤第一个参数，获取参数列表
  let result = null

  context = context || window
  context.fn = this

  result = context.fn(...args)

  console.log(context, 'context');
  console.log(context.fn, 'this');
  console.log(result, 'result');

  delete context.fn
  return result
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }

  context = context || window
  context.fn = this

  // 可以数组也可以类数组，所以这里不能用Array.isArray()
  if (arguments[1] && arguments[1].length > 0) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }

  const args = [...arguments].slice(1)
  const fn = this

  return function Fn() {
    console.log([...args, ...arguments], '[...args, ...arguments]');
    return fn.apply(
      this instanceof Fn ? this : context,
      [...args, ...arguments]  // 这里的arguments是Fn函数内部的
    )
  }
}

function oldFn() {
  return [...arguments].reduce((preValue, currValue) => preValue + currValue, 0)
}

function newFn() {
  
}
console.log(oldFn.myCall(newFn, 5, 6), '----');
console.log(oldFn.myApply(newFn, [1, 2]), '----');
console.log(oldFn.myBind(newFn, 3, 4)(3, 4), '----');