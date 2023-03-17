// async function async1(){
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end')
// }
// async function async2(){
//   console.log('async2')
// }
// console.log('script start');
// async1();
// console.log('script end')

/** ---------- */

// function testAsy(x){
//   return new Promise(resolve=>{setTimeout(() => {
//       resolve(x);
//     }, 3000)
//    }
//   )
// }
// async function testAwt(){
//  let result =  await testAsy('hello world');
//  console.log(result);    // 3秒钟之后出现hello world
//  console.log('cuger')   // 3秒钟之后出现cug
// }
// testAwt();
// console.log('cug')  //立即输出cug

/** ---------- */

// async function async1 () {
//   await new Promise((resolve, reject) => {
//     resolve()
//   })
//   console.log('A');
// }

// async1()

// new Promise(resolve => {
//   console.log('B');
//   resolve()
// }).then(() => {
//   console.log('C');
// }).then(() => {
//   console.log('D');
// })
/** ---------- */

// async function async1 () {
//   await async2()
//   console.log('A');
// }

// async function async2 () {
//   return new Promise(resolve => {
//     resolve()
//   })
// }

// async1()

// new Promise(resolve => {
//   console.log('B');
//   resolve()
// }).then(() => {
//   console.log('C');
// }).then(() => {
//   console.log('D');
// })
/** -------- */

async function async1 () {
  console.log('1')
  await async2()
  console.log('AAA') // async2返回的是promise 需要等待两个then，所以暂时无法执行
}

async function async2 () {
  console.log('3')
  return new Promise((resolve, reject) => {
      resolve()
      console.log('4')
  })
}

console.log('5')

setTimeout(() => {
  console.log('6') // 宏任务1
}, 0);

async1()

new Promise((resolve) => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
}).then(() => {
  console.log('9')
}).then(() => {
  console.log('10')
})
console.log('11')
// 5 1 3 4 7 11 8 9 AAA 10 6