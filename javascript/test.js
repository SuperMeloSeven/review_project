// let toJsonMyIntro = {
//   name: "Gopal",
//   age: 25,
//   like: "FE"
//   // toJSON: function () {
//   //   return "前端杂货铺";
//   // },
// };

// console.log(JSON.stringify(toJsonMyIntro)); // "前端杂货铺"
// console.log(JSON.stringify(toJsonMyIntro));
// console.log(JSON.stringify(toJsonMyIntro, null, 2));

const testObj = { x: undefined, y: Object, z: Symbol("test") }
const result = (key, value) => {
  if (value === undefined) {
    return 'undefined'
  } else if (typeof value === 'symbol' || typeof value === 'function') {
    return value.toString()
  }
  return value
}

console.log(JSON.stringify(testObj));
console.log(JSON.stringify(testObj, result));
