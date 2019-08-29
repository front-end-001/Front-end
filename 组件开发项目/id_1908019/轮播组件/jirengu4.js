class Carousel {
    // 设置边节点
    constructor(root, animation) {
        this.root = root
        this.animation = animation || ((fromNode, toNode, callback) => callback())
        // this.dots = root.querySelectorAll('.dots > span')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        // this.panels = root.querySelectorAll('.panels > a')
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')

        this.dotsContainer = root.querySelector('.dots')
        this.bind()

    }

    get index() {
        let picAct = this.root.querySelector('.dots span.active')
        let index = this.dots.indexOf(picAct)
        return index
    }

    get preIndex() {
        return (this.index - 1 + this.dots.length) % this.dots.length
    }

    get nextIndex() {
        return (this.index + 1) % this.dots.length
    }

    bind() {
        // 绑定 dots 点击事件
        this.dotsContainer.addEventListener('click', event => {
            // 返回事件的目标节点
            let item = event.target
            // log(this)
            // log(item)
            if (item.tagName !== 'SPAN') {
                return false
            }
            let index = this.dots.indexOf(item)
            // log(index)

            // 绑定下标栏
            this.setDots(index)

            // 索引绑定图片
            this.setPanels(index)
        })

        // 绑定 next 点击事件
        this.next.onclick = event => {
            // 绑定下标栏
            this.setPanels(this.nextIndex)

            // 索引绑定图片
            this.setDots(this.nextIndex)
        }

        // 绑定 pre 点击事件
        this.pre.onclick = event => {
            // 索引绑定图片
            this.setDots(this.preIndex)

            // 绑定下标栏
            this.setPanels(this.preIndex)

        }

    }

    setDots(index) {
        const removeActive = function(element) {
            return element.classList.remove('active')
        }
        this.dots.forEach(removeActive)
        this.dots[index].classList.add('active')
    }

    setPanels(toIndex, fromIndex) {
        // 由于动画是异步的过程，所以添加一个回调
        // this.panels[fromIndex], this.panels[toIndex] 表示一个过渡
        this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
        // 这是最终执行之后的效果
        const setIndex = function(element) {
            element.style.zIndex = 1
        }
        this.panels.forEach(setIndex)
        this.panels[toIndex].style.zIndex = 10
        })
    }

}

const fade = function(fromNode, toNode, onFinish) {
    log(fromNode, toNode)
    let opacityOffset1 = 1
    let opacityOffset2 = 0
    let step = 0.04
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 9

    const fromNodeAnimation = function() {
        if (opacityOffset1 > 0) {
            opacityOffset1 -= step
            fromNode.style.opacity = opacityOffset1
            requestAnimationFram(fromNodeAnimation)
        } else {
            fromNode.style.opacity = 0
        }
    }

    const toNodeAnimation = function() {
        if (opacityOffset2 < 1) {
            opacityOffset2 += step
            toNode.style.opacity = opacityOffset2
            requestAnimationFram(toNodeAnimation)
        } else {
            toNode.style.opacity = 1
            onFinish()
        }
    }

    fromNodeAnimation()
    toNodeAnimation()
}

// projectAll = eAll('.carousel')
// projectAll.forEach(carousel => new Carousel(carousel))

//  debug 全局c c.index
const c = new Carousel(document.querySelector('.carousel'), fade)
