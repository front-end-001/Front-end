
import { myCreate } from '../js/creat.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Card3 {
    constructor(type) {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
        this.root = document.createElement('div')
        this.root.classList.add('card-3')
    }
    updated() {

    }
    mounted() {

    }
    render() {
        let type = this.STATE_SYMBOL['type'] || []
        if(type==1){
            return this.Lft()
        }else{
            return this.Rigt()
        }
    }
    Lft(){
       let data =  this.ATTRIBUTE_SYMBOL.data
      // console.log(data,'asdasdsa')
        return <div class='clearfix'>
            <div class='fl img-style-1'>
                <a href={data[0].url}><img src={data[0].items[0].image} ></img></a> 
                {this.tip1(data[0].name, data[0].level, data[0].url)}
            </div>
            <div class='fr img-style-2'>
                <a href={data[1].url}><img src={data[1].items[0].image} ></img></a> 
                {this.tip2(data[1].name, data[1].level)}
            </div>
            <div class='fr img-style-3'>
                <a href={data[2].url}><img src={data[2].items[0].image} ></img></a> 
                {this.tip2(data[2].name, data[2].level)}
            </div>
        </div>
    }
    Rigt(){
        let data = this.ATTRIBUTE_SYMBOL.data
        return <div class='card-4 clearfix'>
            <div class='fr img-style-1'>
                <a href={data[0].url}><img src={data[0].items[0].image} ></img></a> 
                {this.tip1(data[0].name, data[0].level,data[0].url)}
            </div>
            <div class='fl img-style-2'>
                <a href={data[1].url}><img src={data[1].items[0].image} ></img></a> 
                {this.tip2(data[1].name, data[1].level)}
            </div>
            <div class='fl img-style-3'>
                <a href={data[2].url}><img src={data[2].items[0].image} ></img></a> 
                {this.tip2(data[2].name, data[2].level)}
            </div>
        </div>
    }
    tip1(name,nums,url){
        let startArr = []
        for(let i=0;i<nums;i++){
            startArr.push(i)
        }
        return <div class='item-hover'>
                    <div class='clearfix mr-b-14'>
                    {
                        startArr.map(item=>
                                 (<img src='../image/star.png' class='star' ></img>)
                        )     
                    } 
                    </div>
                    {name}
                    <a class='go-shop-btn-1' href={url}>进店<image src='../image/arrow-left-copy.png'></image></a>
                </div>
    }
    tip2(name, nums){
        let startArr = []
        for (let i = 0; i < nums; i++) {
            startArr.push(i)
        }
        return <div class='item-hover bg-op'>
                    <div class='clearfix mr-b-14'>
                        {
                            startArr.map(item =>
                                (<img src='../image/star.png' class='star' ></img>)
                            )
                        } 
                    </div>
                    {name}
                     <div class='go-shop-btn-2'>></div>
                 </div>
    }
    setPropoty(name, value) {
        return this[_PROPERTY_SYMBOL][name] = value
    }
    getPropoty(name) {
        return this[_PROPERTY_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == 'style') {
            return this.root.setAttribute('style', value)
        }
        if (name == 'type') {
            this.STATE_SYMBOL[name] = value
        }
        if (name == 'data') {
            this.ATTRIBUTE_SYMBOL[name] = value
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }
       
        return this.root.setAttribute(name, value)
    }
    getAttribute(name) {
        return this.root.getAttribute(name)
    }

    appendTo(element) {
        element.appendChild(this.root)
    }
    appendChild(child) {
        child.appendTo(this.root)
    }
}

