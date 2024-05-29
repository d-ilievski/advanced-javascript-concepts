/*
  Design a function promiseAll(tasks) that behaves like 
  Promise.all(), but adds additional features such as timeout 
  for each promise. The function should return a promise that 
  resolves when all the tasks are completed or rejects if any 
  of the tasks fail. If a task doesn't complete within the 
  specified timeout, it should be rejected.
*/

async function promiseAll(tasks) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;

        tasks.forEach((value, index) => {
            Promise.resolve(value).then(result => {
                results[index] = result;
                completed += 1;

                if (completed == tasks.length) {
                    resolve(results);
                }
            }).catch(err => reject(err));
        });
    });
}

async function promiseAllTimeout(tasks, timeout) {
    return promiseAll(
        tasks.map((task) => {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Task timed out"));
                }, timeout);
            });

            const taskPromise = Promise.resolve().then(() => task());
            return Promise.race([taskPromise, timeoutPromise]);
        })
    );
}

const createTask = (seconds) => {
    return () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve("Resolved " + seconds);
            }, 1000 * seconds)
        );
};

const tasksResolve = [createTask(1), createTask(2)];

// Resolves
promiseAllTimeout(tasksResolve, 2500)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });

const tasksReject = [
    createTask(1),
    createTask(4) // Tries to resolve after 4s
];

// Rejects
promiseAllTimeout(tasksReject, 3000)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });
