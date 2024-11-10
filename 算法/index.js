/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// const maxSlidingWindow = function (nums, k) {
//   // 缓存数组的长度
//   const len = nums.length;
//   // 初始化结果数组
//   const res = [];
//   // 初始化双端队列
//   const deque = [];
//   // 开始遍历数组
//   for (let i = 0; i < len; i++) {
//     // 当队尾元素小于当前元素时
//     while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
//       // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
//       deque.pop();
//     }
//     // 入队当前元素索引（注意是索引）
//     deque.push(i);
//     // 当队头元素的索引已经被排除在滑动窗口之外时
//     while (deque.length && deque[0] <= i - k) {
//       // 将队头元素索引出队
//       deque.shift();
//     }
//     console.log(deque, '---deque');
//     // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
//     if (i >= k - 1) {
//       res.push(nums[deque[0]]);
//     }
//   }
//   // 返回结果数组
//   return res;
// };

// maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    // 缓存入参数组长度
    const len = nums.length
    // 当前组合的数组
    const subset = []
    // 结果数组
    const res = []

    // 从0开始进行深度优先搜索
    dfs(0)


    function dfs(index) {
        // 重要：每次进入，都意味着组合内容是更新了一次，所以推入结果数组
        res.push(subset.slice())
        // 开始遍历
        for(let i = index; i < len; i++) {
            // 当前数字存在组合的情况
            subset.push(nums[i])
            // 注意这里是从i+1开始递归遍历处理，进一步dfs
            dfs(i+1)
            // 删除数字不存在于数组组合的情况
            subset.pop()
            console.log(subset, '---pop后');
        }
    }

    return res
};
subsets([1,2,3])
