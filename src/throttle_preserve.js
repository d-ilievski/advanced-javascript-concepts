/*
  Design a function throttle(fn, interval) that adds a rate limit
  to the number of calls that can occur of the function ‘fn’ over
  a period of time ‘interval’. 
  
  Bonus points for preserving the 
  last throttled call and executing it on with the correct rate.
*/

const throttlePreserve = (fn, interval) => {
    let timer = null;
    let lastFn = null;
  
    return (...args) => {
      if (timer === null) {
        fn(...args);
        timer = setTimeout(() => {
          if (timer !== null) {
            clearTimeout(timer);
            timer = null;
  
            if (lastFn) {
              lastFn(...args);
              lastFn = null;
            }
          }
        }, interval);
      } else {
        lastFn = fn;
      }
    };
  };
  
  const throttledConsoleLog = throttlePreserve(console.log, 1000);
  
  const timer = setInterval(() => {
    console.log("Attempt (Throttled)");
    throttledConsoleLog("Executed! (Throttled)");
  }, 200);
  
  setTimeout(() => {
    clearInterval(timer);
  }, 5000);
  