class Timeline {
        //inited, started, paused, 
        constructor(){
            this._animations = [];
            this.status = "inited";
            this._rate = 1
            this._startPoint = 0;
        }
        pause(){
            if(this.status != "started")
                return;
            this.status = "paused"
            this._resumeTick = this._tick;
            this._tick = null
            this._pauseStart = Date.now();
        }
        resume(){
            if(this.status != "paused")
                return;
            this.pauseTime += Date.now() - this._pauseStart;
    
            this._tick = this._resumeTick
            requestAnimationFrame(this._tick);
        }
        start(){
            if(this.status == "started")
                return;
            this.status = "started"
            let startTime = Date.now();
            this.pauseTime = 0;
            this._tick = () => {
                for(let animation of this._animations){
                    if(!animation.finished)
                        animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint);
                }
                if(this._tick)
                    requestAnimationFrame(this._tick);
            }
            requestAnimationFrame(this._tick);
        }
        set startPoint(value) {
            this._startPoint = value;
        }
        get startPoint() {
            return this._startPoint;
        }
        set rate(value){
            this._rate = value
        }
        get rate(){
            return this._rate;
        }
        addAnimation(animation){
            this._animations.push(animation);
        }
        removeAnimation(animation){
        }
    }
    let linear = cubicBezier(0, 0, 1, 1);
    let ease = cubicBezier(.25, .1, .25, 1);
    let easeIn = cubicBezier(.42, 0, 1, 1);
    let easeOut = cubicBezier(0, 0, .58, 1);
    let easeInOut = cubicBezier(.42, 0, .58, 1);
    let myCB = cubicBezier(.69,-0.85,.25,1);
    
    class DOMElementStyleNumberAnimation {
        constructor(element, property, startTime, startValue, endTime, endValue, converter){
            this._element = element;
            this._property = property;
            this._startTime = startTime;
            this._startValue = startValue;
            this._endTime = endTime;
            this._endValue = endValue;
            this._converter = converter;
            this._fixKeyFrame = false;
        }
        tick(t){
            if(t > this._endTime) {
                if(!this._fixKeyFrame)
                    return;
                else {
                    t = this._endTime;
                    this._fixKeyFrame = false;
                }
            } else if(t < this._startTime) {
                if(!this._fixKeyFrame)
                    return;
                else {
                    t = this._startTime;
                    this._fixKeyFrame = false;
                }
                    
                
            } else {
                this._fixKeyFrame = true;
            }
    
            let progress = (t - this._startTime) / (this._endTime - this._startTime)
            let displacement = easeIn(progress) * (this._endValue - this._startValue);
            let currentValue = this._startValue + displacement;
            this._element.style[this._property] = this._converter( currentValue );
        }
    }
    
    class DOMElementStyleVectorAnimation {
        constructor(element, property, startTime, startValue, endTime, endValue, converter){
            this._element = element;
            this._property = property;
            this._startTime = startTime;
            this._startValue = startValue;
            this._endTime = endTime;
            this._endValue = endValue;
            this._converter = converter;
            this._fixKeyFrame = false;
        }
        tick(t){
            if(t > this._endTime) {
                if(!this._fixKeyFrame)
                    return;
                else {
                    t = this._endTime;
                    this._fixKeyFrame = false;
                }
            } else if(t < this._startTime) {
                if(!this._fixKeyFrame)
                    return;
                else {
                    t = this._startTime;
                    this._fixKeyFrame = false;
                }
                    
                
            } else {
                this._fixKeyFrame = true;
            }
    
            let progress = (t - this._startTime) / (this._endTime - this._startTime)
            
            let displacement = [];
            let currentValue = [];
            for(let i = 0; i < this._endValue.length; i++) {
                displacement[i] = easeIn(progress) * (this._endValue[i] - this._startValue[i]);
                currentValue[i] = this._startValue[i] + displacement[i];
            }
            console.log(currentValue)
            this._element.style[this._property] = this._converter( currentValue );
        }
    }
    let tl = new Timeline();
    tl.addAnimation(new DOMElementStyleNumberAnimation(
        document.getElementById("ball"),
        "top",
        0, 0,
        500, 200,
        (v) => `${v}px`
    ));
    tl.addAnimation(new DOMElementStyleVectorAnimation(
        document.getElementById("ball"),
        "backgroundColor",
        0, [255, 0, 0],
        500, [0, 255, 0],
        (v) => `rgb(${v[0]}, ${v[1]}, ${v[2]})`
    ));
    tl.addAnimation(new DOMElementStyleNumberAnimation(
        document.getElementById("ball"),
        "left",
        500, 0,
        1000, 200,
        (v) => `${v}px`
    ));
    tl.addAnimation(new DOMElementStyleVectorAnimation(
        document.getElementById("ball"),
        "backgroundColor",
        500, [0, 255, 0],
        1000, [0, 0, 255],
        (v) => `rgb(${v[0]}, ${v[1]}, ${v[2]})`
    ));
    tl.addAnimation(new DOMElementStyleNumberAnimation(
        document.getElementById("ball"),
        "top",
        1000, 200,
        1500, 0,
        (v) => `${v}px`
    ));
    tl.addAnimation(new DOMElementStyleVectorAnimation(
        document.getElementById("ball"),
        "backgroundColor",
        1500, [0, 255, 0],
        2000, [0, 255, 255],
        (v) => `rgb(${v[0]}, ${v[1]}, ${v[2]})`
    ));
    tl.addAnimation(new DOMElementStyleNumberAnimation(
        document.getElementById("ball"),
        "left",
        1500, 200,
        2000, 0,
        (v) => `${v}px`
    ));
    tl.rate = 1;
    tl.startPoint = 0;
    tl.start();
    