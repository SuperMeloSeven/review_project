// function* test() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let g = test();

// console.log(g.next(), '---1');
// console.log(g.next(), '---2');
// console.log(g.next(), '---3');
// console.log(g.next(), '---4');

/** ------------- */


function* gen() {
  const a = yield 1;
  console.log(a,'this is a')
  const b = yield 2;
  console.log(b,'this is b')
  const c = yield 3;
  console.log(c,'this is c')
}

let g = gen();

g.next(); // { value: 1, done: false }
g.next('param-a'); // { value: 2, done: false }
g.next('param-b'); // { value: 3, done: false }
g.next('param-c'); // { value: undefined, done: true }
