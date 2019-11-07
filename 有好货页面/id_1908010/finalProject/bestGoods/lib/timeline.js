
const RATE_SYMBOL = Symbol('rate');
const START_POINT = Symbol('startPoint')
// 时间线的三种状态 inited started paused
const STATUS = {
    inited: 0,
    started: 1,
    paused: 2,
}

export default class TimeLine {
    constructor(props) {
        this.animations = [];
        this.status = STATUS.inited;
        this[RATE_SYMBOL] = Object.create(null);
        this[START_POINT] = Object.create(null);
        this.rate = 1 //默认播放速率
        this.startPoint = 0
    }

    pause() {
        if (this.status != STATUS.started) 
            return;
        this.status = STATUS.paused;
        // 因为引入了 RAF 所以不在需要timer相关逻辑
        // clearTimeout(this.timer)
        // this.timer = null;
        this.resumeTick = this.tick; //缓存 tick函数
        this.tick = null

        this.pauseStart = Date.now();
    }

    stop() {
        this.tick = null;
        this.resumeTick = null;
        this.status = STATUS.inited;
        this.clear();
    }

    resume() {
        if (this.status != STATUS.paused) 
            return; 
        this.status = STATUS.started;
        this.pauseTime += Date.now() - this.pauseStart;
        // this.timer = setTimeout(this.tick, 16)
        this.tick = this.resumeTick;
        requestAnimationFrame(this.tick)
    }

    start() {
        // if (this.status == STATUS.started)
        //     return;
        this.status = STATUS.started;
        let startTime = Date.now()
        this.pauseTime = 0 //初始暂停时间为0
        this.tick = () => {
            for (let animation of this.animations) {
                animation.tick((Date.now() - this.pauseTime - startTime) * this.rate + this.startPoint);
            }
            if (this.tick)
                requestAnimationFrame(this.tick)
        }
        // setTimeOut 可以变频
        // this.timer = setTimeout(this.tick, 16)
        // 交由浏览器来处理变帧, 但是缺点是不好clear
        requestAnimationFrame(this.tick)
    }

    restart() {
        if (this.tick) {
            this.tick = null;
        }
        this.status = STATUS.inited;
        this.resumeTick = null;
        requestAnimationFrame(() => this.start());
    }

    addAnimation(animation) {
        this.animations.push(animation)
    }

    removeAnimation(animation){

    }

    clear() {
        this.animations = [];
    }

    // 处理负速率时引入
    set startPoint(value) {
        return this[START_POINT].startPoint = value
    }
    get startPoint() {
        return this[START_POINT].startPoint;
    }

    set rate(value){
        return this[RATE_SYMBOL].rate = value;
    }
    get rate(){
        return  this[RATE_SYMBOL].rate
    } 

}