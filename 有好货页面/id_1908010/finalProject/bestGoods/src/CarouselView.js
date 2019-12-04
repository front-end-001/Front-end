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
        this.property.dotChildren = [];
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
        this.property.children = content.children.slice(0, content.children.length-1)
        this.property.dotChildren = content.children[content.children.length - 1].children;
        this.property.dotChildren[0].root.className = "dotItem dotActive";
        this.rootWidth = window.screen.width - 32;
        this.size = this.property.children.length;


        for (let d in this.property.children) {
            let child = this.property.children[d].root
            // 初始化每个元素的transform, 这样自动轮播状态下元素的初始值就不会有tranform为undefined了

            child.style.transform = `translate(${parseInt(d)*this.rootWidth}px)`;
        }
        

        enableGesture(this.root);

        this.enablePan();
        this.enableCarousel();
    }

    stopAnimation() {
        this.property.timeLine.stop();
        clearTimeout(this.nextPicTimer)
        clearTimeout(this.restartTimer)
        this.nextPicTimer = null;
        this.restartTimer = null;
    }

    restartAnimation() {
        if (!this.restartTimer) {
            this.restartTimer = setTimeout(()=> this.enableCarousel(), ANIMATION_DURATION);
        } else {
            return;
        }
    }

    updateDotsActive() {
        for (let i = 0; i < this.property.dotChildren.length; i++) {
            let dot = this.property.dotChildren[i].root
            if (i == this.state.position) {
                dot.className = "dotItem dotActive"
            } else {
                dot.className = "dotItem"
            }
        }
    }

    enablePan() {
        this.root.addEventListener('pan', event => {
            if (!event.isVertical) {
                event.origin.stopPropagation();
                event.stopImmediatePropagation();
                this.stopAnimation()

                let current = this.property.children[this.state.position].root;
                let prevPos = (this.state.position - 1 + this.size) % this.size;
                let prev = this.property.children[prevPos].root;
                let nextPos = (this.state.position + 1) % this.size;
                let next = this.property.children[nextPos].root;

                prev.style.transition = "ease 0s";
                prev.style.transform = `translate(${-this.rootWidth * (1 + prevPos) + event.dx + this.state.offset}px)`;
                next.style.transition = "ease 0s";
                next.style.transform = `translate(${this.rootWidth - this.rootWidth * nextPos + event.dx + this.state.offset}px)`;
                current.style.transition = "ease 0s";
                current.style.transform = `translate(${-this.rootWidth * this.state.position + event.dx + this.state.offset}px)`;
            }else {
                event.origin.cancelBubble = false;
                return;
            }
        });
        this.root.addEventListener("panend", event => {
            if (!event.isVertical) {
                event.origin.cancelBubble = true;
                event.cancelBubble = true;
                event.stopImmediatePropagation();

                if (event.isFlick) {
                    this.state.position = event.dx > 0 ? this.state.position - 1 : this.state.position + 1;
                } else {
                    let pos = this.state.position;
                    pos = event.dx > this.rootWidth / 2 ? pos - 1 : event.dx < -this.rootWidth / 2 ? pos + 1: pos
                    this.state.position = pos;
                }
                // this.state.position = Math.max(0, Math.min(this.state.position, this.property.children.length - 1))
                this.state.position = (this.size + this.state.position) % this.size;
                let current = this.property.children[this.state.position].root;
                // 拖拽和轮播不一样的地方是 拖拽可以向前也可以向后 所以就需要定位 prev和next、
                let prevPos = (this.size + this.state.position - 1) % this.size;
                let prev = this.property.children[prevPos].root;
                let nextPos = (this.state.position + 1) % this.size;
                let next = this.property.children[nextPos].root;

                let animation_duration = `ease ${ANIMATION_DURATION/1000}s`
                if (event.dx < -this.rootWidth/2 || (event.isFlick && event.dx < 0)) {
                    // 向左 移动超过 this.rootWidth/2

                    // 向左 prev 不可见
                    prev.style.transition = animation_duration
                    current.style.transition = animation_duration

                     // 向左移动 next 滑动距离 > this.rootWidth/2, next 即将可见， prev 要绕后移到next右边
                     next.style.zIndex = 30
                     prev.style.zIndex = 20
                     current.style.zIndex = 20
                    
                } else if (event.dx > this.rootWidth/2 || (event.isFlick && event.dx > 0)) {
                    // 向右 移动超过 this.rootWidth/2
                    // 向右 next 不可见
                    next.style.transition = animation_duration
                    current.style.transition = animation_duration
                    // 向右移动 prev 滑动距离 > this.rootWidth/2, prev 即将可见， next 要绕后移到prev左边
                    prev.style.zIndex = 30
                    next.style.zIndex = 20
                    current.style.zIndex = 20
                } else if (event.dx < 0) {
                    // 向左 移动 但距离小于 this.rootWidth/2
                    // 向左 next滑动距离 小于 this.rootWidth/2
                    next.style.transition = animation_duration
                    current.style.transition = animation_duration
                } else {
                    // 向右 移动 但距离小于 this.rootWidth/2
                    // 向右 prev 滑动距离 小于 this.rootWidth/2
                    prev.style.transition = animation_duration
                    current.style.transition = animation_duration
                }

                prev.style.transform = `translate(${-this.rootWidth - this.rootWidth * prevPos}px)`;
                next.style.transform = `translate(${this.rootWidth - this.rootWidth * nextPos}px)`;
                current.style.transform = `translate(${-this.rootWidth * this.state.position}px)`;

                this.updateDotsActive()
                this.restartAnimation()
            }
            else {
                event.origin.cancelBubble = false;
                return;
            }
        });
    }

    enableCarousel() {
        // this.state.position = 0;
        this.nextPicture = () => {
            this.state.offsetTimeStart = Date.now()
            // console.log(this.property.timeLine.animations)

            this.property.timeLine.clear();
            let current = this.property.children[this.state.position].root;
            let nextPosition = (this.state.position + 1) % this.size;
            let next = this.property.children[nextPosition].root;
            let prevPosition = (this.state.position - 1 + this.size) % this.size;
            let prev = this.property.children[prevPosition].root;

            // 关键逻辑 当手势引入时，this.state.position 会改变，这时，初始状态下各个元素的transform会发生改变，这里进行重置！
            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${0}px)`;
            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${this.rootWidth}px)`
            prev.style.transition = 'ease 0s'
            prev.style.transform = `translate(${this.rootWidth + this.rootWidth}px)`

            // current.style.zIndex = 20
            // next.style.zIndex = 30
            // prev.style.zIndex = 20

            if (prevPosition == 0) {
                this.property.timeLine.addAnimation(new NumberAnimation({
                    element: prev,
                    property: 'transform',
                    startTime: 0,
                    startValue: this.rootWidth * prevPosition,
                    endTime: ANIMATION_DURATION,
                    endValue: this.rootWidth * prevPosition + this.rootWidth + this.rootWidth,
                    transitMethod: ease,
                    converter: (v) => `translateX(${v}px)`
                }));
            } else {
                this.property.timeLine.addAnimation(new NumberAnimation({
                    element: prev,
                    property: 'transform',
                    startTime: 0,
                    startValue: this.rootWidth * prevPosition,
                    endTime: ANIMATION_DURATION,
                    endValue: this.rootWidth * prevPosition -this.rootWidth,
                    transitMethod: ease,
                    converter: (v) => `translateX(${v}px)`
                }));
            }


            this.property.timeLine.addAnimation(new NumberAnimation({
                element: current,
                property: 'transform',
                startTime: 0,
                startValue: - this.rootWidth * this.state.position,
                endTime: ANIMATION_DURATION,
                endValue: -this.rootWidth - this.rootWidth * this.state.position,
                transitMethod: ease,
                converter: (v) => `translateX(${v}px)`
            }))

            this.property.timeLine.addAnimation(new NumberAnimation({
                element: next, 
                property: 'transform',
                startTime: 0,
                startValue: this.rootWidth - this.rootWidth * nextPosition,
                endTime: ANIMATION_DURATION,
                endValue: - this.rootWidth * nextPosition,
                transitMethod: ease,
                converter: (v) => `translateX(${v}px)`
            }))

            this.property.timeLine.start();
            this.state.position = nextPosition
            this.updateDotsActive()

            this.nextPicTimer = setTimeout(this.nextPicture, 3000);
        }   
        this.nextPicTimer = setTimeout(this.nextPicture, 3000);
    }

    render() {
        let data = this.property['data'] || ""
        if(!data) return null;
        let dots = (
            <div className="dotsContainer">
                {data.map(item => (
                    <div className="dotItem"></div>
                ))}
            </div>
        )

        return (
            <div style="overflow: hidden;position: relative;width: 343px; height: 167px;">
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
                {dots}
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