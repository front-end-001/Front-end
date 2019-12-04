const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this; // 用于获取正确的 this 对象
  that.state = PENDING; // 状态
  that.value = null; // 终值, 用于保存 resolve 或者 reject 中传入的值
  that.resolvedCallbacks = []; // 解决之后回调
  that.rejectedCallbacks = []; // 拒绝之后回调

  // resolve 函数
  function resolve(value) {
    // 判断传入的值是否为 Promise 类型
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // Promise/A+ 规范: onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
    setTimeout(() => {
      //  Promise/A+ 规范规定只有等待态才可以改变状态
      if (that.state === PENDING) {
        that.state = RESOLVED; // 当前状态更改为对应状态
        that.value = value; // 将传入的值赋值给 value
        that.resolvedCallbacks.map(cb => cb(that.value)); //遍历回调数组并执行
      }
    }, 0);
  }

  // reject 函数
  function reject(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map(cb => cb(that.value));
      }
    }, 0);
  }

  // fn 函数, 可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
  try {
    fn(resolve, reject); // 执行传入的参数并且将之前两个函数当做参数传进去
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let promise2;
  // 判断两个参数是否为函数类型, 提供默认值以实现透传, 类似: Promise.resolve(4).then().then((value) => console.log(value))
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r;
        };

  if (that.state === PENDING) {
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }

  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      // Promise/A+ 规范: 异步调用
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  function resolutionProcedure(promise2, x, resolve, reject) {
    // 规范规定了 x 不能与 promise2 相等
    if (promise2 === x) {
      return reject(new TypeError('Error'));
    }

    if (x instanceof MyPromise) {
      x.then(function(value) {
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    }

    let called = false;
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return;
              called = true;
              resolutionProcedure(promise2, y, resolve, reject);
            },
            e => {
              if (called) return;
              called = true;
              reject(e);
            },
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
};

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise(resolve => {
  console.log('Promise');
  resolve();
})
  .then(function() {
    console.log('promise1');
  })
  .then(function() {
    console.log('promise2');
  });

async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();

console.log('script end');
