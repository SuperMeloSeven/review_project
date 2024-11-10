// 模拟异步请求的函数，接受一个可能失败的参数来决定请求是否成功
function asyncRequest(success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(`Request succeeded with data for ${success}`);
      } else {
        reject(`Request failed with error for ${success}`);
      }
    }, Math.random() * 1000); // 随机延迟模拟网络请求
  });
}

// 创建几个异步请求的Promise
const promise1 = asyncRequest(true); // 假设这个请求成功
const promise2 = asyncRequest(false); // 假设这个请求失败
const promise3 = asyncRequest(true); // 另一个成功的请求

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
      const results = []
      let count = 0

      if (!promises || promises.length === 0) {
         resolve(results)
         return
      }

      const length = promises.length
      for (let i = 0; i < length; i++) {
         Promise.resolve(promises[i]).then((value) => {
            results[i] = {
               status: 'fulfilled',
               value
            }
            count++

            if (count === length) {
               resolve(results)
            }
         },  (reason) => {
            results[i] = {
               status: 'rejected',
               reason
            }
            count++

            if (count === length) {
               resolve(results)
            }
         })
      }
  })
}

// 使用Promise.allSettled来处理所有的请求
const test = async () => {
  // Promise.allSettled([promise1, promise2, promise3]).then(results => {
  //   console.log('All settled results:', results);

  //   results.forEach((result, index) => {
  //     if (result.status === 'fulfilled') {
  //       console.log(`Promise ${index + 1} was fulfilled with value:`, result.value);
  //     } else {
  //       console.log(`Promise ${index + 1} was rejected with reason:`, result.reason);
  //     }
  //   });
  // });
  try {
    const res = await Promise.allSettled([promise1, promise2, promise3])
    console.log('All settled results-res:', res);
    // const res2 = await Promise.all([promise1, promise2, promise3])
    // console.log('All settled results:', res2);
    const res3 = await Promise.myAllSettled([promise1, promise2, promise3])
    console.log('All settled results-res3:', res3);
  } catch (error) {
    console.log(error, '---error');
  }
}
test()
