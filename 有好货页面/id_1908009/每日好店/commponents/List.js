import { myCreate } from '../js/creat.js'
import css from '../css/list-1.css'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import Card1 from './Card-1.js'
import Card2 from './Card-2.js'
import Card3 from './Card-3.js'
import Card4 from './Card-4.js'

if(!window.LIST_VIEW_STYLE_ELEMENT){
    let styleElement = document.createElement('style')
    styleElement.innerHTML = css
    document.getElementsByTagName('head')[0].appendChild(styleElement)
    window.LIST_VIEW_STYLE_ELEMENT = true
}

export default class List {
    constructor() {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
       this.root = document.createElement('div')
       this.root.classList.add('list-view')
      // this.render().appendTo(this.root)
    }
    updated() {

    }
    mounted() {
       // this.render().appendTo(this.root)
    }
    render(){
        let data = this.ATTRIBUTE_SYMBOL['data'] || []
        if(!(data instanceof Array)){
           // console.log(data)
            data = [
                ...data.mostFavourateShops,
                ...data.recommendedShops
            ]
        }
        let resArr = [], item, card3Arr = [], flag=true
        for(let i of data){
            if(i.type==1){
                item = <Card1 data={i}></Card1>
                resArr.push(item)
            } else if (i.type == 2){
                item = <Card2 data={i}></Card2>
                resArr.push(item)
            }else if(i.type ==3){
                if (card3Arr.length<3){
                    card3Arr.push(i)
                }else{
                    item = flag ? <Card3 type='1' data={card3Arr} ></Card3> : <Card3 type='2' data={card3Arr} ></Card3>
                    flag = !flag
                    card3Arr=[]
                    resArr.push(item)
                }
            }else if(i.type==5){
                item = <Card4 data={i}></Card4>
                resArr.push(item)
            }
        }
      //  console.log(resArr,'1111')
        return  <div class='clearfix'>
                {
                    resArr.map(item=>item)
                }
              </div>   
    }
    title1(img1,name,btn){
        if(!btn){
            return <div class='card-1-head clearfix'>
                <img src={img1} class='card-1-img'></img>
                <p>{name}</p>
                <img src='../image/icon-tm.png' class='icon-tm-1'></img>
            </div>
        }else{
            return <div class='card-2-head clearfix'>
                <img src={img1} class='card-2-img'></img>
                <p>{name}</p>
                <img src='../image/icon-tm.png' class='icon-tm-2'></img>
                <div class='to-shop'>进店 > </div>
            </div>
        }
    }
    setPropoty(name, value) {
        return this.PROPERTY_SYMBOL[name] = value
    }
    getPropoty(name) {
        return this.PROPERTY_SYMBOL[name]
    }
    setAttribute(name, value) {
        if (name == 'style') {
            return this.root.setAttribute('style',value)
        }
        if (name == 'data') {
            this.ATTRIBUTE_SYMBOL[name] = value
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            //.log(this.render(), this.root,'222')
            return value
        }
        return this.ATTRIBUTE_SYMBOL[name] = value
    }
    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute('style')
        } 
        return this.ATTRIBUTE_SYMBOL[name]
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    appendChild(child) {
        child.appendTo(this.root);  
    }
}

