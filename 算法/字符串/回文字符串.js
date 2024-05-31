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

console.log('isPalindrome', isPalindrome('abba'));
console.log('isPalindrome', isPalindrome('abcdef'));
