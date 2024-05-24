/**
 * 两数求和
 * nums = [2, 7, 11, 15], target = 9
 * nums[0] + nums[1] = 2 + 7 = 9
 * return [0, 1]
 * **/

const nums = [7,11,15,2]

const target = 9


// const indexList = sum(nums, target)
// console.log('indexList', indexList);



function sum1 (nums, target) {
  const arr = []
  const length = nums.length

  for (let i = 0; i < length; i++) {
    for (let t = i + 1; t < length; t++) {
      if (nums[i] + nums[t] === target) {
        arr.push(i, t)
        return arr
      }
    }
  }
}

function sum2 (nums, target) {
  const map = {}
  const length = nums.length

  for (let i = 0; i < length; i++) {
    if (typeof map[target - nums[i]] === 'number') {
      return [map[target - nums[i]], i]
    }

    map[nums[i]] = i
  }
}

function sum3 (nums, target) {
  const map = new Map()
  const length = nums.length

  for (let i = 0; i < length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    }

    map.set(nums[i], i)
  }
}

console.time()
sum1(nums, target)
console.timeEnd()

console.time()
sum2(nums, target)
console.timeEnd()

console.time()
sum3(nums, target)
console.timeEnd()
