import { myCreate } from '../js/creat.js'
import enable from '../js/gesture.js';
import animation from '../js/animation.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
    constructor() {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
        this.root = document.createElement("div");
        this.root.addEventListener('touchmove', function (e) {
            e.cancelBubble = true
            e.stopImmediatePropagation();
        }, { passive: false })
    }
    updated() {

    }
    mounted() {
        window.onload=()=>{
            this.slide()
        }
    }
    render(){
     
        let imgData = this.STATE_SYMBOL['data'] || []
        return <div class='carousel-content' id='carousel-container'>
            {
                imgData.map(item => (
                    <img src={item}/>
                ))
                 
       }
        </div>
       
    }
    setPropoty(name, value) {
        return this[PROPERTY_SYMBOL][name] = value
    }
    getPropoty(name) {
        return this[PROPERTY_SYMBOL][name]
    }
    setAttribute(name, value) {
        if(name == 'class'){
            return this.root.setAttribute('class',value)
        }
        if (name == 'id') {
            return this.root.setAttribute('id', value)
        }
        if (name == 'data') {
            this.STATE_SYMBOL[name] = value
            this.render().appendTo(this.root)
            return value
        }
        return this.ATTRIBUTE_SYMBOL[name] = value
    }
    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }

    appendTo(element) {
        element.appendChild(this.root)
        this.mounted()
    }
    appendChild(child) {
        child.appendTo(this.root)
        
    }
    slide(){
        this._container = this.root.children[0]
        let position = 0, timer = null, silderArr = Array.prototype.slice.call(this._container.children)
        let width = this._container.getBoundingClientRect().width
        enable(this._container)
        let x = 0
        let dx = null
        this._container.addEventListener('pan', e => {
            if (e.isVertical) return
            clearTimeout(timer)
            timer = null
            position = (silderArr.length + position) % silderArr.length
            let current = silderArr[position]

            let positionNext = (position + 1) % silderArr.length
            let next = silderArr[positionNext]

            let positionLast = (silderArr.length + position - 1) % silderArr.length
            let last = silderArr[positionLast]

            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-width - width * positionLast + e.dx}px)`

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${width - width * positionNext + e.dx}px)`

            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${- width * position + e.dx}px)`
        })
        this._container.addEventListener('panend', e => {

            if (e.isVertical) return
            if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
                if (e.dx > 0) {
                    position = position - 1
                } else if (e.dx < 0) {
                    position = position + 1
                }
            } else {
                position = -(Math.round((x + e.dx) / width));
            }
        
            //position = Math.max(0, Math.min(position, silderArr.length - 1))
             position = (silderArr.length + position) % silderArr.length
            let current = silderArr[position]

            let positionNext = (position + 1) % silderArr.length
            let next = silderArr[positionNext]

            let positionLast = (silderArr.length + position - 1) % silderArr.length
            let last = silderArr[positionLast]
          

            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-width - width * positionLast}px)`

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${width - width * positionNext}px)`

            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${- width * position}px)`
           
        })
    }
}

