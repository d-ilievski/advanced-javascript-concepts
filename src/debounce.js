/*
  Design a function debounce(fn, interval) that adds 
  a rate limit to the function ‘fn’ so it can execute 
  only after ‘interval’ milliseconds have passed since 
  the last call to the debounced function ‘fn’.
*/

const debounce = (fn, interval) => {
    let timer = null;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, interval);
    };
  };
  
  const debouncedConsoleLog = debounce(console.log, 1000);
  
  const testingInterval = setInterval(() => {
    const timer = setInterval(() => {
      console.log("Attempt (Debounced)");
  
      debouncedConsoleLog("Executed! (Debounced)");
    }, 200);
  
    setTimeout(() => {
      console.log("Stop (Debounced)");
      clearInterval(timer);
    }, 1000);
  }, 2500);
  
  // clear the testing loop after 10 seconds
  setTimeout(() => {
    clearInterval(testingInterval);
  }, 10000);
  