const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')

export default class Shop {
    constructor () {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)

        this[PROPERTY_SYMBOL].children = []

        this.created()
    }
    created () {
        this.root = document.createElement('div')
        this.root.style = 'padding: 0 15px 15px;background-color:white;border-radius:10px;margin: 0 12px 12px;'
        let header = document.createElement('div')
        header.style = `padding:15px 0;display:flex;align-items:center`

        let headerLeft = document.createElement('div')
        headerLeft.style = 'flex:1;display:flex'
        this.logo = document.createElement('img')
        this.logo.style = 'display:inline-block;width:53px;height:53px;border-radius:53px;overflow:hidden;background:#f3f3f3;margin-right:7px;'
        let nameContainer = document.createElement('div')
        this.storeType = document.createElement('div')
        this.storeType.innerText = '天猫'
        this.storeType.style = 'display:inline-block;background-color:#ee0507;color:white;font-size:12px;text-align:center;height:18px;padding: 0 5px;border-radius:18px;'
        this.storeName = document.createElement('h4')
        this.storeName.style = 'color:#333;font-size:20px;'
        nameContainer.appendChild(this.storeName)
        nameContainer.appendChild(this.storeType)

        headerLeft.appendChild(this.logo)
        headerLeft.appendChild(nameContainer)
        header.appendChild(headerLeft)

        let storeLink = document.createElement('a')
        storeLink.innerText = '进店'
        storeLink.style = 'text-align:center;line-height:36px;display:inline-block;width:80px;height:36px;border-radius:36px;color:white;background-image: linear-gradient(to right , #fec900, #ffad00);'
        header.appendChild(storeLink)
        this.root.appendChild(header)

        /* message */
        let msgContainer = document.createElement('div')
        let storeIcon = document.createElement('img')
        let msgText = document.createElement('div')
        msgContainer.style = 'display:flex;padding:10px;background-color:#f5f5f5;font-size: 12px;border-radius: 8px;'
        msgText.innerText = '好点君：该店已被1.3万人关注，快来关注吧！'
        msgContainer.appendChild(storeIcon)
        msgContainer.appendChild(msgText)
        this.root.appendChild(msgContainer)
        /* 图片容器 */
        let imagesContainer = document.createElement('div')
        let largeImageContainer = document.createElement('div')
        let smallImageContainer = document.createElement('div')
        let smallImageFirstContainer = document.createElement('div')
        let smallImageSecondContainer = document.createElement('div')
        imagesContainer.style = 'display: flex;margin-top:10px;'
        smallImageFirstContainer.style = 'display:flex;flex:1;background:#f5f5f5;border-radius: 8px;margin-bottom:3px;'
        smallImageSecondContainer.style = 'display:flex;flex:1;;background:#f5f5f5;border-radius: 8px;margin-top:3px;'
        smallImageContainer.style = 'display:flex;flex:1;flex-direction:column;justify-content:space-between'
        smallImageContainer.appendChild(smallImageFirstContainer)
        smallImageContainer.appendChild(smallImageSecondContainer)
        largeImageContainer.style = 'margin-right: 5px;background:#f3f3f3;display:flex;flex:2;border-radius:10px;height:210px;'
        imagesContainer.appendChild(largeImageContainer)
        imagesContainer.appendChild(smallImageContainer)
        this.root.appendChild(imagesContainer)

        /* 相似好店 */
        let footer = document.createElement('div')
        let footerLink = document.createElement('a')
        footerLink.style = 'color:#888'
        footer.style = 'padding: 10px 0;text-align:right'
        footerLink.innerText = '相似好店'
        footer.appendChild(footerLink)
        this.root.appendChild(footer)

        console.log('created')
    }
    mounted() {
        this.storeName.innerText = this[ATTRIBUTE_SYMBOL]['storeName']
    }
    unmounted () {}
    update () {}
    appendTo (element) {
        element.appendChild(this.root)
        this.mounted()
    }
    get children () {
        return this[PROPERTY_SYMBOL].children
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute (name , value) {
        if (name === 'style') {
            this.root.setAttribute('style', value)
        }
        this[ATTRIBUTE_SYMBOL][name] = value
        console.log('setAttribute')
    }
    appendChild (child) {
        this.children.push(child)
        child.appendChild(this.root)
    }
    addEventListener (type, listener) {
        if (this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set()
            this[EVENT_SYMBOL][type].add(listener)
        }
        this[EVENT_SYMBOL][type] = listener
    }
    removeEventListener (type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }
        this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent (type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}
