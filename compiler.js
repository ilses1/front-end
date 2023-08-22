/**
 * compiler.js
 *
 * 功能
 * - 编译模板，解析指令/插值表达式
 * - 负责页面的首次渲染
 * - 数据变化后，重新渲染视图
 *
 * 属性
 * - el -app元素
 * - vm -vue实例
 *
 * 方法：
 * - compile(el) -编译入口
 * - compileElement(node) -编译元素（指令）
 * - compileText(node) 编译文本（插值）
 * - isDirective(attrName) -（判断是否为指令）
 * - isTextNode(node) -（判断是否为文本节点）
 * - isElementNode(node) - （判断是否问元素节点）
 */

class Compiler {


    constructor(vm) {
        // 获取vm
        this.vm = vm
        // 获取el
        this.el = vm.$el
        // 编译模板,渲染视图
        this.compile(this.el)
    }

    // 1.编译模板渲染视图
    compile(el) {
        // 不存在则返回
        if (!el) {
            return
        }
        // 获取子节点
        const nodes = el.childNodes;
        // 收集
        Array.from(nodes).forEach((node) => {
            // 文本类型节点的编译
            if (this.isTextNode(node)) {
                // 编译文本节点
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 编译元素节点
                this.compileElement(node)
            }
            // 判断是否还存在子节点
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }

        })



    }

    //2. 添加指令方法并且执行
    update(node, value, attrName, key) {
        // 定义响应的方法
        const updateFn = this[`${attrName}Updater`]
        // 若存在则调用
        updateFn && updateFn.call(this, node, value, key)
    }

    // 3.用来处理v-text
    textUpdater(node, value, key) {
        node.textContent = value
    }

    // 4.用来处理v-model
    modelUpdater(node, value, key) {
        node.value = value;
        // 用来实现双向数据绑定
        node.addEventListener('input', (e) => {
            this.vm[key] = node.value
        })
    }


    // 5.编译元素节点

    // 6.编译文本节点


    // 7.判断元素的属性是否是vue指令
    isDirective(attrName) {
        return attrName && attrName.startWith('v-')
    }

    // 8.判断是否是文本节点
    isTextNode(node) {
        return node && node.nodeType === 3
    }

    // 9.判断是否是元素节点
    isElementNode(node) {
        return node && node.nodeType === 1
    }

}
