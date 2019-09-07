学习笔记

组件与对象的区别：
组件是一个专门用于描述UI的对象。比如增加了 Attribute（特性，强调描述性，字符串）,config,lifecycle等
property（强调从属关系）
<component attribute="v">
property（只能由js来设置）:
component.a = value;

resolve 把一个相对地址变成绝对地址

a.style
a.getAttrbute('style')

一次性同步关系，比如 input 的 value

state 是组件内部特有的，只能由组件内部或由用户输入改变

created ->mount -> mounted -> unmoun -> destroyed
        ->js:change/set ->render/update ->^
        ->user:input    ->^
trade off （权衡）
减少 render 开销，用 vDom 的方式减少开销

children 的模式考量，是需要坑，还是需要填好的需要衡量，比如 button，和 list，button 需要填好的，而 list 需要坑，因为要根据 data 来渲染很多的列表。