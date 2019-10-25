import { Timeline } from "./animation.js"
import { DOMElementStyleNumberAnimation } from "./animation.js"
import enableGesture from "./gesture.js"
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL]['properties'] = new Map([
            ['duration', 3000],
            ['transitMethod', 'ease'],
            ['transitionDuration', 500],
            ['elementWidth',500]
        ]);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this[PROPERTY_SYMBOL]['root']);
        this.mounted();
    }

    created() {
        this[PROPERTY_SYMBOL]['properties'].forEach((value, key) => {
            this[PROPERTY_SYMBOL][key] = value;
            this[ATTRIBUTE_SYMBOL][key] = value;
        });
        this[PROPERTY_SYMBOL]['root'] = document.createElement("div");
        this[STATE_SYMBOL]['headerContainer'] = document.createElement("div");
        this[STATE_SYMBOL]['contentContainer'] = document.createElement("div");
        this[STATE_SYMBOL]['contentContainer'].style.whiteSpace = "nowrap";
        this[STATE_SYMBOL]['contentContainer'].style.overflow = "hidden";
        this[STATE_SYMBOL]['contentContainer'].style.height = "100%";
        this[STATE_SYMBOL]['contentContainer'].style.flex = "1";
        this[STATE_SYMBOL]['headerContainer'].style.height = "93px";
        this[PROPERTY_SYMBOL]['root'].appendChild(this[STATE_SYMBOL]['headerContainer']);
        this[PROPERTY_SYMBOL]['root'].appendChild(this[STATE_SYMBOL]['contentContainer']);
        this[STATE_SYMBOL].h = 0;
    }
    mounted() {
        enableGesture(this[STATE_SYMBOL]['contentContainer']);
        enableGesture(this[STATE_SYMBOL]['headerContainer']);
        let tl = new Timeline();
        let position = 0;
        let children = Array.prototype.slice.call(this[STATE_SYMBOL]['contentContainer'].children);
        let dots = Array.prototype.slice.call(this[STATE_SYMBOL]['headerContainer'].children);
        let offsetTimeStart = null;
        let offset = null;
        let currentTime = null;
        // dots[position].style['background-color'] = 'black';
        let nextFrame = (i = 1) => {
            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let nextNextPosition = (nextPosition + 1) % children.length;
            let nextNext = children[nextNextPosition];
            offsetTimeStart = Date.now();
            tl.clearAnimations();
            if (i === -1) {
                current.style.transform = `translate(${-this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * position}px)`;
            }
            else {
                //由于无法从ease等动作的位移推断经过时间，若动作不是linear，从暂停状态再次加载动作（比如点击提示点，pan等动作）时动画时间与正常动画时间有出入。
                let currentPo = positionOf(current);
                let currentDis = Math.abs(-this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * position - currentPo) / this[PROPERTY_SYMBOL]['elementWidth'];
                tl.addAnimation(new DOMElementStyleNumberAnimation(
                    current,
                    "transform",
                    0, currentPo,
                    currentDis * this[PROPERTY_SYMBOL]['transitionDuration'], -this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * position,
                    this[PROPERTY_SYMBOL]['transitMethod'],
                    (v) => `translateX(${v}px)`
                ));
            }
            if (i === 1) {
                nextNext.style.transform = `translate(${this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * nextNextPosition}px)`;
            }
            else {
                let nextNextPo = positionOf(nextNext);
                let nextNextDis = Math.abs(this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * nextNextPosition - nextNextPo) / this[PROPERTY_SYMBOL]['elementWidth'];
                tl.addAnimation(new DOMElementStyleNumberAnimation(
                    nextNext,
                    "transform",
                    0, nextNextPo,
                    nextNextDis * this[PROPERTY_SYMBOL]['transitionDuration'], this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * nextNextPosition,
                    this[PROPERTY_SYMBOL]['transitMethod'],
                    (v) => `translateX(${v}px)`
                ));
            }
            let nextPo = positionOf(next);
            let nextDis = Math.abs(- this[PROPERTY_SYMBOL]['elementWidth'] * nextPosition - nextPo) / this[PROPERTY_SYMBOL]['elementWidth'];
            tl.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                "transform",
                0, nextPo,
                this[PROPERTY_SYMBOL]['transitionDuration'] * nextDis, - this[PROPERTY_SYMBOL]['elementWidth'] * nextPosition,
                this[PROPERTY_SYMBOL]['transitMethod'],
                (v) => `translateX(${v}px)`
            ));
            tl.restart();
            position = nextPosition;
            //由于图片整体向左错了一位，所以dots[0]指向第二张图片，
            //提示点变色
            // setTimeout(() => {
            //     let previousPosition = (position + children.length - 1) % children.length;
            //     for (let i in dots) {
            //         dots[i].style['background-color'] = (parseInt(i) === position) ? 'black' : 'white';
            //     }
            // }, this[PROPERTY_SYMBOL]['transitionDuration'])
            // this[STATE_SYMBOL]['handler'] = setTimeout(() => {
            //     nextFrame();
            // }, this[PROPERTY_SYMBOL]['duration']);

        }        
        for (let i in dots) {
            
            dots[i].addEventListener("tap", event => {
                if (tl.status !== "paused") {
                    tl.pause();
                    clearTimeout(this[STATE_SYMBOL]['handler']);
                    delete (this[STATE_SYMBOL]['handler']);
                    currentTime = Date.now();
                    if (currentTime - offsetTimeStart < this[PROPERTY_SYMBOL]['transitionDuration'])
                        offset = (1 - this[PROPERTY_SYMBOL]['transitMethod']((currentTime - offsetTimeStart) / this[PROPERTY_SYMBOL]['transitionDuration'])) * this[PROPERTY_SYMBOL]['elementWidth'];
                    else
                        offset = 0;
                }
                let iInt = parseInt(i);
                let current = children[position];
                let previousPosition = (position + children.length - 1) % children.length;
                let previous = children[previousPosition];
                let displacement = null;
                let iIntPo = null;

                if (iInt === position || iInt === previousPosition) {
                    position = (iInt + children.length - 1) % children.length;
                    //向右移动的时候选中图片左侧图片有可能在视框右边，这样就会发成该图片飘过视框的现象，只有末端图片飘过视框时会造成视觉影响，将其作为特别情况处理。
                    if (iInt === 0) {
                        children[children.length - 1].style.transform = `translate(${- this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * (children.length - 1)}px)`;
                    }
                    nextFrame(0);
                    return;
                }
                if (iInt < position) {
                    //提示点图片在current的左边，该图片与previous,current三张图片右移
                    iIntPo = this[PROPERTY_SYMBOL]['elementWidth'] * (-2 - iInt) + offset
                    children[iInt].style.transform = `translate(${iIntPo}px)`;
                    displacement = 1;
                }
                else {
                    //提示点图片在current的右边，该图片与previous,current三张图片左移
                    iIntPo = this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * iInt + offset
                    children[iInt].style.transform = `translate(${iIntPo}px)`;
                    displacement = -1;
                }
                //移动提示点位置图片以及previous,current三张图片
                let currentPo = positionOf(current);
                let currentPoN = this[PROPERTY_SYMBOL]['elementWidth'] * (displacement - position);
                let currentDis = Math.abs(currentPoN - currentPo) / this[PROPERTY_SYMBOL]['elementWidth'];
                let previousPo = positionOf(previous);
                let previousPoN = this[PROPERTY_SYMBOL]['elementWidth'] * (displacement - previousPosition);
                let previousDis = Math.abs(previousPoN - previousPo) / this[PROPERTY_SYMBOL]['elementWidth'];
                let iIntPoN = - this[PROPERTY_SYMBOL]['elementWidth'] * iInt;
                let iIntDis = Math.abs(iIntPoN - iIntPo) / this[PROPERTY_SYMBOL]['elementWidth'];
                tl.clearAnimations();
                tl.addAnimation(new DOMElementStyleNumberAnimation(
                    current,
                    "transform",
                    0, currentPo,
                    this[PROPERTY_SYMBOL]['transitionDuration'] * currentDis, currentPoN,
                    this[PROPERTY_SYMBOL]['transitMethod'],
                    (v) => `translateX(${v}px)`
                ));
                tl.addAnimation(new DOMElementStyleNumberAnimation(
                    previous,
                    "transform",
                    0, previousPo,
                    this[PROPERTY_SYMBOL]['transitionDuration'] * previousDis, previousPoN,
                    this[PROPERTY_SYMBOL]['transitMethod'],
                    (v) => `translateX(${v}px)`
                ));
                tl.addAnimation(new DOMElementStyleNumberAnimation(
                    children[iInt],
                    "transform",
                    0, iIntPo,
                    this[PROPERTY_SYMBOL]['transitionDuration'] * iIntDis, iIntPoN,
                    this[PROPERTY_SYMBOL]['transitMethod'],
                    (v) => `translateX(${v}px)`
                ));
                tl.restart();
                position = iInt;
                //由于图片整体向左错了一位，所以dots[0]指向第二张图片，
                //提示点变色，将现图片右侧图片移到右侧,现图片左侧图片移到左侧，
                setTimeout(() => {
                    let previousPosition = (position + children.length - 1) % children.length;
                    let nextPosition = (position + children.length + 1) % children.length;
                    for (let i in dots) {
                        dots[i].style['background-color'] = (parseInt(i) === position) ? 'black' : 'white';
                    }
                    children[previousPosition].style.transform = `translate(${- this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * previousPosition}px)`
                    children[nextPosition].style.transform = `translate(${this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * nextPosition}px)`
                }, this[PROPERTY_SYMBOL]['transitionDuration'])
                this[STATE_SYMBOL]['handler'] = setTimeout(() => {
                    `translate(${this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * iInt + offset}px)`
                    nextFrame();

                    //若提示点图片并非current或previous，此动画持续时间会大于this[PROPERTY_SYMBOL]['transitionDuration'],时长有可能大于this[PROPERTY_SYMBOL]['duration']
                }, this[PROPERTY_SYMBOL]['duration']);


            });
        }
        this[STATE_SYMBOL]['contentContainer'].addEventListener("pan", event => {
            let offset = null;
            let currentTime = null;
            if (event.isVertical)
                return;
            if (tl.status !== "paused") {
                tl.pause();
                clearTimeout(this[STATE_SYMBOL]['handler']);
                delete (this[STATE_SYMBOL]['handler']);
                currentTime = Date.now();
                if (currentTime - offsetTimeStart < this[PROPERTY_SYMBOL]['transitionDuration'])
                    offset = (1 - this[PROPERTY_SYMBOL]['transitMethod']((currentTime - offsetTimeStart) / this[PROPERTY_SYMBOL]['transitionDuration'])) * this[PROPERTY_SYMBOL]['elementWidth'];
                else
                    offset = 0;
            }
            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let previousPosition = (position + children.length - 1) % children.length;
            let previous = children[previousPosition];
            current.style.transform = `translate(${- position * this[PROPERTY_SYMBOL]['elementWidth'] + event.dx + offset}px`;
            next.style.transform = `translate(${this[PROPERTY_SYMBOL]['elementWidth'] - this[PROPERTY_SYMBOL]['elementWidth'] * nextPosition + event.dx + offset}px)`;
            previous.style.transform = `translate(${this[PROPERTY_SYMBOL]['elementWidth'] * (- 1 - previousPosition) + event.dx + offset}px)`;
        });
        this[STATE_SYMBOL]['contentContainer'].addEventListener("panend", event => {
            let condition = 0;
            if (event.isVertical)
                return;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                condition = (event.dx < 0) ? 1 : -1;
            }
            else {
                let x = event.dx;
                condition = (x < -this[PROPERTY_SYMBOL]['elementWidth'] / 2) ? 1 : (x > this[PROPERTY_SYMBOL]['elementWidth'] / 2) ? -1 : 0;
            }
            position = (offset < this[PROPERTY_SYMBOL]['elementWidth']) ? ((position - 1 + 4 + condition) % 4) : ((position - 2 + 4 + condition) % 4);
            nextFrame(condition);
        });
        this[STATE_SYMBOL]['contentContainer'].addEventListener("pancancel", event => {
            let condition = 0;
            position = (offset < this[PROPERTY_SYMBOL]['elementWidth']) ? ((position - 1 + 4 + condition) % 4) : ((position - 2 + 4 + condition) % 4);
            nextFrame(condition);
        });
        this[STATE_SYMBOL]['contentContainer'].addEventListener("mousedown", event => event.preventDefault());


    }
    unmounted() {

    }
    update() {

    }

    appendChild(child) {
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("header");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";
        this[STATE_SYMBOL]['headerContainer'].appendChild(header);
        child.appendTo(this[STATE_SYMBOL]['contentContainer']);
        for (let i = 0; i < this[STATE_SYMBOL]['contentContainer'].children.length; i++) {
            this[STATE_SYMBOL]['contentContainer'].children[i].style.width = "100%";
            this[STATE_SYMBOL]['contentContainer'].children[i].style.height = "100%";
            this[STATE_SYMBOL]['contentContainer'].children[i].style.display = "inline-block";
        }

    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name) {
        if (name == "style") {
            return this[PROPERTY_SYMBOL]['root'].getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == "style") {
            this[PROPERTY_SYMBOL]['root'].setAttribute("style", value);
        }

        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
    




}