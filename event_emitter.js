/*
Implement an EventEmitter class that supports subscribing to named events, emitting events, and unsubscribing from events.
The class should allow multiple subscribers for an event and call each subscriber's callback when an event is emitted.
*/

class Callback {
    constructor(callback, once = false) {
      this.fn = callback;
      this.once = once;
      this.calledTimes = 0;
    }
  
    call() {
      if(this.calledTimes === 0 || !this.once) {
        this.fn();
        this.calledTimes += 1;
      }
      
    }
  }
  
  class EventEmitter {
  
    constructor() {
      this.events = {}
    }
  
    on(eventName, callback) {
      const eventCallbacks = this.events[eventName] || [];
      eventCallbacks.push(new Callback(callback));
      this.events[eventName] = eventCallbacks;
    }
  
    once(eventName, callback) {
      const eventCallbacks = this.events[eventName] || [];
      eventCallbacks.push(new Callback(callback, true));
      this.events[eventName] = eventCallbacks;
    }
  
    off(eventName, callback) {
      const eventCallbacks = this.events[eventName];
      if(eventCallbacks) {
        this.events[eventName] = eventCallbacks.filter(cb => cb.fn !== callback);
        if(!eventCallbacks.length) {
          delete this.events[eventName];
        }
      }
    }
  
    emit(eventName) {
      const eventCallbacks = this.events[eventName];
      if(eventCallbacks?.length) {
        eventCallbacks.forEach(cb => cb.call());
        this.events[eventName] = eventCallbacks.filter(cb => cb.once !== true)
      }
    }
  }
  
  const emitter = new EventEmitter();
  
  emitter.once('CustomEvent', () => {
    console.log('First')
  })
  
  const cb2 = () => {
    console.log('Second')
  }
  emitter.once('CustomEvent', cb2);
  
  // emitter.off('CustomEvent', cb2);
  
  emitter.emit('CustomEvent');
  emitter.emit('CustomEvent');
  emitter.emit('CustomEvent');
  emitter.emit('CustomEvent');