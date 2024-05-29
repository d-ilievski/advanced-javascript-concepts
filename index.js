/*
Task Runner with concurrent limit [Javascript]
The problem was to complete the add function for Runner class.
concurrent limit will determine the number of task Runner can run in parallel.
If the concurrent limit is reached by Runner, rest of the tasked should be queued and only to be executed once the first set of task are completed.
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
                console.log('task completed', x);
                resolve();
            }, 2000);
        })
    }
}

runner = new Runner(3);
runner.add(task(2))
runner.add(task(2))
runner.add(task(2))

runner.add(task(4))
runner.add(task(4))
runner.add(task(4))

runner.add(task(6), true)
runner.add(task(6), true)
runner.add(task(6), true)