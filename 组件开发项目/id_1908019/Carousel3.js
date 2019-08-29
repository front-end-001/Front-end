class Carousel {
    // 设置边节点
    constructor(root) {
        this.root = root
        // this.dots = root.querySelectorAll('.dots > span')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        // this.panels = root.querySelectorAll('.panels > a')
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')

        this.dotsContainer = root.querySelector('.dots')

        this.bind()

    }

    render() {

        let children = Array.prototype.slice.call(root.children);
        let position = 0
        let nextFrame = () => {
            position++
            position = position % children.length;
            for (let child of children) {
                child.style.transform = `translate(${-100 * position}%)`;
            }
            this._handler = setTimeout(nextFrame, 3000);
        }
        this._handler = setTimeout(nextFrame, 3000);
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
            let picAct = this.root.querySelector('.carousel-step1 .dots span.active')
            let index = this.dots.indexOf(picAct)
            index = (index + 1) % this.dots.length
            log(index)

            // 索引绑定图片
            this.setDots(index)

            // 绑定下标栏
            this.setPanels(index)
        }

        // 绑定 pre 点击事件
        this.pre.onclick = event => {
            let picAct = this.root.querySelector('.dots span.active')
            let index = this.dots.indexOf(picAct)
            index = (index - 1 + this.dots.length) % this.dots.length
            log(index)

            // 索引绑定图片
            this.setDots(index)

            // 绑定下标栏
            this.setPanels(index)

        }

    }

    setDots(index) {
        const removeActive = function(element) {
            return element.classList.remove('active')
        }
        this.dots.forEach(removeActive)
        this.dots[index].classList.add('active')
    }

    setPanels(index) {
        const setIndex = function(element) {
            element.style.zIndex = 1
        }
        this.panels.forEach(setIndex)
        this.panels[index].style.zIndex = 10
    }

}

projectAll = eAll('.carousel-step1')
projectAll.forEach(carousel => new Carousel(carousel))