function logger(func) {
  return function() {
    console.log('Entering:', func.name);
    const result = func.apply(this, arguments);
    console.log('Exiting:', func.name);
    return result;
  }
}

function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

const sayHelloLogger = logger(sayHello);

sayHelloLogger('John');
