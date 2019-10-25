import { myCreate } from '../js/creat.js'
import css from '../css/list-1.css'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

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
       this.render().appendTo(this.root)
    }
    updated() {

    }
    mounted() {
       // this.render().appendTo(this.root)
    }
    render(){
        let data = this.ATTRIBUTE_SYMBOL['data'] || []
        let resArr = []
        //debugger;
        for(let i of data){
            if(i.type==1){
                let t = this.title1('../image/icon-gk.png', 'asdsa', false)
                let item = <div class="card-1 clearfix">
                                {t}
                                <img class='img-content fr-19' src=''></img>
                                <img class='img-content' src=''></img>
                            </div>
                resArr.push(item)
            } else if (i.type == 2){
                let b = this.title1('../image/icon-gk.png', 'vvvvv', true)
                resArr.push(
                    <div class='card-2'>
                        {b}
                        <div class='tips'>好店君</div>
                        <div class='mt-21 img-wrap clearfix'>
                            <img src='' class='img-1'></img>
                            <img src='' class='img-2'></img>
                            <img src='' class='img-2'></img>
                        </div>
                        <div class='like-shop'>相似好店 ></div>
                     </div>
                )
            }else if(i.type ==3){
                //resArr.push(<p>{i.b}</p>)
            }
        }
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

