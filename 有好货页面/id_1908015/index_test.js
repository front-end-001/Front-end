let log = function() {
  console.log(...arguments)
};

// 第三个参数为嵌套函数的返回值
function myCreate(){
  log(arguments);
  // let object = new Class();
  // for(let name in attributes) {
  //
  // }
  // return object;

  return arguments[0]
}

class A {}

class B {}

// 这里转换成函数调用
// var c = myCreate(A, {attr: 'a'},
//           myCreate(B, {attr: 'b'},
//             myCreate("div", null, "xxx")));
let c = (<A attr={'a'}>
  <B attr={'b'}>
    <div>xxx</div>
  </B>
</A>);

log(c);
