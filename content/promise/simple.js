const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(fn) {
    // 当前状态
    this.state = PENDING;
    // 终值
    this.value = null;
    // 拒因
    this.reason = null;
    // 成功态回调队列
    this.onFulfilledCallbacks = [];
    // 失败态回调队列
    this.onRejectedCallbacks = [];

    // 成功态回调
    const resolve = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.map(cb => {
            this.value = cb(this.value)
          });
        }
      }, 0);
    }
    const reject = reason => {
      setTimeout(() =>{
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.map(cb => {
            this.reason = cb(this.reason)
          })
        }
      })
    }

    try {
      // 执行promise
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled);
    typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
    // 返回this支持then方法可以被同一个promise调用多次
    return this;
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() =>{
    resolve(2);
  },2000)
}).then(res => {
  Console.log(res);
  return res + 1;
}).then(res => {
  Console.log(res);
})