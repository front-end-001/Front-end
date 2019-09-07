/*
 * @Author: 玉皇大亮
 * @since: 2019-08-29 19:29:52
 * @LastAuthor: Do not edit
 * @lastTime: 2019-08-29 21:24:25
 * @message: 
 */

/**
 * @description: 
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
                if (!animation.isFinish) 
                    animation.tick(Date.now()-this.pauseTime-startTime);
            }
        };
        this.resetTimer();
    }
    pause(){
        console.log("pause start");
        if (this.status !== TimeLineState.started) {
            return;
        }
        console.log("pause end");
        this.status = TimeLineState.paused;
        clearInterval(this.timer);
        this.timer = null;
        this.pauseStart = Date.now();
    }
    resume(){
        if (this.status !== TimeLineState.paused) {
            return;
        }
        this.status = TimeLineState.started;
        this.pauseTime += (Date.now() - this.pauseStart);
        this.resetTimer();  
    }

    resetTimer() {
        this.timer = setInterval(this.tick, 16);
    }

    set rate(value){} 
    get rate(){}
    addAnimation(animation) {
        this.animations.push(animation);
    }
    removeAnimation(){

    }
}