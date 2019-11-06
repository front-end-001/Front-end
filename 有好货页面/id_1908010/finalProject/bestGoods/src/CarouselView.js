import Component from './BaseComponent'
import {enableGesture} from '../lib/gesture.js'
import Fragment from './Fragment';
// 为什么 每个自己写的组件都要加这行代码
import {create} from '../lib/create'
import ImageView from './ImageView.js'
import TimeLine from '../lib/timeline.js'
import {NumberAnimation} from '../lib/animation'
import {ease} from '../lib/cubicBezier'
import "./CarouselView.scss"

const ANIMATION_DURATION = 500;
export default class CarouselView extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.property.children = []
        this.property.timeLine = new TimeLine();
        this.state.position = 0
        this.state.startX = 0
        // 同时开手势和轮播时，当图片被手势捕捉移动后, 时间偏移量
        this.state.offsetTimeStart = 0;
        // 同时开手势和轮播时，当图片被手势捕捉移动后，计算的偏移量
        this.state.offset = 0;
        this.didCreate()

    }

    didCreate(){
        let content = this.render();
        if (!content) return;
        content.appendTo(this.root)
        this.property.children = content.children
        enableGesture(this.root);

        // this.root.addEventListener('mousedown', event => {
        //     this.property.timeLine.pause();
        //     clearTimeout(this.nextPicTimer)
        //     // this.nextPicTimer = null
        //     // 静止和动的时候不一样
        //     let currentTime = Date.now();
        //     if (currentTime - this.state.offsetTimeStart < ANIMATION_DURATION) {
        //         this.state.offset = rootWidth - ease((currentTime - this.state.offsetTimeStart)/ANIMATION_DURATION) * rootWidth;
        //         console.log(this.state.offset)
        //     } else {
        //         this.state.offset = 0;
        //     }
        // })


        this.root.addEventListener("touchstart", event => {
            this.property.timeLine.pause();
            // this.nextPicTimer = null
            // 静止和动的时候不一样
            let currentTime = Date.now();
            let duration = currentTime - this.state.offsetTimeStart

            console.log("currentTime - this.state.offsetTimeStart",duration)
            if (duration < ANIMATION_DURATION) {
                this.state.offset = rootWidth - ease((duration)/ANIMATION_DURATION) * rootWidth;
                console.log(this.state.offset)
            } else {
                this.state.offset = 0;
            }
            clearTimeout(this.nextPicTimer)
        })

        this.root.addEventListener("touchend", event => {
            console.log('touchend')
            this.property.timeLine.resume();
        })
        this.enablePan();
        this.enableCarousel();
    }

    enablePan() {
        let rootWidth = window.screen.width - 32;
        let size = this.property.children.length;

        this.root.addEventListener('pan', event => {
            if (!event.isVertical) {
                event.origin.cancelBubble = true;
                event.stopImmediatePropagation();
                let current = this.property.children[this.state.position].root;
                let prevPos = (this.state.position - 1 + size) % size;
                let prev = this.property.children[prevPos].root;
                let nextPos = (this.state.position + 1) % size;
                let next = this.property.children[nextPos].root;

                console.log(this.state.offset)

                prev.style.transition = "ease 0s";
                prev.style.transform = `translate(${-rootWidth - rootWidth * prevPos + event.dx + this.state.offset}px)`;
                next.style.transition = "ease 0s";
                next.style.transform = `translate(${rootWidth - rootWidth * nextPos + event.dx + this.state.offset}px)`;
                current.style.transition = "ease 0s";
                current.style.transform = `translate(${-rootWidth * this.state.position + event.dx + this.state.offset}px)`;
            }
            else {
                event.origin.cancelBubble = false;
                return;
            }
        });
        this.root.addEventListener("panend", event => {
            if (!event.isVertical) {
                event.origin.cancelBubble = true;
                event.stopImmediatePropagation();
                let isLeft;
                if (event.isFlick) {
                    this.state.position = event.dx > 0 ? this.state.position - 1 : this.state.position + 1;
                    isLeft = event.dx < 0;
                }
                else {
                    if (event.dx > rootWidth / 2) {
                        this.state.position--;
                        isLeft = false;
                    }
                    else if (event.dx < -rootWidth / 2) {
                        this.state.position++;
                        isLeft = true;
                    }
                    else if (event.dx > 0) {
                        isLeft = false;
                    }
                    else {
                        isLeft = true;
                    }
                }
                // this.state.position = Math.max(0, Math.min(this.state.position, this.property.children.length - 1))
                this.state.position = (size + this.state.position) % size;
                let current = this.property.children[this.state.position].root;
                // 拖拽和轮播不一样的地方是 拖拽可以向前也可以向后 所以就需要定位 prev和next、
                let prevPos = (size + this.state.position - 1) % size;
                let prev = this.property.children[prevPos].root;
                let nextPos = (this.state.position + 1) % size;
                let next = this.property.children[nextPos].root;

                if (!isLeft) {
                    prev.style.transition = "";
                } else {
                    prev.style.transition = "ease 0s";
                    console.log("prev none")
                }
                prev.style.transform = `translate(${-rootWidth - rootWidth * prevPos}px)`;
                if (isLeft) {
                    next.style.transition = "";
                } else {
                    next.style.transition = "ease 0s";
                    console.log("next none")
                }
                next.style.transform = `translate(${rootWidth - rootWidth * nextPos}px)`;
                current.style.transition = "";
                current.style.transform = `translate(${-rootWidth * this.state.position}px)`;
            }
            else {
                event.origin.cancelBubble = false;
                return;
            }
        });
    }

    enableCarousel() {
        let rootWidth = window.screen.width - 32;
        let size = this.property.children.length;
        this.state.position = 0;
        let nextPicture = () => {
            let nextPosition = this.state.position + 1;
            nextPosition = nextPosition % size;
            // console.log(nextPosition)
            let current = this.property.children[this.state.position].root,
                next = this.property.children[nextPosition].root;

            this.state.offsetTimeStart = Date.now()

            // next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            this.property.timeLine.addAnimation(new NumberAnimation({
                element: current,
                property: 'transform',
                startTime: 0,
                startValue: - rootWidth * this.state.position,
                endTime: ANIMATION_DURATION,
                endValue: -rootWidth - rootWidth * this.state.position,
                converter: (v) => `translateX(${v}px)`
            }))

            this.property.timeLine.addAnimation(new NumberAnimation({
                element: next, 
                property: 'transform',
                startTime: 0,
                startValue: rootWidth - rootWidth * nextPosition,
                endTime: ANIMATION_DURATION,
                endValue: - rootWidth * nextPosition,
                converter: (v) => `translateX(${v}px)`
            }))

            this.property.timeLine.start();
            this.state.position = nextPosition

            // setTimeout(() => {
            //     //小技巧 这里置空之后，css的属性就会生效
            //     current.style.transition = "";               
            //     next.style.transition = "";

            //     current.style.transform = `translate(${-100 - 100 * nextPosition}%)`;
            //     next.style.transform = `translate(${-100*nextPosition}%)`

            //     this.state.position = nextPosition
            // }, 16.66);

            this.nextPicTimer = setTimeout(nextPicture, 3000);
        }   
        this.nextPicTimer = setTimeout(nextPicture, 3000);
    }

    render() {
        let data = this.property['data'] || ""
        if(!data) return null;

        return (
            <div style="overflow: hidden;">
                {data.map(item => (
                    <ImageView 
                        className="carouselItem" 
                        src={item.image} 
                        width="100%" 
                        height="100%"
                        // style="display: inline-block;border-radius: 18px;transition: ease 0.5s;"
                        >
                    </ImageView>
                ))}
            </div>
        )
    }

    setAttribute(name, value) {
        if (name == "className") {
            return this.root.className = value
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "";
            return this.didCreate()
        }
        return this.property[name] = value;
    }

    getAttribute(name) {
        if (name == 'className') {
            return this.root.className
        }
        return this.property[name];

    }
}