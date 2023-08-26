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

const queue = [];
let activeCount = 0;
let concurrency = 2;
const run = async (resolve, fn) => {
  activeCount++;
  const result = (async () => fn())();
  resolve(result);

  await result;

  console.log("打印***任务周期");
};

const enqueue = (fn, ...args) => {
  return new Promise((resolve) => {
    console.log(run.bind(undefined, resolve, fn, args), '---run.bind(undefined, resolve, fn, args)');
    queue.push(run.bind(undefined, resolve, fn, args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.length > 0) {
        queue.pop()();
      }
    })();
  });
};

const input = [1, 2, 3, 4, 5, 6].map((i) =>
  enqueue(() => {
    console.log(i);
  })
);
// console.log(module, '---module');
// console.log(require, '---require');

const { obj, setVal } = require('./16-CJS.js')
console.log(obj, '---obj');
setVal(101)
console.log(obj, '---obj');
