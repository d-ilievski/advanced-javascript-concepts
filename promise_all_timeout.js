/*
Design a function promiseAll(tasks) that behaves like Promise.all(), but adds additional features such as timeout for each promise. The function should return a promise that resolves when all the tasks are completed or rejects if any of the tasks fail. If a task doesn't complete within the specified timeout, it should be rejected.
*/

async function promiseAll(tasks, timeout) {
    return Promise.all(
      tasks.map((task) => {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('Task timed out'));
            }, timeout)
          })
  
        const taskPromise = Promise.resolve().then(() => task())
        return Promise.race([taskPromise, timeoutPromise])
      })
    )
  }
  
  const createTask = (index) => {
    return () => new Promise((resolve) => setTimeout(() => { 
      resolve('Resolved ' + index);
    }, 1000 * index));
  }
  
  const tasks = Array.from(Array(5)).map((_, index) => createTask(index));
  
  promiseAll(tasks, 5000).then(results => {
    console.log(results);
  }).catch(error => {
    console.error('Error:', error.message);
  });