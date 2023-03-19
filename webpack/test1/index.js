// const add = require('./add.js').default
// console.log(add(1, 2), '---add(1, 2)')


// const moduleObj = {
//   "index.js": `
//     var add = require('add.js').default
//     console.log(add(1 , 2))
//     `,
//   "add.js": `exports.default = function(a,b){return a + b}`,
// }

// function require(file) {
//   var exports = {};
//   (function (exports, code) {
//     eval(code);
//   })(exports, moduleObj[file])
//   return exports
// }

// require("index.js");

(function(moduleObj) {
  function require(file) {
    var exports = {};
    (function (exports, code) {
      eval(code);
    })(exports, moduleObj[file])
    return exports
  }

  require("index.js");
})({
  "index.js": `
    var add = require('add.js').default
    console.log(add(1, 2))
    `,
  "add.js": `exports.default = function(a,b){return a + b}`,
})
