function create(Con, ...args) {
  let newObj = null
  let constructor = Con
  let result = null

  if (typeof constructor !== 'function') {
    console.error('type error');
    return
  }

  newObj = Object.create(constructor.prototype)
  result = constructor.apply(newObj, args)

  return typeof result === 'object' ? result : newObj
}

function group(name, age) {
  this.name = name
  this.age = age
}

const obj = create(group, 'xiaoMing', 18)
console.log(obj, '---obj'); // group { name: 'xiaoMing', age: 18 }

const obj2 = new group('xiaoHong', 20)
console.log(obj2, '---obj2'); // group { name: 'xiaoHong', age: 20 }
