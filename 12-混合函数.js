function double(num) {
    return num * 2
}

function square(num) {
    return num ** 2
}

// function compose(fn1, fn2) {
//     return function (num) {
//         return fn2(fn1(num))
//     }
// }
//
const composeFn = compose(double, square)
console.log(composeFn(20))


function compose(...fns) {
    const fnsLength = fns.length // 获取实参长度
    for (let i = 0; i < fnsLength; i++) {
        if (typeof fns[i] !== 'function') {
            throw new Error('Expected a function')
        }
    }

    return function (...args) {
        let index = 0
        let result = fnsLength ? fns[index].call(this, args) : args
        while (++index < fnsLength) {
            result = fns[index].call(this, result)
        }
        return result
    }
}

