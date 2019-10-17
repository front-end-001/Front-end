import Component from './BaseComponent'
import './TabView.scss'

export default class TabView extends Component {
    constructor(config){
        super(config);

        this.property.children = [];
        this.property.headers = [];

        this.didCreate();
    }

    didCreate(){
        this.headerContainer = document.createElement('div')
        this.headerContainer.className = 'headerContainer'

        this.contentContainer = document.createElement('div')
        this.contentContainer.className = 'contentContainer'

        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)
    }

    didMounted(){
        
    }

    appendChild(child) {
        let n = this.children.length;
        this.children.push(child)
        let title = child.getAttribute('title') || ""
        this.property.headers.push(title)

        let headerItem = document.createElement('div')
        headerItem.innerText = title
        headerItem.className = "headerItem" 
        let headerIndicator = document.createElement('div')
        headerIndicator.className = "headerIndicator"
        let defaultActive=child.getAttribute('active') || false
        headerIndicator.style.display = defaultActive ? "block" : 'none';
        
        headerItem.appendChild(headerIndicator)
        this.headerContainer.appendChild(headerItem)

        headerItem.addEventListener("click", event => {
            let idx = this.property.headers.indexOf(headerItem.innerText)

            for(let i = 0; i < this.headerContainer.children.length; i++) {
                if (idx == i) {
                    this.headerContainer.children[i].className = "headerItem active"
                    this.headerContainer.children[i].children[0].style.display = "block";
                } else {
                    this.headerContainer.children[i].className = "headerItem"
                    this.headerContainer.children[i].children[0].style.display = "none";
                }
            }

            for(let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transform = `translateX(${-n*100}%)`
                this.contentContainer.children[i].style.transition = 'ease 0.5s'
            }
        });

        child.appendTo(this.contentContainer)
        
    }

    setAttribute(name, value) {
        if (name == 'className') {
            this.root.className = value
        }
        return this.attrs[name] = value
    }

    getAttribute(name) {
        if(name == 'className'){
            return this.root.className
        } 
        return this.attrs[name]
    }

    get children() {
        return this.property.children
    }

}