/*
 * @Author: 玉皇大亮
 * @since: 2019-08-29 19:15:05
 * @LastAuthor: Do not edit
 * @lastTime: 2019-08-29 22:28:19
 * @message: 颜色动画demo
 */
 
const RED = [255, 0, 0];
const GREEN = [0, 255, 0];
const BLUE = [0, 0, 255];
const IDONKNOW = [0, 255, 255];

class DomElementStyleVectorAnimation { //补间动画
    /**
     * 
    * @param {*} element 产生动画的元素
    * @param {*} property 产生动画的属性
    * @param {*} startTime 动画起始时间
    * @param {*} startValue 动画属性起始值
    * @param {*} endTime 动画终止时间
    * @param {*} endValue 动画属性终止值
    * @param {*} converter 由js动画变成css动画转换器

    */
    constructor(element,  property, startTime, startValue, endTime, endValue, converter) {
        this.element = element;
        this.property = property;
        this.startTime = startTime;
        this.startValue = startValue;
        this.endTime = endTime;
        this.endValue = endValue;
        this.converter = converter;

        this.isKeyFrameFixed = false; //关键帧修复标志位
    }

    /**
     * @param t 接受时间线 每一帧
    */
    tick(t) {
        t = this.fixKeyframe(t); //此处需要注意把时间线返回
        
        let progress = (t - this.startTime) / (this.endTime - this.startTime);
        let dv = [];
        let currentValue = [];
        for (let i = 0; i < this.endValue.length; i++) {
            dv[i] = progress  * (this.endValue[i] - this.startValue[i]);
            currentValue[i] = dv[i] + this.startValue[i];
        }
        this.element.style[this.property] =  this.converter(currentValue);
    }

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

};