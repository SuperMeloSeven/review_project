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

// const testObj = { x: undefined, y: Object, z: Symbol("test") }
// const result = (key, value) => {
//   if (value === undefined) {
//     return 'undefined'
//   } else if (typeof value === 'symbol' || typeof value === 'function') {
//     return value.toString()
//   }
//   return value
// }

// console.log(JSON.stringify(testObj));
// console.log(JSON.stringify(testObj, result));

// const queue = [];
// let activeCount = 0;
// let concurrency = 2;
// const run = async (resolve, fn) => {
//   activeCount++;
//   const result = (async () => fn())();
//   resolve(result);

//   await result;

//   console.log("打印***任务周期");
// };

// const enqueue = (fn, ...args) => {
//   return new Promise((resolve) => {
//     console.log(run.bind(undefined, resolve, fn, args), '---run.bind(undefined, resolve, fn, args)');
//     queue.push(run.bind(undefined, resolve, fn, args));
//     (async () => {
//       await Promise.resolve();
//       if (activeCount < concurrency && queue.length > 0) {
//         queue.pop()();
//       }
//     })();
//   });
// };

// const input = [1, 2, 3, 4, 5, 6].map((i) =>
//   enqueue(() => {
//     console.log(i);
//   })
// );
// console.log(module, '---module');
// console.log(require, '---require');

// const { obj, setVal } = require('./16-CJS.js')
// console.log(obj, '---obj');
// setVal(101)
// console.log(obj, '---obj');

// const _new = function (fn, ...args) {
//   const obj = Object.create(fn.prototype);
//   // obj.__proto__ = fn.prototype;
//   const result = fn.apply(obj, args);

//   return result instanceof Object ? result : obj;
// }


// var foo = 1;
// function fn() {
//     // 此处修改的不是全局变量，而是函数内部的变量
//     foo = 3;
//     return;

//     // 函数声明提升
//     function foo() {
//         // todo
//     }
// }
// fn();
// console.log(foo); // 1


// const o = Object.create({ x: 1, y: 2 })
// o.z = 3

// const { x, ...newObj } = o
// const { y, z } = newObj

// console.log(x, '---x');
// console.log(y, '---y');
// console.log(o.y, '---y');
// console.log(z, '---z');

// function* helloWorldGenerator() {
//   yield 'hello';
//   yield 'world';
//   return 'ending';
// }
// var hw = helloWorldGenerator();

// console.log(hw.next()); // { value: 'hello', done: false }
// console.log(hw.next()); // { value: 'world', done: false }
// console.log(hw.next()); // { value: 'ending', done: true }
// console.log(hw.next()); // { value: undefined, done: true }

// setTimeout(() => console.log(0));
// new Promise((resolve) => {
//   console.log(1);
//   resolve(2);
//   console.log(3);
// }).then((o) => console.log(o));

// new Promise((resolve) => {
//   console.log(4);
//   resolve(5);
// })
//   .then((o) => console.log(o))
//   .then(() => console.log(6));


function test() {
  return [1, 2].forEach(val => val)
}
 console.log(test(), '---test()');
