function forEach(array, callback) {
  const length = array.length;

  // 方式1
  // let index = -1;
  // while (++index < length) {
  //     callback(array[index], index);
  // }

  // 方式2
  for (let i = 0; i < length; i++) {
    callback(array[i], i);
  }

  // 方式3
  // for (const key in array) {
  //   callback(array[key], key);
  // }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}
function cloneReg(target) {
  const reFlags = /\w*$/; // 匹配正则表达式的修饰符
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m; // 匹配函数体
  const paramReg = /(?<=\().+(?=\)\s+{)/; // 匹配函数参数
  const funcString = func.toString(); // 将函数转化为字符串

  if (func.prototype) {
      console.log('普通函数');
      const param = paramReg.exec(funcString);
      const body = bodyReg.exec(funcString);
      if (body) {
          console.log('匹配到函数体：', body[0]);
          if (param) {
              const paramArr = param[0].split(',');
              console.log('匹配到参数：', paramArr);
              return new Function(...paramArr, body[0]);
          } else {
              return new Function(body[0]);
          }
      } else {
          return null;
      }
  } else {
    return eval(funcString);
  }
}
function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case functionTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

// 通过构造函数创建实例
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

// 可遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const functionTag = '[object Function]';

// 不可遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, functionTag];


function cloneDeep(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 根据不同类型进行克隆
  const type = getType(target);
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(cloneDeep(value, map));
    });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, cloneDeep(value, map));
    });
    return cloneTarget;
  }

  // 克隆数组和对象
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = cloneDeep(target[key], map);
  });
  return cloneTarget;
}

const map = new Map();
map.set('key', 'value');
map.set('copilot', 'nb');

const set = new Set();
set.add('val1');
set.add('val2');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  field5: map,
  field6: set,
  filed7: new Date(),
  filed8: /\w/g,
  filed9: Symbol('sym'),
  filed10: function(a, b) {
    return a + b
  },
  filed11: new Error('error')
};

function setValue(obj) {
  obj.field1 = 2222;
  obj.field2 = null;
  obj.field3.child = 'new child';
  obj.field4.push(1)
}

// console.time()
const cloneTarget = cloneDeep(target);
// console.timeEnd()
// setValue(cloneTarget)
console.log('cloneDeep target', cloneTarget, '----------');
console.log('structuredClone target', structuredClone({
  ...target,
  filed9: 'Symbol',
  filed10: 'Function'
}), '----------');


// const shallowTarget = Object.assign({}, target);
// const shallowTarget = {...target};
// setValue(shallowTarget)

// console.log('cloneDeep target', cloneTarget, '----------');
// console.log('shallow target', shallowTarget, '----------');
// console.log('origin target', target, '----------');


// 循环处理方式的性能测试
// const testArr = Array.from({ length: 1000 }, (_, index) => index + 1);
// const length = testArr.length
// let i = 0
//     sum1 = 0
//     sum2 = 0
//     sum3 = 0

// console.time()
// while (i < length) {
//   const element = testArr[i]
//   sum1 += element
//   i++
// }
// console.timeEnd()

// console.log('--------------')

// console.time()
// for (const key in testArr) {
//   const element = testArr[key]
//   sum2 += element
// }
// console.timeEnd()


// console.log('--------------')

// console.time()
// for (let i = 0; i < length; i++) {
//   const element = testArr[i];
//   sum3 += element
// }
// console.timeEnd()
