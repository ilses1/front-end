/**
 * dep.js
 * 
 * 功能
 * - 收集观察者
 * - 触发观察者
 * 
 * 属性
 * - subs:Array
 * - target:Watcher
 * 
 * 方法:
 * - addSub(sub):添加观察者
 * - notify():触发观察者的update
 * 
 */

class Dep {

    constructor() {
        // 存储观察者
        this.subs = []
    }
    // 添加观察者
    addSub(sub) {
        // 判断观察者是否存在、是否拥有update且typeof为function
        if (sub && sub.update && typeof sub.update === "function") {
            this.subs.push(sub)
        }
    }
    // 发送通知
    notify() {
        // 触发每个观察者的更新方法
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}