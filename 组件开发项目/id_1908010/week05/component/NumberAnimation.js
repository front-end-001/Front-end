/*
 * @Author: 玉皇大亮
 * @since: 2019-08-29 19:15:05
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-07 16:57:12
 * @message: 去掉 isFinish 用FixKeyFrame 修复关键帧,来解决关键帧动画不正确的问题
 */
 
class NumberAnimation {
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
        let dv = progress  * (this.endValue - this.startValue);
        this.element.style[this.property] =  this.converter(dv + this.startValue);
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