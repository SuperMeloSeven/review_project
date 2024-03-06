function* gen() {
  const a = yield 1;
  console.log(a, 'this is a');
  const b = yield 2;
  console.log(b, 'this is b');
  const c = yield 3;
  console.log(c, 'this is c');
  return 'resultValue'
}

let g = gen();

g.next(); // { value: 1, done: false }
g.next('param-a'); // { value: 2, done: false }
g.next('param-b') // { value: 3, done: false }
g.next() // { value: 'resultValue', done: true }
g.next() // { value: undefined, done: true }