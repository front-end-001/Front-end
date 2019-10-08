import './index.scss'
import icon from '../res/big-o-cheat-sheet-poster.png'



const img = document.createElement('img')
img.setAttribute('src', icon)
document.body.appendChild(img)


if (module.hot) {
    module.hot.accept() // 如果存在热更新，则启用
}

console.log('hot replacement!');

console.log('hot replacement!1111');