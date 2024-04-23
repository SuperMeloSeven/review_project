const obj = {
  name: 'xxx',
  age: 18
}

const newObj = Object.create(obj)

console.log(newObj.constructor, '---newObj');

const newObj2 = Object.create.call(this, obj)

console.log(newObj2.constructor, '---newObj2');
