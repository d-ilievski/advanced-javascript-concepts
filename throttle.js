/*
  Design a function throttle(fn, interval) that adds
  a rate limit to the number of calls that can occur
  of the function ‘fn’ over a period of time ‘interval’.
*/

const throttle = (fn, interval) => {
    let timer = null;
  
    return (...args) => {
      if (timer === null) {
        fn(...args);
        timer = setTimeout(() => {
          if (timer !== null) {
            clearTimeout(timer);
            timer = null;
          }
        }, interval);
      }
    };
  };
  
  const throttledConsoleLog = throttle(console.log, 1000);
  
  const interval = setInterval(() => {
    console.log("Attempting...");
    throttledConsoleLog("Executed! (Throttled)");
  }, 200);
  
  setTimeout(() => {
    clearInterval(interval);
  }, 5300);
  