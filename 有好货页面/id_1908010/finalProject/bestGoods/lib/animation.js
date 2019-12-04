export class Animation {
    constructor(props){
        this.element = props.element;
        this.property = props.property;
        this.startTime = props.startTime;
        this.startValue = props.startValue;
        this.endTime = props.endTime;
        this.endValue = props.endValue;
        this.converter = props.converter;
        this.transitMethod = props.transitMethod;
        this.isKeyFrameFixed = false;
    }

    tick(t) {
        // console.log(t)
    }
    // 当引入负速率时，就需要引入关键帧修复的功能
    fixKeyframe(t) {
        if (t > this.endTime) {
            if (!this.isKeyFrameFixed) {
                return;
            } else {
                t = this.endTime;
                this.isKeyFrameFixed = false; //重置标志位
            }
        } else if (t < this.startTime) {
            if (!this.isKeyFrameFixed) {
                return;
            } else {
                t = this.startTime;
                this.isKeyFrameFixed = false; //重置标志位
            }
        } else {
            this.isKeyFrameFixed = true;
        }
        return t;
    }
}


export class NumberAnimation extends Animation {
    constructor(props) {
        super(props);

    }

    tick(t) {
        t = this.fixKeyframe(t)
        //线性插值的算法
        let progress = (t - this.startTime) / (this.endTime - this.startTime);
        let dv = this.transitMethod(progress) * (this.endValue - this.startValue);
        this.element.style[this.property] =  this.converter(dv + this.startValue);
    }
}

export class VectorAnimation extends Animation {
    constructor(props) {
        super(props);
    }

    tick(t) {
        t = this.fixKeyframe(t); //此处需要注意把时间线返回
        
        let progress = (t - this.startTime) / (this.endTime - this.startTime);
        let dv = [];
        let currentValue = [];
        for (let i = 0; i < this.endValue.length; i++) {
            dv[i] = this.transitMethod(progress)  * (this.endValue[i] - this.startValue[i]);
            currentValue[i] = dv[i] + this.startValue[i];
        }
        this.element.style[this.property] =  this.converter(currentValue);
    }
}

// use example!
/*
let timeLine = new TimeLine()
timeLine.addAnimation(new NumberAnimation({
    element: document.getElementById('ball'),
    property: "tranform",
    startTime: 0,
    startValue: 0,
    endTime: 500,
    endValue: 1000,
    transitMethod: ease,
    convert: (v) => `translate(${v}px)`
}))
*/
