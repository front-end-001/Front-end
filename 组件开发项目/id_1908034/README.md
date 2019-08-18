# 轮播组件
## 20190811线上课练习
+ 老师的线上代码 [teachercarousel.html](./20190811/teachercarousel.html)
+ 我自己的代码 [mycarousel.html](./20190811/mycarousel.html)
### 自己代码实现思路
+ 定义一个循环，循环内间隔1.5秒调用一次图片移动，即当前视窗内图片向左移动，相邻图片填补空出的视窗
+ 到最后一张图片了，就将容器内的img元素移除后，新建4个img元素
+ 使用setInterval(...)函数间隔5.5秒调用一次循环函数
```js
let play = () => {
        container.innerHTML = '';
        for (let i = 0; i < funnyList.length; i++) {
            let newImg = document.createElement('img');
            newImg.src = pictureData[i];
            newImg.alt = i + 1;
            newImg.title = `picture-${i + 1}`;
            container.appendChild(newImg);

        }
        let childList = Array.from(container.children);
        for (let i = 0; i < funnyList.length; i++) {
            let [curr, next] = [childList[i], childList[i + 1]];
            // console.log(curr, next);
            if (childList[i + 1]) {
                next.style.transition = 'ease 0';
                next.style.transform = `translate(${100 - 100 * (i + 1)}%)`;
                setTimeout(() => {
                    curr.style.transition = '';
                    curr.style.transform = `translate(${-100 - 100 * i}%)`;
                    next.style.transition = '';
                    next.style.transform = `translate(${-100 * (i + 1)}%)`;
                }, 1500 * (i + 1));
            }

        }
    };
    play();
    setInterval("play()", 5500);
```
### 自我点评
+ 代码可拓展性差，实现轮播的方式有点陋，主要是不会将偏移的图片移回来，css基础需要加强