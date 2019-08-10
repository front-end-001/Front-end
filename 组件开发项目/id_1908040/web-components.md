# 学习笔记

## 预习资料

1. 按照软件工程的通用思想，组件化可以拆解为4个更基本的概念：

* 复用 - 组件将作为一种复用单元，被用在多处
* 解耦 - 组件本身隔离了变化，组件开发者和业务开发者可以根据组件的约定各自独立开发和测试
* 封装 - 组件屏蔽了内部的细节，组件的使用者可以只关心组件的属性、事件和方法
* 抽象 - 组件通过属性和事件、方法等基础设施，提供了一种描述UI的统一模式，降低了使用者的心智负担

## 课程大纲预习

1. 组件的概念

摘自Wiki:

> An individual software component is a software package, a web service, a web resource, or a module that encapsulates a set of related functions (or data).

一个单独的组件可以是一个封装了一系列相关函数或数据的软件包、web服务、web资源或模块。
关键词：封装

2. 基于组件的软件开发(软件工程)

组件化 -- 基于组件开发软件

摘自Wiki:

> Component-based software engineering (CBSE), also called components-based development (CBD), is a branch of software engineering that emphasizes the separation of concerns with respect to the wide-ranging functionality available throughout a given software system. It is a reuse-based approach to defining, implementing and composing loosely coupled independent components into systems. This practice aims to bring about an equally wide-ranging degree of benefits in both the short-term and the long-term for the software itself and for organizations that sponsor such software.

关键词：reuse-based 复用

3. web组件的概念

web组件的概念定义可以参考Wiki:

> Web组件（英语：Web Components）是W3C正在向HTML和DOM规范添加的一套功能，它允许在Web文档和Web应用程序中创建可重用的小部件或组件。这样做的目的是将基于组件的软件工程引入万维网。组件模型将允许单个HTML元素的封装和互操作性。
> Web组件由四大部分组成，可单独或组合使用。
> - 自定义元素 - 定义新HTML元素的API
> - 影子DOM - 封装的DOM和样式，配以组合化
> - HTML导入 - 将HTML文档导入其他文档的声明方法
> - HTML模板 - template元素，允许文档包含惰性的DOM块

4. 组件规范 -- Web Components

摘自webcomponents.org：

> Web components is a meta-specification made possible by four other specifications:
> - The Custom Elements specification
> - The shadow DOM specification
> - The HTML Template specification
> - The ES Module specification

## 组件规范

1. 自定义标签规范
  1-1 Autonomous custom elements
    自定义标签，必须继承自HTMLElement

```html
  <!-- Create a custom button as an autonomous custom element -->
  <autonomous-button >autonomous-button</autonomous-button>

  <script>
    class AutonomousButton extends HTMLElement {
      constructor() {
        super();
        this.style = 'width:30px;height:20px;border:1px solid gray;cursor: pointer';
        console.log('AutonomousButton');
      }
    }
    customElements.define('autonomous-button', AutonomousButton);
  </script>
```

  1-2 Customized built-ins extend existing HTML elements with custom functionality.
    扩展标签(扩展其它自定义标签或者内置html标签)  -- 疑问？
    可以继承自自定义标签，也可以继承html内置标签

2. 影子DOM规范

  解决了DOM API无法封装的问题

  摘自：https://www.webcomponents.org/specs
  > On its own, the DOM API contains no support for encapsulation. This makes it hard to develop custom elements as style information may “leak” into or out of other elements in the tree; or IDs may overlap between custom elements and other elements in the document.
  > The shadow DOM API overcomes this limitation by letting you attach DOM subtrees to elements in a web document. These subtrees are encapsulated; style information inside them cannot apply to outside elements, and vice versa.
  样式可以封装在内部，id atrribute也可以封装在内部

3. html template规范
  摘自：https://www.webcomponents.org/specs
  > The HTML template element specification defines how to declare fragments of markup that go unused at page load, but can be instantiated later on at runtime. There are no corresponding changes to HTML templates for cross-browser specifications.

  摘自mdn： https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template
  > HTML内容模板（<template>）元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以在运行时使用JavaScript实例化。
  > 将模板视为一个内容片段，存储在文档中供后续使用。虽然解析器在加载页面时确实会处理<template>元素的内容，但这样做只是为了确保这些内容有效；然而，元素的内容不会被呈现。

4. es模块规范
  摘自：https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system
  > The JavaScript specification defines a syntax for modules, as well as some host-agnostic parts of their processing model. This specification defines the rest of their processing model: how the module system is bootstrapped, via the script element with type attribute set to "module", and how modules are fetched, resolved, and executed.
  > The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.

## 总结组件规范
1. 标签(组件名称)可以自定义 -- 外在形式
2. 标签（组件内部）对应的DOM内部的样式、id等不会和其它标签冲突，即相对其它标签，它是个“黑盒”
3. 标签（组件）可以以模块的形式输出接口、被引入 -- 支持ES Module规范
4. 支持内容模板
5. 支持属性、方法、事件自定义

## 参考
[Integration with the JavaScript module system](https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system)
[Custom Elements](https://w3c.github.io/webcomponents/spec/custom/)
[自定义元素 v1：可重用网络组件](https://developers.google.com/web/fundamentals/web-components/customelements)
[Web Component Specifications](https://www.webcomponents.org/specs)
[基于组件的软件工程(软件开发)](https://en.wikipedia.org/wiki/Component-based_software_engineering)
[组件](https://baike.baidu.com/item/%E7%BB%84%E4%BB%B6/6902128?fr=aladdin)
[Web组件](https://zh.wikipedia.org/wiki/Web%E7%BB%84%E4%BB%B6)
