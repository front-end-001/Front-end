import { BaseComponent, PROP_SYMBOL, STATE_SYMBOL } from "../component";
import { TimeLine, NormalAnimation, ease } from "../animation";
import { enableGesture } from "../gesture";
import {create} from "../../create.js"


const config = {
  animationDuration:1000,
  loopTimeout:3000
};
export class Carousel extends BaseComponent {
  constructor(){
    super(...arguments);
    this[STATE_SYMBOL].pos = 0;
    this[PROP_SYMBOL].config = config;
    this.created();
  }
  setAttribute(name,val){
    if(name === 'data'){
      this[PROP_SYMBOL][name] = val;
      return val;
    }
    return super.setAttribute(name,val);
  }
  mounted() {
    const {data} = this[PROP_SYMBOL];
    if(!data||!Array.isArray(data)){
      this.root.innerText = 'Carousel no data';
    } else{
      //显示n个图片  
      this.mountPics(data);
      this.setPos(0);
      this.startAutoLoop();
      this.setGuesture();
    }
    window.carousel = this;
  }
  mountPics(data){
    const pics=(this[PROP_SYMBOL].pics=[]);
    let i=0;
    for(let {image} of data){
      const pic = <img src={image} alt={i} />;
      pics.push(pic);
      pic.appendTo(this.root);
      i++;
    }
  }
  _getPics(){
    return this[PROP_SYMBOL].pics;
  }
  /**
   * 
   * @param {*} pos： 为0是正好显示第一张图片,为1时正好显示第二张图片；周期为 data.length
   */
  setPos(pos){
    if(isNaN(pos)){
      debugger;
    }
    let before = pos;
    pos = this._parsePos(pos);

    if(isNaN(pos)){
      console.log(before);
      debugger;
    }
    //隐藏不在视口的图片,将视口图片放在合适位置
    this._placePics(pos);
    this[STATE_SYMBOL].pos = pos;
  }
  getPos(){
    return this[STATE_SYMBOL].pos;
  }
  /**
   * 将pos 转换为 [0,data.length] 区间
   * @param {*} pos 
   */
  _parsePos(pos){
    const cycleLen = this._getPicCount();
    pos %= cycleLen;
    return pos >=0?pos:pos +cycleLen;
  }
  _getPicCount(){
    return this[PROP_SYMBOL].data.length;
  }
  _placePics(pos){
    /**
     * 假设有3个图片，则各图片在以下pos 范围时显示
     * 0 : (-1,1),
     * 1 : (0,2)
     * 2 : (1,3)
     */
    const pics= this._getPics();
    for(let i=0,len = this._getPicCount();i<len;i++){
      const showRange = [[i-1,i+1]];
      if(i===0){
        /**
         * pos 在 [0,len] 区间时, 在pic末尾补0， 以下pos范围第0张图显示
         * 0：(-1,1)||(-1+len,1+len)
         */
        showRange.push([i-1+len,i+1+len]);
      }
      let isShow = false;
      for(let [left,right] of showRange){
        if(pos>left&&pos < right){
          isShow=true;
          pics[i].root.style.transform = `translateX(${(left+1-pos)*100}%)`;
          break;
        }
      }
      pics[i].root.style.display=isShow?'':'none';
    }
  }
  //动画移动
  startAnimation(fromPos,toPos,duration){
    const {animationDuration} = this[PROP_SYMBOL].config;
    console.log('startAnimation',fromPos,toPos);
    this.stopAnimation();
   const timeLine= this[STATE_SYMBOL].timeLine =  new TimeLine();
   timeLine.addAnimation(new NormalAnimation(0,duration||animationDuration,{
     pos:[`${fromPos}`,`${toPos}`]
   },(key,val)=>{
     val = parseFloat(val);
     this.setPos(val);
   },ease));
   timeLine.play();
  }
  stopAnimation(){
    if(this[STATE_SYMBOL].timeLine){
      this[STATE_SYMBOL].timeLine.pause();
    } 
  }
  //自动切换
  startAutoLoop(timeout){
    const {loopTimeout} = this[PROP_SYMBOL].config;
    this[STATE_SYMBOL].timer = setTimeout(()=>{
      const pos = Math.round(this.getPos());
      this.startAnimation(pos,pos+1);
      this.startAutoLoop();
    },timeout||loopTimeout);
  }
  stopAutoLoop(){
    clearTimeout(this[STATE_SYMBOL].timer);
    this.stopAnimation();
  }
  //支持手势
  setGuesture(){
    const {root} = this;
    //阻止拖拽图片
    root.addEventListener('touchstart',e=>e.preventDefault(),{passive:false});
    root.addEventListener('mousedown',e=>e.preventDefault(),{passive:false});
    
    /**
     * tap 跳转
     * panStart stopAuto
     * panMove 跟随移动
     * panEnd 
     *    flick？flick方向移动:就地复位; 
     *    startAuto
     * 
     */
    enableGesture(root);
    root.addEventListener('tap',()=>{
      console.log('tap',this.getPos());
    })
    let startPos,width,stopPropagation ;

    root.addEventListener('panstart',e=>{
      this.stopAutoLoop();
      stopPropagation = Math.abs(e.dx) >= Math.abs(e.dy);
      if(stopPropagation){
        e.stopPropagation();
      } else {
        return;
      }
      startPos = this.getPos(); 
      width = this.root.clientWidth;
    })
    root.addEventListener('pan',e=>{
      if(stopPropagation){
        e.origin.stopPropagation();
        e.stopPropagation();
      } else {
        return;
      }
      this.setPos(startPos-e.dx/width);
    })
    const onEnd = e=>{
      console.log('end carousel',stopPropagation,e);
      if(stopPropagation){
        e.origin.stopPropagation();
        e.stopPropagation();
        //？ todo  stopPropagation 不适用于 document.addEventListener('mouseup')
          //？ 但 mousedown 适用，处理一下
        // window.cc = e;
        // console.log('carousel end stopPropagation',stopPropagation,e);
      } else {
        return;
      }
      let fromPos = this.getPos(),toPos;
      if(e.isFlick){
        toPos = Math.round(fromPos + (e.dx > 0?-1:1));
      } else{
        toPos=Math.round(fromPos);
      }

    const {animationDuration,loopTimeout}= this[PROP_SYMBOL].config;
      let animationTime = Math.abs(toPos - fromPos)/1 * animationDuration;
      this.startAnimation(fromPos,toPos, animationTime)
      this.startAutoLoop(loopTimeout+animationTime);
    };
    root.addEventListener('panend',onEnd);
    root.addEventListener('pancancel',onEnd);
  }
}
/**
 * 需求展示图片
 * 支持图片切换
 * 自动切换
 * 手势及切换过程
 */

 /**
  * 实现梳理
  *   基本实现
  *     显示n个图片
  *     限制在一个容器中
  *     图片能移动:从一个位置移动到另一位置
        控制：
          帧:显示固定位置 
          帧动画：从一个位置到另一位置；补间计算
      自动切换
        倒计时后启动移动
        中途停止倒计时
        移动停止开始倒计时
      手势
        tap：跳转链接
        panmove：图片跟随手指移动
        panEnd：
          flick
            true：向移动位置移动
            false：回弹到最近位置
          
  */