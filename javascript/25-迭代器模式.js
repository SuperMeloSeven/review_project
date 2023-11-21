function iteratorGenerator(list) {
  let idx = 0;
  let len = list.length;

  return {
    next: function() {
      let done = idx >= len;
      let value = !done ? list[idx++] : undefined;

      return {
        done,
        value
      }
    }
  }
}

const iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手']);
console.log(iterator.next(), '---1');
console.log(iterator.next(), '---2');
console.log(iterator.next(), '---3');
console.log(iterator.next(), '---4');
