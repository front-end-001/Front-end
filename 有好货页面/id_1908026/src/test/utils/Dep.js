class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null;

class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key];
    // 调用 update 方法更新 Dom
    this.cb(this.value);
  }
}
