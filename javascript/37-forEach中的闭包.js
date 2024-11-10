function createClosure() {
  let shareCount = 0

  function increment() {
    shareCount++

    return shareCount
  }

  return {
    forEachCallback: function (item) {
      console.log(increment(), item);
    }
  }
}

const array = [1, 2, 3, 4]
array.forEach(createClosure().forEachCallback)
