const num1 = [0];
const num2 = [1];
const m = 0;
const n = 1;


function merge(num1, m, num2, n) {
  let i = m - 1
  let j = n - 1
  let k = m + n - 1

  while(i >= 0 && j >= 0) {
    if (num1[i] > num2[j]) {
      num1[k] = num1[i]
      i--
      k--
    } else {
      num1[k] = num2[j]
      j--
      k--
    }
  }


  /** 此时，如果j仍然大于等于0，说明nums2还有剩余元素，以下案例可以触发
   * const num1 = [0];
   * const num2 = [1];
   * const m = 0;
   * const n = 1;
   *  **/
  while(j>=0) {
    console.log('我要触发');
    num1[k] = num2[j]
    k--
    j--
  }

  console.log('num1', num1);

}

merge(num1, m, num2, n)
