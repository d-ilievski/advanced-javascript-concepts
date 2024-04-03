/*
Create a function cacheFunction(originalFunction) that takes any function as an argument and returns a new function that caches the results of calling the original function. The cache should store previous calls based on the arguments passed to the function. If the cached function is called again with the same arguments, it should return the cached result and not call the original function.
*/


function cacheFunction(originalFunction) {
  
    const cache = new Map();
    
    return (...args) => {
  
      const key = JSON.stringify(args);
      console.log(key);
      const cachedValue = cache.get(key);
  
      if(cachedValue) {
        console.log('From cache: ' + cachedValue);
        return cachedValue;
      }
  
      const result = originalFunction(...args);
      cache.set(key, result);
      return result;
    }
  }
  
  const sum = (a, b) => {
    return a + b;
  }
  
  const cachedSum = cacheFunction(sum);
  
  console.log(cachedSum(2, 3))
  console.log(cachedSum(2, 2))
  console.log(cachedSum(2, 3))