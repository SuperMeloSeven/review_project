function curryingFn(fn) {
    return function createCurring (...args) {
        // fn.length获取形参长度
        if (args.length >= fn.length) {
            // 这里的this是最终调用函数时，为其绑定的
            return fn.call(this, ...args)
        } else {
            return function (...subArgs) {
                return createCurring.apply(this, [...args, ...subArgs])
            }
        }
    }
}

function add(x, y, z) {
    return x + y + z
}

const curryAdd = curryingFn(add)

console.log(curryAdd(10, 20, 30))
console.log(curryAdd(10, 20)(30))
console.log(curryAdd(10)(20)(30))

// function hyCurrying(fn) {
//     function curried(...args) {
//         // 判断当前已经接收的参数的个数, 可以参数本身需要接受的参数是否已经一致了
//         // 1.当已经传入的参数 大于等于 需要的参数时, 就执行函数
//         if (args.length >= fn.length) {
//             // fn(...args)
//             // fn.call(this, ...args)
//             return fn.apply(this, args)
//         } else {
//             // 没有达到个数时, 需要返回一个新的函数, 继续来接收的参数
//             function curried2(...args2) {
//                 // 接收到参数后, 需要递归调用curried来检查函数的个数是否达到
//                 return curried.apply(this, args.concat(args2))
//             }
//             return curried2
//         }
//     }
//     return curried
// }
//
// var curryAdd = hyCurrying(add)
//
//
// console.log(curryAdd(10, 20, 30))
// console.log(curryAdd(10, 20)(30))
// console.log(curryAdd(10)(20)(30))