function log() {
  // Decorator function
  return function decorator() {
    // "arrow" function
    return (...args) => {
      console.log(`Parameters : args`);
      return new Class(...args);
    };
  };
}

// Decorators
@log()
class gfg {
  constructor(name, category) {}
}

const e = new gfg("geek", "code");

// Arguments for Demo: args
console.log(e);
