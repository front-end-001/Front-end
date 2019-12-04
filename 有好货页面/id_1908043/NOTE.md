# 毕业论文 组件化的认识


## 1. 业务痛点（背景）

现代化前端开发，项目复杂度和工作量都较大。为了便于分工，项目不同的页面、页面里不同的部分都拆分为多文件来实现。

多文件管理带来了2个常见的问题：

1. 相似的业务代码无法复用：A 同学实现了一遍某个页面，页面界面改版后，B 同学发现 A 同学代码无法有效复用，只好自己再重新实现一遍

2. 多人重复实现同样的功能：A 同学自己实现了某个功能，B 同学开发时要做同样的功能，没有注意到 A 同学已经实现了，于是自己又实现了一遍


## 2. 组件化目标

通过组件化可以解决上面2个问题

组件化的核心目标：

- 复用：组件可以被复用在多个地方，每个被复用的地方都是独立的实例，互相不会彼此影响。开发人员通过复用，可以少做无用功，大大提高开发效率
- 解耦：组件是一个独立的代码部分，组件开发者和业务开发者可以根据约定来各自独立开发与测试
- 封装：组件将功能实现方法封装在内部，组件的使用人员可以只关心组件文档本身提供的功能，当有需要了解原理时才需要关注内部的实现方式
- 抽象：对组件的使用人员来说，组件实现了某种功能，提供了简易的使用方法，降低了使用者学习的心智成本


举个简单的例子：
原生 html 展示文字是这样的
```html
<span>文字</span>
```
封装一个显示红色文字的组件FontRed，就可以这样调用了
```html
<FontRed>红色的文字</FontRed>
```

## 3. 组件化方案分析
组件机制包含以下方面

对于纯 JS 功能组件（与UI展示无关）比较简单

纯 JS 组件，一般是 Class 实例化后，直接 js 引用调用，例如状态管理工具 mobx 的 某一个子数据方法集合 store。

还有一种是 JS 提供工具类的方法，广义上来说也可以认为是组件，例如常见的工具类库 lodash、ramda。这种可以直接一起导出，或者写为 Class 的静态变量

UI 组件则较为复杂，以下讨论的都是 UI 组件

### 3.1 创建挂载

UI 组件
标签式声明：
```html
<MyComponent></MyComponent>
```

组件由代码解析器，搭配对应的框架语法来处理，例如 React 使用 JSX 语法，Vue 使用 vue 文件语法或者自定义等等

API方式声明：
```javascript
Toast.show()
```
其实是在标签式声明的方式上做了封装。
这种方式必须满足一个条件：与页面无关的独立全局组件。
通常是弹层组件。声明时会挂载在全局的位置，例如插入元素到 body 底部


### 3.2 生命周期
由于组件做为一段程序会被执行，会有自己的执行周期

一般为创建、挂载、更新、销毁四个阶段，具体可以继续细分下去

### 3.3 内部构成

#### 3.3.1 描述（组件的输入）
由于组件会在不同的业务场景下使用，因此需要来描述组件。

一般有 attribute、property
二者的区别是 attribute 定义了后就不变了，是初始化的数据
property 是可变的数据，组件内部会监听它的变化

而 React 把两者都简化为 property 了，一般对于只有初始化才使用的数据，建议用 init 开头来命名

还有一种是比较少见的 context，就是从祖先组件上直接获取状态，常用于两个特定的组件搭配使用时。
例如一个点击按钮组件和滚动组件，点击按钮通过 context 获取到滚动组件的滚动状态，滚动时点击按钮的点击行为失效

#### 3.3.2 事件（组件的输出）
组件接收用户的输入后，需要反馈給外部。

例如一个输入框组件，用户输入数字后，组件需要告诉外部自己接收到了用户的输入，以及输入内容。

输出一般有两种方式：
1. 执行回调方法：直接执行 attribute、property 传入的 onXXX 方法，并且把数据通过函数传参的方式给到。大部分开源类库都使用这种方式

2. 事件触发器：使用 EventEmitter，来触发约定好的事件名。调用方则需要对该事件名进行监听，数据对传到事件监听的回调方法里。这种方式进一步降低了代码的耦合度，在自己业务里比较灵活，也便于在业务代码里写单元测试，但需要额外对事件名进行统一管理。

#### 3.3 组件内部的功能

ref 是每个组件必备的功能，将组件的实例本身暴露出来，使外部可以调用组件内部的方法，甚至获取到原生的 DOM 等

children 部分种类组件，提供在其内部特定位置挂载子组件的功能，方便不同类型的组件组合，有通过 property 传入，和组件标签里直接放置两种方式



事件：组件需要直接从用户操作接收数据时，例如手势、键盘等。需要事件监听，一般在组件根元素上进行事件绑定，或者特定的元素 input 等

动画：可以通过 css animation 动画、css transform 过渡动画、JS 动画来实现，以及其他方式 SVG、webGL 等等

手势：移动端需要处理用户的触摸操作，有以下几种
 - 点击 tap：手按下，再迅速抬起，移动范围较小
 - 拖拽 pan：手按下，移动一段距离后，抬起
 - 轻扫 flick：手按下，移动一小段距离，迅速离开

 一般通过监听 touchstart、touchmove、touchend、touchcancel 来实现

鼠标：与手势类似


### 3.4 组件间的交互
组件间的交互一般是通过单向数据流，给组件传递 property 来实现的。

管理数据的方式，有事件触发器、父组件内部状态 state、全局状态管理工具 vuex、redux、mobx 等


## 4. 实践
业务中做了以下优化，并且在生产环境中使用了：

### 4.1 封装金额试算组件

自己在业务中实现了一套 React 自定义输入金额的组件。它由一套组件组合而成。

组件的输入为：用户从模拟键盘输入数字
组件的输出为：输入完成事件、提交结果事件

index.js 里统一协调各子组件的状态（给子组件的 property 传 state ），最终给调用方发出事件、给出数据。
定义了输入完成、提交结果两个事件。

Input.js 负责输入框功能：展示数字
keyboard.js 里则负责接收用户端输入的数字

这样设计的好处是，组件本身、包括组件内部的子组件，都是不依赖外部，彼此独立的受控组件。

组件整体的模型类似原生 html 的
```html
<input onchange="myFunction()" />
```

实现效果图：
![效果图1](https://xiaweiss.com/foo/BillCalc-A.png)
![效果图2](https://xiaweiss.com/foo/BillCalc-B.png)

简化后的代码实现为：
```javascript
/**
 * 自定义金额分期/还款试算组件
 */

// 定义 propTypes，开发环境代码运行时会检查类型，避免错误
BillCalculate.propTypes = {};

function BillCalculate(props) {
    const [amount, setAmount] = useState(props.initAmount); // 金额的变化由内部state状态管理
    const range = useMemo(() => {
        if (amount < props.minAmount) { return RANGE.min; } // 金额低于最低，超过正常范围了
        if (amount > props.maxAmount) { return RANGE.max; } // 金额超过最高，超过正常范围了
        return RANGE.normal;
    }, [amount, props.minAmount, props.maxAmount]);

    const [isInputFocus, setInputFocus] = useState(!props.initAmount); // state 管理输入框是否聚焦

    /**
     * 处理键盘输入
     * @param {string} 按键类型
     * @param {string} 按键的数字值
     */
    function handleKeyboard(opt, val) {
        switch (opt) {
            case KEY_TYPE.num:
                if (range !== RANGE.max) {
                    updateAmount(amount + val);
                }
                break;
            case KEY_TYPE.del:
                updateAmount(amount.slice(0, -1));
                break;
            case KEY_TYPE.ok:
                if (amount && range === RANGE.normal) {
                    setInputFocus(false);
                    props.handleCalc(amount); // 组件输出结果
                }
                break;
            default:
        }
    }
    /**
     * 处理 blur 事件
     */
    function handleBlur() {
        setInputFocus(false);
        props.handleSubmit(amount); // 组件输出结果
    }

    /**
     * 处理 试算后提交 事件
     */
    function handleSubmit() {
        props.handleSubmit(amount); // 组件输出结果
    }

    /**
     * 更新钱数，同步状态给组件
     * @param {string} 含千分位的钱数
     */
    function updateAmount(newAmount) {
        setAmount(newAmount);
    }

    return (
        <div className="m-billCalc">
            <BasePage
                onClick={handleBlur} // 点击外部，使输入框失去焦点
            >
                <Header>
                    <Input // 这里的输入框是 div 模拟实现的，只是展示加上光标、功能按钮
                        onTap={() => { setInputFocus(true); }} // 点击输入框，聚焦
                        onClear={() => { updateAmount(''); }} // 清空输入框
                        amount={amount} // 输入框里显示的金额
                        isFocus={isInputFocus} // 设置输入框是否聚焦状态
                    />
                </Header>
                <Container
                    component={props.containerComponent} // 这里展示外部传入的组件
                />
                <FixedFooter onClick={() => { handleSubmit(); }} />
            </BasePage>
            <Keyboard
                isShow={isInputFocus}
                onNumTap={(val) => { handleKeyboard(KEY_TYPE.num, val); }}
                onDeleteTap={() => { handleKeyboard(KEY_TYPE.del); }}
                onOkTap={() => { handleKeyboard(KEY_TYPE.ok); }}
            />
        </div>
    );
}
```

### 4.2 API 方式封装公用弹层 Modal 组件

传统的弹层组件，都是先定义一个 Modal，然后控制 show 属性来展示隐藏
```html
<Modal show={true}>
    <Content />
</Modal>
```

上述组件有一些弊端：
1. 需要防重：页面里写了多个 modal 组件时，有可能同时弹出多层，开启新弹层时，需要手动关闭原有弹层
2. 冗余加载：刚进入页面，页面也加载了弹层，耗费了时间。弹层可以等需要时再加载。
3. 传参不方便：控制开关的 show，和弹层组件有时并不在同一个组件内，需要额外的传参


自己通过优化使用了 API 的调用方式，解决了以上 3 个问题，简化了调用逻辑

```js
Modal.show(<Content propA="1"/>) // 初始化
Modal.show(<Content propA="2"/>) // 更新 model
Modal.hide() // 立即关闭卸载 modal
Modal.hide(3) // 3秒后关闭
```

具体实现代码为,
这里的 ModalComponent 是一个通用 UI 组件，黑色半透明背景，覆盖全屏，内部元素默认上下左右居中显示

```javascript
/**
 * API 方式调用 Model 弹层
 *
 * Modal.show(Component):
 * 1. 没有弹层时，在 body 末尾创建一个，并将自定义的组件放置在弹层中央
 * 2. 弹层已经显示时，不创建，只 render 更新弹层中心的组件
 *
 * Modal.hide():
 * 立即关闭弹窗，并卸载移除弹层元素，会触发内部组件卸载的生命周期
 *
 * Modal.hide(second):
 * 传入参数秒，表示弹层最少显示的时间
 * 若时间不够，延迟关闭弹窗
 * 若时间已够，立即关闭弹窗
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ModalComponent from './../component/Modal';

export default class Modal {
    static modal = null;
    static timer = null;
    static ChildComponent = null;
    static showTime = 0;
    static createModal = () => {
        if (!Modal.modal) {
            Modal.modal = document.body.appendChild(document.createElement('div'));
        }
    }

    static removeModal = () => {
        ReactDOM.unmountComponentAtNode(Modal.modal);
        document.body.removeChild(Modal.modal);
        Modal.modal = null;
    }

    static show = (component, config) => {
        Modal.clearTimer();
        Modal.createModal();
        Modal.showTime = Date.now();
        Modal.ChildComponent = component;
        ReactDOM.render(
            <ModalComponent show {...config}>
                <Modal.ChildComponent modal={Modal} />
            </ModalComponent>,
            Modal.modal
        );
    };

    static hide = (keepTime) => {
        if (Modal.modal) {
            Modal.clearTimer();
            if (!keepTime || keepTime <= 0) {
                // 不传时间，立即消失
                Modal.removeModal();
            } else {
                // 传时间（秒），等待足够时间后消失，避免轮询时弹窗一闪而过
                const restTime = (keepTime * 1000) - (Date.now() - Modal.showTime);
                if (restTime > 0) {
                    Modal.timer = setTimeout(() => {
                        Modal.removeModal();
                    }, restTime);
                } else {
                    Modal.removeModal();
                }
            }
        }
    }

    static clearTimer = () => {
        if (Modal.timer) {
            clearTimeout(Modal.timer);
        }
    }
}
```
