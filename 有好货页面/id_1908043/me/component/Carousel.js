import enableGesture from '../gesture';
import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'

function stopPropagation(event) {
    event.stopPropagation();
}

function forbidTouchEvent(target) {
    if (!target) { return; }
    target.addEventListener('touchstart', stopPropagation);
    target.addEventListener('touchmove', stopPropagation);
    target.addEventListener('touchend', stopPropagation);
    target.addEventListener('touchcancel', stopPropagation);
}

export default class Carousel extends BaseComponent {
    created(){
        this.root = document.createElement("div")
        this.root.style = `
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            height: 200px;
            font-size: 0;
        `
        // this.root.style.width = this.width + 'px'
        // this.root.style.height = this.height + 'px'
    }

    mounted(){
        this.imgUrls = this[ATTRIBUTE].data // 图片地址
        const config = this[ATTRIBUTE].config || {}
        this.position = 0

        // state
        this[STATE].startTransform = 0
        this[STATE].loop = config.loop || false // 是否可以循环
        this[STATE].autoplay = config.autoplay || true // 是否自动播放
        this[STATE].duration = config.duration || 3000 // 播放间隔
        this[STATE].autoplayTimer = null // 自动播放延时器


        // 监听处理手势
        this.handleGesture = () => {
            this.root.addEventListener('mousedown', event => event.preventDefault());

            this.root.addEventListener('pan', event => {
                this.update()
                this.stop()
                console.log('pan')
                for (let child of this.child) {
                    child.style.transition = 'ease 0s'
                    child.style.transform = `translate(${this[STATE].startTransform + event.dx}px)`
                }
            })

            this.root.addEventListener('panend', event => {
                this.update()
                console.log('panend')
                this.position = - (Math.round((this[STATE].startTransform + event.dx) / this.width))

                this.position = Math.max(0, Math.min(this.position, this.child.length - 1))

                for (let child of this.child) {
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

                this.position = Math.max(0, Math.min(this.position, this.child.length - 1))

                for (let child of this.child) {
                    child.style.transition = 'ease 0.5s'
                    child.style.transform = `translate(${ - this.position * this.width}px)`
                }
                this[STATE].startTransform = - this.position * this.width;
            })
            forbidTouchEvent(this.root);
        }
        this.render()
        if (this[STATE].autoplay) {
            this.play()
        }
    }

    render() {
        this.root.innerHTML = ''

        for (let i = 0; i < this.imgUrls.length; i++ ) {
            const children = document.createElement('div')
            children.className = 'slide'
            children.style = `
                display: inline-block;
                transition: ease 0.5s;
            `

            const img = document.createElement('img')
            img.src = this.imgUrls[i]
            img.style = `
                display: block;
                width: 100%;
                height: 100%;
            `

            children.appendChild(img)
            this.root.appendChild(children)
        }
        this.child = Array.prototype.slice.call(this.root.children)
        // debugger
        enableGesture(this.root)
        this.handleGesture()
    }

    get width() {
        return this.root.getBoundingClientRect().width
    }
    
    next() {
        console.log('next')
        this.stop()

        this.position = this.position + 1

        this.position = Math.max(0, Math.min(this.position, this.child.length - 1))

        for (let child of this.child) {
            child.style.transition = 'ease 0.5s'
            child.style.transform = `translate(${ - this.position * this.width}px)`
        }
        this[STATE].startTransform = - this.position * this.width;
    }
    prev() {
        console.log('prev')
        this.stop()

        this.position = this.position - 1

        this.position = Math.max(0, Math.min(this.position, this.child.length - 1))

        for (let child of this.child) {
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
}