/*
 * @Author: 玉皇大亮
 * @since: 2019-08-29 19:29:52
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-07 16:56:11
 * @message: TimeLine RequestAnimationFrame 版本
 */

/**
 * @description: 使用requestAnimationFrame的版本
 * @state 初始化 inited 开始 started 暂停 paused  
 */ 
const TimeLineState = {
    inited : 'inited',
    started: 'started',
    paused : 'paused',
}

class TimeLine {
    constructor() {
        this.animations = [];
        // 状态管理代码
        this.status = TimeLineState.inited;
        this._rate = 1; //默认速率
    }
    start() {
        if (this.status === TimeLineState.started) {
            return;
        }
        this.status = TimeLineState.started;
        let startTime = Date.now();
        this.pauseTime = 0; 
        this.tick = () => {
            for (let animation of this.animations) {
                // if (!animation.isFinish) {
                    let t = Date.now()-this.pauseTime-startTime;
                    animation.tick(t * this._rate);
                // }
            }
            if (this.tick) 
                requestAnimationFrame(this.tick);
        };
        requestAnimationFrame(this.tick);
    }
    pause(){
        if (this.status !== TimeLineState.started) {
            return;
        }
        this.status = TimeLineState.paused;
        this.pauseStart = Date.now();
        // 动画暂停
        this.savedTick = this.tick;
        // cancelAnimationFrame(this.tick)
        this.tick = null;

    }
    resume(){
        if (this.status !== TimeLineState.paused) {
            return;
        }
        this.status = TimeLineState.started;
        this.pauseTime += (Date.now() - this.pauseStart);
        // 动画恢复
        this.tick = this.savedTick;
        requestAnimationFrame(this.tick);
    }

    restart() {
        if(this.tick) {
            this.tick = null;
            this.savedTick = null;
        }
        this.status = TimeLineState.inited;
        requestAnimationFrame(() => {
            this.start();
        });
    }

    resetTimer() {
        this.timer = setInterval(this.tick, 16);
    }
    /**
     * @description: 播放速率
     * @param rate
     */
    set rate(value){ 
        this._rate = value;
    } 
    get rate(){
        return this._rate;
    }
    addAnimation(animation) {
        this.animations.push(animation);
    }
    removeAnimation(){

    }
}