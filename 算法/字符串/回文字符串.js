// function isPalindrome(str) {
//   const len = str.length / 2
//   const length = str.length

//   for (let i = 0; i < len; i++) {
//     if (str[i] !== str[length - 1 - i]) {
//       return false
//     }
//   }

//   return true
// }

// const str1 = 'aba'
// const str2 = 'abca'

function test (str) {
  const len = str.length
  let i = 0,  j = len - 1

  while(i < j && str[i] === str[j]) {
    i++
    j--
  }


  function isPalindrome (si, sj) {
    while(si < sj) {
      if (str[si] !== str[sj]) {
        return false
      }
      si++
      sj--
    }
    return true
  }

  return isPalindrome(i + 1, j) || isPalindrome(i, j - 1) || false
}


// 数据量较大时，会超时
function test2 (str) {
  function isPalindrome(str) {
    const len = str.length / 2
    const length = str.length

    for (let i = 0; i < len; i++) {
      if (str[i] !== str[length - 1 - i]) {
        return false
      }
    }

    return true
  }

  const arr = []
  const length = str.length
  for (let i = 0; i < length; i++) {
    const _str = str.slice(0, i) + str.slice(i + 1);
    arr.push(_str)
  }

  return arr.some(s => isPalindrome(s))
}
console.log(test2('abca'));
console.log(test2('aba'));
console.log(test2('abc'));

