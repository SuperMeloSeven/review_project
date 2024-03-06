// 扩展运算符
// let outObj = {
//   outKey: 1,
//   inKey: {a: 1, b: 2}
// }
// let newObj = {...outObj}
// newObj.inKey.a = 2
// newObj.outKey = 2
// console.log(outObj) // { outKey: 1, inKey: { a: 2, b: 2 } }

// Object.assign
let outObj = {
  outKey: 1,
  inKey: {a: 1, b: 2}
}
let newObj = Object.assign({}, outObj)
newObj.inKey.a = 2
outObj.outKey = 2
console.log(outObj)
