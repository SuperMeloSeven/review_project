var WordDictionary = function () {
  // 担任Map角色
  this.words = {}
};

/**
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function (word) {
  if (this.words[word.length]) {
      this.words[word.length].push(word)
  } else {
      this.words[word.length] = [word]
  }
};

/**
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function (word) {
  // word对应长度在 Map 中不存在
  if (!this.words[word.length]) {
      return false
  }

  // 缓存字符串长度
  const len = word.length
  // 字符串不包含 . 情况
  if (!word.includes('.')) {
      return this.words[len].includes(word)
  }


  // 正则表达式中 . 匹配除换行符以外的所有字符
  const reg = new RegExp(word)
  return this.words[len].some(val => reg.test(val))
};

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/
