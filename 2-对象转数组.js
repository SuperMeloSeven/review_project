let obj = {
  0: 'test',
  1: 'object',
  2: 'array',
  length: 3
}

let objArr = Array.prototype.slice.call(obj)
console.log(objArr);


let str = null
let output = str ?? '我来输出'