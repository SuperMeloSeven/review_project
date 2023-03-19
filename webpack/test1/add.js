// exports.default = function (a, b) {
//   return a + b
// }

// webpack处理后

var exports = {}
(function (exports, code) {
  eval(code)
}(exports, 'exports.default = function (a, b) { return a + b }'))
