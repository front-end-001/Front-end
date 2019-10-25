/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 19:27:58
 * @LastEditTime: 2019-09-07 20:14:14
 * @LastEditors: Please set LastEditors
 */
import  Carousel  from "./component.js";
function myCreate(Class, attributes) {
    var object = new Class();
    console.log(object)
  for (let name in attributes) object.setAttribute(name, attributes[name]);
  return object;
}

var c = <Carousel width="100" height="100"></Carousel>;
c.appendTo(document.body);
