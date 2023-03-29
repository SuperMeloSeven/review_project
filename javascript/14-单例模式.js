class Single {
  show() {
    console.log('show');
  }
  static getInstance() {
    if (!Single.instance) {
      Single.instance = new Single()
    }
  }
}

const s1 = Single.getInstance()
const s2 = Single.getInstance()
console.log(s1 === s2, '---s1 === s2');
