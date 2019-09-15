/*
 * @Author: 玉皇大亮
 * @since: 2019-08-29 19:15:05
 * @LastAuthor: Do not edit
 * @lastTime: 2019-08-29 21:42:18
 * @message: 
 */
// import CubicBezier from './CubicBezier'
 
class DomElementStyleNumberAnimation {
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
    }

    /**
     * @param t 接受时间线 每一帧
    */
    tick(t) {
        if (t > this.endTime) {
            t = this.endTime; //关键帧修正
            this.isFinish = true; //解决多动画操作时，因为时间线不正确而导致的结果不正确的问题
        }
        if (t < this.startTime) {
            return;
        }

        let progress = (t - this.startTime) / (this.endTime - this.startTime);
        let dv = progress  * (this.endValue - this.startValue);
        this.element.style[this.property] =  this.converter(dv + this.startValue);
    }

};