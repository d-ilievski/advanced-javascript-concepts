/*
  Design a function once(fn) that adds a limit to
  the execution of the function ‘fn’ so it can be
  executed only once.
*/

function once(fn) {
    let called = false;
    return (...args) => {
      if (called) return;
  
      called = true;
      return fn(...args);
    };
  }
  
  const onceCalledFunction = once(() =>
    console.log("This will be logged only once!")
  );
  
  onceCalledFunction();
  onceCalledFunction();
  onceCalledFunction();