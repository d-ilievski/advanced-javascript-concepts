/*
  Implement an LRU Cache class with get and put methods.
  The cache should have a capacity and should invalidate
  the least recently used item before inserting a new item
  when the capacity is reached.
*/

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Map has O(1) access time and keeps the order of the elements
    }

    put(key, value) {

        if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }

        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value)
    }

    get(key) {
        const value = this.cache.get(key);

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

console.log(Array.from(lruCache.cache.entries()));