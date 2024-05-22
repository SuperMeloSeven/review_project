const list =   {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}

// function listNode (val) {
//   this.val = val
//   this.next = null
// }

const reverseList = {}

// 迭代（双指针）
function reverseList1(head) {
  let cur = head; // 正向链表的头指针
  let pre = null; // 反向链表的头指针
  while (cur) {
    const temp = cur.next; // 暂存当前节点的后续节点，用于更新正向链表
    cur.next = pre; // 将当前节点指向反向链表，这是一个建立反向链接的过程
    pre = cur; // 更新反向链表的头指针为当前已处理的节点，反向链表的该轮构建完成
    cur = temp; // 将正向链表头指针替换为暂存的节点，正向链表处理完成，开始下一轮处理

    // [cur.next, pre, cur] = [pre, cur, cur.next]; // 上述代码的简写
  }
  return pre;
}

// 递归
function reverseList2 (head) {
  // 判断当前节点是否还需要处理
  if (head == null || head.next == null) {
    return head;
  }
  // 递归处理后续节点
  const reverseHead = reverseList2(head.next);
  // 局部反转节点
  head.next.next = head;
  console.log('head.next.next', head.next.next);
  head.next = null;
  console.log('head', head);
  console.log('head.next', head.next);

  return reverseHead;
};
reverseList2(list)
