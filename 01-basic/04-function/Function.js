// Your JavaScript function as a string
var functionString = `console.log(args)`;

// Create a function using the Function constructor
var addFunction = new Function("args", functionString);
console.log("🚀 ~ file: Function.js:6 ~ addFunction:", addFunction)

// Now, you can call the function
var result = addFunction([1,2,3,4,5,6,7,8]);
console.log(result);
