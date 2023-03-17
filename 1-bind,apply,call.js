function fn(a, b) {
  return a * b
}
function fun(x, y) {
  return x + y
}
console.log(fn.call(fun, 5, 7));
console.log(Object.prototype.__proto__);
let a = new fun()
console.log(a.__proto__ === fun.prototype);


Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('errrrror')
  }
  console.log(arguments);
}

Function.prototype.myCall = function (context) {
  var context = context || window
  var args = [...arguments].slice(1)
  context.fn = this

  var result = context.fn(...args)
  delete context.fn
  return result
}