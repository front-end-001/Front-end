# 学习笔记

## Vue组件规范
摘自：https://cn.vuejs.org/v2/guide/components.html
> 组件是可复用的 Vue 实例，且带有一个名字

[Components Basics](https://vuejs.org/v2/guide/components.html)
[Components In-Depth](https://vuejs.org/v2/guide/components-registration.html)
[Single File Components](https://vuejs.org/v2/guide/single-file-components.html)

### Vue组件总结
1. 有组件名
2. 有生命周期及其钩子
3. 可被复用
4. 父子组件传递数据 -- 可组合
5. 通过插槽分发内容
6. 


## React组件规范
摘自：https://reactjs.org/docs/components-and-props.html
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
> Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

### React组件总结
1. 组件有生命周期
2. 支持function和class定义两种方式
3. 组件可以组合 -- 父子、兄弟
4. 

## Angular组件规范

  摘自：https://angular.cn/guide/architecture
  > 每个 Angular 应用都至少有一个组件，也就是根组件，它会把组件树和页面中的 DOM 连接起来。 每个组件都会定义一个类，其中包含应用的数据和逻辑，并与一个 HTML 模板相关联，该模板定义了一个供目标环境下显示的视图。

  摘自：https://angular.cn/guide/architecture-components
  > 你在类中定义组件的应用逻辑，为视图提供支持。 组件通过一些由属性和方法组成的 API 与视图交互。

1. 组成
> 组件包含三部分：
> - 一个组件类，它用来处理数据和功能。上一节，我们在组件类中定义了商品数据和 share() 方法。
> - 一个 HTML 模板，它决定了用户的呈现方式。在上一节中，你修改了商品列表的 HTML 模板，以显示每个商品的名称、描述和 “Share” 按钮。
> - 组件专属的样式定义了外观和感觉。商品列表中还没有定义任何样式。
2. 有生命周期
3. 
### Angular组件总结

[angular.cn](https://angular.cn/start)
[angular组件简介](https://angular.cn/guide/architecture-components)
[Components and Props](https://reactjs.org/docs/components-and-props.html)
[React.Component](https://reactjs.org/docs/react-component.html)
