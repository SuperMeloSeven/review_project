// function iteratorGenerator(list) {
//   let idx = 0;
//   let len = list.length;

//   return {
//     next: function() {
//       let done = idx >= len;
//       let value = !done ? list[idx++] : undefined;

//       return {
//         done,
//         value
//       }
//     }
//   }
// }

// const iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手']);
// console.log(iterator.next(), '---1');
// console.log(iterator.next(), '---2');
// console.log(iterator.next(), '---3');
// console.log(iterator.next(), '---4');


// const myObject = {
//   items: [1, 2, 3, 4, 5],
//   [Symbol.iterator]() {
//     let i = 0
//     const items = this.items

//     return {
//       next() {
//         if (i < items.length) {
//           return {
//             value: items[i++],
//             done: false
//           }
//         } else {
//           return {
//             done: true
//           }
//         }
//       }
//     }
//   }
// }

// for (const item of myObject) {
//   console.log(item); // 'a', 'b', 'c'
// }

// const iterable = {
//   *[Symbol.iterator]() {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// }

// for (const value of iterable) {
//   console.log(value, '---value');
// }

const handler = {
  get(target, prop, receiver) {
    console.log(prop, '---prop');
    if (prop === Symbol.toStringTag) {
      return 'CustomObject';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxy = new Proxy({}, handler);
console.log(Object.prototype.toString.call(proxy)); // [object CustomObject]
