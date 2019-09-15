const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
let that = null
export default class Tab {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
        that = this
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");

        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "100%";

        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE_SYMBOL].h = 0;
        this.headerContainer.addEventListener('click', this.itemClick)
        this.BtnArr=[]
        this.position = 0
    }
    mounted() {
        this.enable(this.contentContainer)
        // let width = parseInt(this.contentContainer.parentElement.style.width.slice(0,-2))
        let width = this.contentContainer.getBoundingClientRect().width;
        let silderArr = this.children
        this.position = 0;
        let x = 0
        this.contentContainer.addEventListener('pan', e => {

            if (e.isVertical) return
            //position = (silderArr.length + position) % silderArr.length
            let current = silderArr[this.position].root

            let positionNext = (this.position + 1) % silderArr.length
            let next = silderArr[positionNext].root

            let positionLast = (silderArr.length + this.position - 1) % silderArr.length
            let last = silderArr[positionLast].root

            if (this.position != 0) {
                last.style.transition = 'ease 0s'
                last.style.transform = `translate(${-width - width * this.positionLast + e.dx}px)`
            }

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${width - width * positionNext + e.dx}px)`

            if (this.position != silderArr.length - 1) {
                current.style.transition = 'ease 0s'
                current.style.transform = `translate(${- width * this.position + e.dx}px)`
            }

        })
        this.contentContainer.addEventListener('panend', e => {
            if (e.isVertical) return
            if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
                if (e.dx > 0) {
                    this.position = this.position - 1
                } else if (e.dx < 0) {
                    this.position = this.position + 1
                }
            } else {
                this.position = -(Math.round((x + e.dx) / width));
            }
            this.position = Math.max(0, Math.min(this.position, silderArr.length - 1))
           // this.position = (silderArr.length + position) % silderArr.length
            let current = silderArr[this.position].root

            let positionNext = (this.position + 1) % silderArr.length
            let next = silderArr[positionNext].root

            

            let positionLast = (silderArr.length + this.position - 1) % silderArr.length
            let last = silderArr[positionLast].root

            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-width - width * positionLast}px)`

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${width - width * positionNext}px)`

            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${- width * this.position}px)`
        })
    }
    changePage(){
        console.log(this.position)
        let width = this.contentContainer.getBoundingClientRect().width;
        let silderArr = this.children
     //  this.position = Math.max(0, Math.min(this.position, silderArr.length - 1))
        console.log(this.position)
        // position = (silderArr.length + position) % silderArr.length
        let current = silderArr[this.position].root

        let positionNext = (this.position + 1) % silderArr.length
        let next = silderArr[positionNext].root

        let positionLast = (silderArr.length + this.position - 1) % silderArr.length
        let last = silderArr[positionLast].root

        last.style.transition = 'ease 0s'
        last.style.transform = `translate(${-width - width * positionLast}px)`

        next.style.transition = 'ease 0s'
        next.style.transform = `translate(${width - width * positionNext}px)`

        current.style.transition = 'ease 0s'
        current.style.transform = `translate(${- width * this.position}px)`
    }
    unmounted() {

    }
    update() {

    }
    appendChild(child) {
        this.children.push(child);
        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);
        
        let header = document.createElement("div");
        header.innerText = title;
        this.headerContainer.appendChild(header);
        header.style.display = 'inline-block'
        header.style.whiteSpace = "nowrap";
        header.style.height = 0.50 + 'rem'
        header.style.fontSize = 0.36 + 'rem'
        header.setAttribute('data-name', title)
        this.BtnArr.push(header)

        child.appendTo(this.contentContainer);
        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }
    }
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    itemClick(e){
        switch (e.target.dataset.name){
            case '推荐':
                that.position = 0
            break;
            case '有趣的店':
                that.position = 1
                 break;
            case '品牌新店':
                that.position = 2
                console.log(that.position)
                break;
        }  
        that.changePage()
    }
    // addEventListener(type, listener) {
    //     if (!this[EVENT_SYMBOL][type])
    //         this[EVENT_SYMBOL][type] = new Set;
    //     this[EVENT_SYMBOL][type].add(listener);
    // }
    // removeEventListener(type, listener) {
    //     if (!this[EVENT_SYMBOL][type])
    //         return;
    //     this[EVENT_SYMBOL][type].delete(listener);
    // }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
    enable(circle) {
        let start = (point, context) => {
            context.startX = point.clientX
            context.startY = point.clientY
            context.isTap = true
            context.isPan = false
            context.startTime = Date.now()

            context.isPress = false

            context.pressHandler = setTimeout(() => {
                context.isPress = true;
                context.isTap = false;
                let e = new Event("pressstart");
                circle.dispatchEvent(e);
                context.pressHandler = null;
            }, 500)

        }
        let move = (point, context) => {
            let dx = point.clientX - context.startX
            let dy = point.clientY - context.startY
            if (dx * dx + dy * dy > 100) {
                if (context.pressHandler !== null) {
                    clearTimeout(context.pressHandler);
                    context.pressHandler = null;
                    context.isPress = false;
                } else if (context.isPress) {
                    context.isPress = false;
                    let e = new Event("presscancel");
                    circle.dispatchEvent(e);
                }

                context.isTap = false

                if (context.isPan == false) {
                    //.log(point.clientX, dy)
                    if (Math.abs(dx) > Math.abs(dy)) {
                        context.isVertical = false
                        context.isHorizontal = true
                    } else {
                        context.isVertical = true
                        context.isHorizontal = false
                    }
                    let e = new Event('panstart')
                    e.startX = point.clientX
                    e.startY = point.clientY
                    circle.dispatchEvent(e)
                    context.isPan = true
                }
            }
            if (context.isPan) {
                let e = new Event('pan')
                e.dx = dx
                e.dy = dy
                e.isVertical = context.isVertical
                e.isHorizontal = context.isHorizontal
                circle.dispatchEvent(e)
            }

            context.dx = dx
            context.dy = dy
        }
        let end = (point, context) => {
            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
            }
            if (context.isPress) {
                let e = new Event("pressend");
                circle.dispatchEvent(e);
            }
            if (context.isTap) {
                // console.log('tap')
                let e = new Event('tap')
                circle.dispatchEvent(e)
            }
            let dx = point.clientX - context.startX
            let dy = point.clientY - context.startY
            let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
            if (context.isPan && v > 0.3) {
                context.isFlick = true
                let e = new Event('Flick')
                e.dx = dx
                e.dy = dy
                circle.dispatchEvent(e)
            } else {
                context.isFlick = false
            }
            if (context.isPan) {
                // console.log('pan')
                let dx = point.clientX - context.startX, dy = point.clientY - context.startY
                let e = new Event('panend')
                e.dx = dx
                e.dy = dy
                e.isFlick = context.isFlick
                e.isVertical = context.isVertical
                e.isHorizontal = context.isHorizontal
                circle.dispatchEvent(e)
            }

        }
        let cancle = (point, context) => {
            if (context.isPan) {
                let e = new Event("pancancel");
                circle.dispatchEvent(e);
            }
            if (context.isPress) {
                let e = new Event("presscancel");
                circle.dispatchEvent(e);
            }
            if (context.pressHandler !== null) {
                let e = new Event("pancancel");
                circle.dispatchEvent(e);
                clearTimeout(context.pressHandler);
            }
        }

        let contexts = Object.create(null)
        let mouseSymbol = Symbol('mouse')
        let mousedown = event => {
            event.preventDefault();
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            contexts[mouseSymbol] = Object.create(null)
            start(event, contexts[mouseSymbol])
        }
        let mousemove = event => {
            event.preventDefault();
            move(event, contexts[mouseSymbol])
        }
        let mouseup = event => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
            end(event, contexts[mouseSymbol])
            delete contexts[mouseSymbol]
        }


        let touchstart = event => {
            for (let touche of event.changedTouches) {
                contexts[touche.identifier] = Object.create(null)
                start(touche, contexts[touche.identifier])
            }

        }
        let touchmove = event => {
            for (let touche of event.changedTouches) {
                move(touche, contexts[touche.identifier])
            }
        }
        let touchend = event => {
            for (let touche of event.changedTouches) {
                end(touche, contexts[touche.identifier])
                delete contexts[touche.identifier]
            }

        }
        let touchcancel = event => {
            for (let touche of event.changedTouches) {
                cancel(touche, contexts[touche.identifier])
                delete contexts[touche.identifier]
            }
        }

        circle.addEventListener('mousedown', mousedown)
        circle.addEventListener('touchstart', touchstart)
        circle.addEventListener('touchmove', touchmove, { passive: false })
        circle.addEventListener('touchend', touchend)
        circle.addEventListener('touchcancel', touchcancel)
    }
}

