/**
 * vue.js
 * 
 * 属性
 * - $el:挂载的dom对象
 * - $data:数据
 * - $options:传入的属性
 * 
 * 方法:
 * - _proxyData 将数据转换成getter/setter形式
 * 
 */

class Vue {

    constructor(options) {
        // 获取传入的对象 默认为空对象
        this.$options = options || {}
        // 获取el (#app)
        this.$el =
            typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 获取data默认为空对象
        this.$data = options.data || {}
        // 调用_proxyData,处理data中的属性
        this._proxyData(this.$data)
        // 使用observe把data中的数据转为响应式并检测数据变化,渲染视图
        new Observer(this.$data)
        // 编译模板,渲染视图
        new Compiler(this)

    }
    // 把data中的属性注册到vue
    _proxyData(data) {
        // 遍历data中的属性 进行数据劫持
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                // 可枚举 可遍历
                enumerable: true,
                // 可配置 (可以使用delete删除 ,可以通过defineProperty重新定义)
                configurable: true,
                // 获取值的时候执行
                get: () => {
                    return data[key]
                },
                // 设置值的时候执行
                set: (newValue) => {
                    // 若新值等于旧值则返回
                    if (newValue === data[key]) {
                        return
                    }
                    this.data[key] = newValue

                }
            })
        })

    }
}
