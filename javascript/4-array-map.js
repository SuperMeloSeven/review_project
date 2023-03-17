const oldMap = [
  {
    id: 1,
    name: 'jack',
    age: 11,
  },
  {
    id: 2,
    name: 'tom',
    age: 18
  }
]

const newMap = oldMap.map(item => ({
  id: item.id + 1,
  name: item.name + '3123123',
  age: item.age + '这里是年龄'
}))

console.log(newMap);