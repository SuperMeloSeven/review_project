class TreeNode {
  constructor(val, left, right) {
      this.val = val === undefined ? null : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
  }
}

function arrayToBST(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;

  function buildTree(start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(arr[mid]);

      node.left = buildTree(start, mid - 1);
      node.right = buildTree(mid + 1, end);

      return node;
  }

  return buildTree(0, arr.length - 1);
}

const isBalanced = function(root) {
  // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
  let flag = true
  // 定义递归逻辑
  function dfs(root) {
      // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
      if(!root || !flag) {
          return 0
      }
      // 计算左子树的高度
      const left = dfs(root.left)
      // 计算右子树的高度
      const right = dfs(root.right)

      console.log(left, '---left');
      console.log(right, '---right');
      // 如果左右子树的高度差绝对值大于1，flag就破功了
      if(Math.abs(left-right) > 1) {
          flag = false
          // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
          return 0
      }
      // 返回当前子树的高度
      return Math.max(left, right) + 1
  }

  // 递归入口
  dfs(root)
  // 返回flag的值
  return flag
};


const root = arrayToBST([3, 9, 20, null, null, 15, 7]);

const root2 = {
  "val": 1,
  "left": {
      "val": 2,
      "left": {
          "val": 3,
          "left": {
              "val": 4,
              "left": null,
              "right": null
          },
          "right": {
              "val": 4,
              "left": null,
              "right": null
          }
      },
      "right": {
          "val": 3,
          "left": null,
          "right": {
              "val": 3,
              "left": null,
              "right": null
          }
      }
  },
  "right": {
      "val": 2,
      "left": null,
      "right": null
  }
}

// console.log(isBalanced(root), '---root');
console.log(isBalanced(root2), '---root2');

