/*
  Implement a Runner class, which manages task execution with 
  a specified concurrent limit. This limit determines how many 
  tasks can run simultaneously. If the limit is reached, any 
  additional tasks should be queued and executed only after some 
  of the currently running tasks have completed. This ensures 
  efficient task management by maintaining a balance between
  concurrent execution and queuing, so that the Runner class
  can process tasks in an orderly and controlled manner.
  Bonus points: The class should support adding priority tasks.
*/

class Runner {
    constructor(concurrent) {
      this.concurrent = concurrent;
      this.running = 0;
      this.queue = [];
      this.priorityQueue = [];
    }
  
    add(task, priority = false) {
      if (priority) {
        this.priorityQueue.push(task);
      } else {
        this.queue.push(task);
      }
  
      this.execute();
    }
  
    async execute() {
      while (this.running < this.concurrent) {
        const task = this.priorityQueue.shift() || this.queue.shift();
        if (!task) {
          return;
        }
        this.running += 1;
        await task();
        this.running -= 1;
        this.execute();
      }
    }
  }
  
  function task(x) {
    return function () {
      return new Promise((resolve, _) => {
        setTimeout(() => {
          console.log("task completed", x);
          resolve();
        }, 2000);
      });
    };
  }
  
  runner = new Runner(3);
  runner.add(task(2));
  runner.add(task(2));
  runner.add(task(2));
  
  runner.add(task(4));
  runner.add(task(4));
  runner.add(task(4));
  
  runner.add(task(6), true);
  runner.add(task(6), true);
  runner.add(task(6), true);