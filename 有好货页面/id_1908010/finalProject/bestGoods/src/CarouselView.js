import Component from './BaseComponent'
import {enableGesture} from '../lib/gesture.js'
import Fragment from './Fragment';
// 为什么 每个自己写的组件都要加这行代码
import {create} from '../lib/create'

export default class CarouselView extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.property.children = []
        this.state.position = 0
        this.state.startX = 0
        this.didCreate()
    }

    didCreate(){
        let content = this.render();
        if (!content) return;
        content.appendTo(this.root)

        enableGesture(this.root)
        let panmove = (event) => {
            if (event.isVertical) return;
            event.preventDefault();
            for(let child of this.property.children){
                console.log(child)
            }
        }

        let panend = (event) => {
            if (event.isVertical) return;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.state.position = this.state.position - 1;
                } 
                if (event.dx < 0) {
                    this.state.position = this.state.position + 1;
                }
            } else {
                this.state.position = - Math.round((this.state.startX + event.dx) / 500);  // 取最近的整数
            }
    
            this.state.position = Math.max(0, Math.min(this.state.position, this.property.children.length - 1));//如果position 不取正值
    
            for (let child of this.property.children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * 500}px)`; //复位
            }
    
            this.state.startX  = -this.state.position * 500;
        }

        this.root.addEventListener('panmove', panmove)
        this.root.addEventListener("panend", panend)
    }

    render() {
        let data = this.property['data'] || ""
        if(!data) return null;

        return (
            <div style="overflow: hidden;">
                {data.map(item => (
                    <img 
                        className="carouselItem" 
                        src={item.image} 
                        width="100%" 
                        height="100%" 
                        style="display:inline-block;border-radius:18px;transition:ease 0.5s;"></img>
                ))}
            </div>
        )
    }

    setAttribute(name, value) {
        if (name == "className") {
            return this.root.className = value
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root)
            return;
        }
        return this.attr[name] = value;
    }

    getAttribute(name) {
        if (name == 'className') {
            return this.root.className
        }
        return this.attr[name];

    }
}