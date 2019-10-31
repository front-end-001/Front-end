import Component from './BaseComponent'
import './ScrollView.scss'
import {create} from '../lib/create'

export default class ScrollView extends Component {
    constructor(config){
        super(config)
        this.property.children = []
        this.state.triggeredPullDown = false
        this.state.triggeredPullUp = false

        this.didCreate()

    }

    didCreate(){

        //阻止滑动事件向上传播
        this.root.addEventListener('touchmove', (event) => {
            event.cancelBubble = true
            event.stopImmediatePropagation(); 
        }, {
            passive: false
        })


        this.root.addEventListener("scroll", (event) => {
            let clientRect = this.root.getBoundingClientRect();
            let loadMoreRect = this.loadMoreFooter.root.getBoundingClientRect()

            if (this.root.scrollHeight - clientRect.height <= this.root.scrollTop) {
                if (!this.state.triggeredPullDown) {
                    console.log('scrollToBottom')
                    this.triggerEvent('scrollToBottom');
                    this.state.triggeredPullDown = true;
                }
            } else {
                this.state.triggeredPullDown = false;
            }
        })

        
        // .animate({spin, aliceTiming})
    }

    appendChild(child){
        child.appendTo(this.root)

        this.loadMoreFooter = (
            <div className="footer">
                <img src="../res/icons/loading.svg" width="20" height="20" id="loading"></img>
            </div>
        )
        
        this.loadMoreFooter.appendTo(this.root)

        let spin = [
            { transform: 'rotate(0)', color: '#000' },
            { transform: 'rotate(360deg)', color: '#000'}
        ]

        let aliceTiming = {
            duration: 3000,
            iterations: Infinity
        }
        //document.getElementById('loading') == null
        this.loadMoreFooter.root.children[0].animate(spin, {
            ...aliceTiming
        })
    }

    setAttribute(name, value) {
        if (name == 'className') {
            return this.root.className = value
        }
        return this.attrs[name] = value
    }

    getAttribute(name) {
        if(name == 'className'){
            return this.root.className
        } 
        return this.attrs[name]
    }
} 