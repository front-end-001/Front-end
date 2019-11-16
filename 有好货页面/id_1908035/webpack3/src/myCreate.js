import Text from "./Text.js"
import Wrapper from "./Wraper.js";
export function myCreate(Class, attributes,...children){
  console.log(arguments)
  let object
    
    if(typeof Class == "string")
        object = new Wrapper(Class);
    else
        object = new Class();  
  for(let name in attributes) {
      if(name.match(/^on-([\s\S]+)$/)){
          object.addEventListener(RegExp.$1, attributes[name])
      } else {
          object.setAttribute(name, attributes[name]);
      }
  }
  for(let child of children){
      if(typeof child ==='string'){
          console.log(new Text(child),2222222)
          object.appendChild(new Text(child))
      }else{
          object.appendChild(child)
      }
  }
  
  return object; 
}
// function create(Class, attributes, ...children){ 

//     let object
    
//     if(typeof Class == "string")
//         object = new Wrapper(Class);
//     else
//         object = new Class();

//     for(let name in attributes) {
//         if(name.match(/^on-([\s\S]+)$/)){
//             object.addEventListener(RegExp.$1, attributes[name])
//         } else {
//             object.setAttribute(name, attributes[name]);
//         }
//     }
        
//     for(let child of children) {
//         if(child instanceof Array) {
//             for(let c of child) {
//                 if(typeof c === "string") {
//                     object.appendChild(new Text(c));
//                 } else {
//                     object.appendChild(c);
//                 }
//             }
//         } else if(typeof child === "object" ) {
//             object.appendChild(child);
            
//         } else {
//             object.appendChild(new Text(child.toString()));
//         }
//     }
    
//     return object; 
// }