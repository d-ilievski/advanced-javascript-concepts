/*
    Least Recently Used (LRU) Cache

    Implement an LRU Cache class with get and put methods.
    The cache should have a capacity and should invalidate
    the least recently used item before inserting a new item
    when the capacity is reached.

    Use Case: Caching is a common way to optimize database queries, results from expensive computations, or API calls.
*/

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Map has O(1) access time and keeps the order of the elements
    }

    put(key, value) {

        // make room
        if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }

        // remove it if it exists to add it to the top position later
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // add it to the top position
        this.cache.set(key, value)
    }

    get(key) {
        const value = this.cache.get(key);

        // move it to the top position
        if (value) {
            this.cache.delete(key);
            this.cache.set(key, value);
        }

        return value;
    }
}

const lruCache = new LRUCache(3);

lruCache.put('a', 1);
lruCache.put('b', 2);
lruCache.put('c', 3);
lruCache.get('a');
lruCache.put('d', 4);
lruCache.put('c', 5);
lruCache.put('e', 6);

console.log(lruCache.cache);
