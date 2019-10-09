import Carousel from './carousel'

export default class Tab {
  constructor({ el,item,children,style }) {
    this.item=item
    this.children=children
    this.style=style
    this.el=el
    this.header=[]

    this.created()
  }
  created() {
    this.render()
  }
  render() {
    let container =document.createElement('div')
    container.id='tab'
    container.style=this.style
    document.querySelector(this.el).appendChild(container)
    let block =document.createElement('div')
    block.id='tab_header'
    this.item.forEach((text,index)=>{
      let a=document.createElement('span')
      a.innerText=text
      block.appendChild(a)
      this.header.push(a)
      a.addEventListener('click', e =>{
        this.carousel.move(index)
        this.header.forEach(item=>{
          item.className=''
        })
        a.className='active'
      })
    })
    this.header[0].className='active'
    container.appendChild(block)
    this.carousel=new Carousel({
      el: '#tab',
      speed: 300,
      children:this.children,
      arrow: false
    })
    this.carousel.addEventListener('move',_=>{
      console.log('move')
      this.header.forEach(item=>{
        item.className=''
      })
      this.header[this.carousel._active_index].className='active'
    })
  }
}