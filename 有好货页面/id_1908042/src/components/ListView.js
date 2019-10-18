const ATTRIBUTE_SYMBOL = Symbol('attribute')
const PROPERTY_SYMBOL = Symbol('property')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class ListView {
    constructor(config = {}) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []

        this.created()
    }

    get children() {
        return this[PROPERTY_SYMBOL].children
    }

    created() {
        this.root = document.createElement('div')
        this.root.classList.add('list-view')

        this.render().appendTo(this.root)
    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]['data'] || []
        return <div>
            {
                data.map(item =>
                    <div class='item-block'>
                        <div class='item-header'>
                            <div class='header-logo'>
                                <img src={item.logo} alt="" />
                            </div>
                            <div class='header-content'>
                                <div class='shop-title'>极客时间旗舰店</div>
                                <div class='shop-labels'>
                                    <span class='label-tianmao'>天猫</span>
                                </div>
                            </div>
                            <div class='header-right'>
                                <a href="#" class="btn btn-primary">进店&gt;</a>
                            </div>
                        </div>
                        <div class='item-body'>
                            <div class='item-tip'>
                                <span></span>
                                好店君：该店已被1.3万人关注，快来关注吧！
                            </div>
                            <div class='item-goods'>
                                <div class='goods-item big'>
                                    <img src={item.goods[0]} alt="" />
                                </div>
                                <div class='item-goods-double'>
                                    <div class='goods-item'>
                                        <div class='goods-item'>
                                            <img src={item.goods[1]} alt="" />
                                        </div>
                                    </div>
                                    <div class='goods-item'>
                                        <img src={item.goods[2]} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    }

    getAttribute(name) {
        if (name === 'style') this.root.getAttribute('style')
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name === 'style') this.root.setAttribute('style', value)
        if (name === 'data') {
            this[PROPERTY_SYMBOL][name] = this[ATTRIBUTE_SYMBOL][name] = value
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }

        return this[PROPERTY_SYMBOL][name] = this[ATTRIBUTE_SYMBOL][name] = value
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set()
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) return
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type]) return
        for (let event of this[EVENT_SYMBOL][type]) event.call(this)
    }
}