
const PROPERTY = Symbol("property")
const ATTRIBUTE = Symbol("attribute")
const EVENT = Symbol("event")
const STATE = Symbol("state")
const METHOD = Symbol("method")

class Tab {
    constructor(element, config){
        this[PROPERTY] = Object.create(null)
        this[ATTRIBUTE] = Object.create(null)
        this[EVENT] = Object.create(null)
        this[STATE] = Object.create(null)
        this[METHOD] = Object.create(null)

        this.root = element;

        // property
        this.position = 0

        // state
        this[STATE].startTransform = 0

        // 监听处理手势
        this[METHOD].handleGesture = () => {
            this.root.addEventListener('mousedown', event => event.preventDefault());

            this.root.addEventListener('pan', event => {
                this.update()
                this.stop()
                console.log('pan')
                // TODO
                for (let child of this.children) {
                    child.style.transition = 'ease 0s'
                    child.style.transform = `translate(${this[STATE].startTransform + event.dx}px)`
                }
            })

            this.root.addEventListener('panend', event => {
                this.update()
                console.log('panend')
                this.position = - (Math.round((this[STATE].startTransform + event.dx) / this.width))

                this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

                for (let child of this.children) {
                    child.style.transition = 'ease 0.5s'
                    child.style.transform = `translate(${ - this.position * this.width}px)`
                }
                this[STATE].startTransform = - this.position * this.width;
            })

            this.root.addEventListener('flick', event => {
                this.update()
                this.stop()
                console.log('flick', event.dx)
                if (event.dx > 0) {
                    this.position = this.position - 1
                }
                if (event.dx < 0) {
                    this.position = this.position + 1
                }

                this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

                for (let child of this.children) {
                    child.style.transition = 'ease 0.5s'
                    child.style.transform = `translate(${ - this.position * this.width}px)`
                }
                this[STATE].startTransform = - this.position * this.width;
            })
        }

        // lifeCycle
        this.created()
        this.render()
        this.appendTo()
        this.mounted()

        if (this[STATE].autoplay) {
            this.play()
        }
    }

    appendTo(element){
        element.appendChild(this.root)
    }

    created(){
        this.root.style = `
            width: 300px;
            height: 300px;
            overflow: hidden;
            white-space: nowrap;
            font-size: 0;
        `
        this.children = Array.prototype.slice.call(this.root.children)

        for (let child of this.children) {
            child.style = `
                width: 100%;
                height: 100%;
                display: inline-block;
            `
        }


        console.log(this.root.children)
    }
    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE].h += 60
            this.root.style.backgroundColor = `hsl(${this[STATE].h}, 60%, 70%)`
        })
    }

    render() {
        console.log('render')
        // this.root.innerHTML = ''

        // for (let i = 0; i < this.imgUrls.length; i++ ) {
        //     const children = document.createElement('div')
        //     children.className = 'slide'
        //     children.style = `
        //         display: inline-block;
        //         transition: ease 0.5s;
        //     `

        //     const img = document.createElement('img')
        //     img.src = this.imgUrls[i]
        //     img.style = `
        //         display: block;
        //         width: 100%;
        //         height: 100%;
        //     `

        //     children.appendChild(img)
        //     this.root.appendChild(children)
        // }

        // this.children = Array.prototype.slice.call(this.root.children)

        enableGesture(this.root)
        this[METHOD].handleGesture()
    }

    update(){
        console.log('update')
    }

    unmounted(){

    }

    next() {
        console.log('next')
        this.stop()

        this.position = this.position + 1

        this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

        for (let child of this.children) {
            child.style.transition = 'ease 0.5s'
            child.style.transform = `translate(${ - this.position * this.width}px)`
        }
        this[STATE].startTransform = - this.position * this.width;
    }
    prev() {
        console.log('prev')
        this.stop()

        this.position = this.position - 1

        this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

        for (let child of this.children) {
            child.style.transition = 'ease 0.5s'
            child.style.transform = `translate(${ - this.position * this.width}px)`
        }
        this[STATE].startTransform = - this.position * this.width;
    }

    play() {
        this[STATE].autoplayTimer = setTimeout(() => {
            this.next()
            this.play()
        }, this[STATE].duration);
    }

    stop() {
        if (this[STATE].autoplayTimer) {
            clearTimeout(this[STATE].autoplayTimer)
            this[STATE].autoplayTimer = null
        }
    }


    log(){
        console.log("width:", this.width)
    }

    getAttribute(name){
        return this[ATTRIBUTE][name]
    }

    setAttribute(name, value){
        if(name == "width") {
            this.width = value
            this.triggerEvent("widthchange")
        }
        return this[ATTRIBUTE][name] = value
    }

    addEventListener(type, listener){
        if(!this[EVENT][type])
            this[EVENT][type] = new Set
        this[EVENT][type].add(listener)
    }

    removeEventListener(type, listener){
        if(!this[EVENT][type])
            return
        this[EVENT][type].delete(listener)
    }

    triggerEvent(type){
        for(let event of this[EVENT][type])
            event.call(this)
    }
}


