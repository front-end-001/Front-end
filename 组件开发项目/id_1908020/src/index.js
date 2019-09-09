import Tab from './components/tab'
import './style.css'
import recommend from './recommend'

const component_constructor = ['Tab']

// function myCreate(Class, attributes, ...children) {
//   console.log(arguments)
//   if (Class.name && component_constructor.findIndex(name => Class.name === name) > -1) {
//     var obj = new Class({
//       el: '#app',
//       children
//     })
//     return obj
//   } else {
//     return document.createElement('div')
//   }
// }

// var c =
//   <Tab>
//     ssss
//   </Tab>

var test_item1 = document.createElement('div')
test_item1.id='tab1'
var test_item2 = document.createElement('div')
test_item2.innerText = "test2"
var test_item3 = document.createElement('div')
test_item3.innerText = "test3"

var tab = new Tab({
  el: '#app',
  item: ['推荐', '有趣的店', '品牌新店'],
  children: [test_item1, test_item2, test_item3]
})
console.log(tab)
recommend()