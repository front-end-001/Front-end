const ListenersSymbol = Symbol('listener');
export class EventBus {
  constructor() {
    this[ListenersSymbol] = Object.create(null);
  }
  listen(observer, eventName, cb) {
    if (!this[ListenersSymbol][eventName]) {
      this[ListenersSymbol][eventName] = [];
    }
    this[ListenersSymbol][eventName].push({
      observer,
      cb
    })
    return observer;
  }
  trigger(eventName, args) {
    const listeners = this[ListenersSymbol][eventName];
    for (let { observer, cb } of listeners || []) {
      cb(observer, eventName, args);
    }
  }
}