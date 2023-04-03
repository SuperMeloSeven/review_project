// class Single {
//   show() {
//     console.log('show');
//   }
//   static getInstance() {
//     if (!Single.instance) {
//       Single.instance = new Single()
//     }
//   }
// }

// const s1 = Single.getInstance()
// const s2 = Single.getInstance()
// console.log(s1 === s2, '---s1 === s2');

const Modal = (function () {
  let modal = null
  return function () {
    if (!modal) {
      modal = document.createElement('div')
      modal.innerHTML = '我是全局模态框'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

document.getElementById('open').addEventListener('click', function () {
  const modal = new Modal()
  modal.style.display = 'block'
})
document.getElementById('close').addEventListener('click', function () {
  const modal = new Modal()
  modal && (modal.style.display = 'none')
})
