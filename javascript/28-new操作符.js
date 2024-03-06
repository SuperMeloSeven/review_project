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
