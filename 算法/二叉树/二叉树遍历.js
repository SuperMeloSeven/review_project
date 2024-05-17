const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}

// 前序遍历
function preOrder(root) {
  // 递归边界
  if (!root) return

  console.log('当前前序遍历的结点值是：', root.val);


  preOrder(root.left)
  preOrder(root.right)
}
preOrder(root)
console.log('-------------------');

// 中序遍历
function inOrder(root) {
  // 递归边界
  if (!root) return

  inOrder(root.left)
  console.log('当前中序遍历的结点值是：', root.val)
  inOrder(root.right)
}
inOrder(root)
console.log('-------------------');

// 后序遍历
function postOrder(root) {
  // 递归边界
  if (!root) return

  postOrder(root.left)
  postOrder(root.right)
  console.log('当前后序遍历的结点值是：', root.val)
}
postOrder(root)
