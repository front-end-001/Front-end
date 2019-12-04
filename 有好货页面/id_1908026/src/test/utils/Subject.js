class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(val) {
    this.state = val;
    this.notify();
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update();
    });
  }

  attach(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }

  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

const s = new Subject();
const o1 = new Observer('o1', s);

s.setState(2);
