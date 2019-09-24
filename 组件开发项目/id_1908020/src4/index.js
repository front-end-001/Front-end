class Tab { }
class Div { }
function myCreate(Class, attr,...children) {
  console.log(arguments)
  console.log(children)
  return new Class()
}
var ccc =
  <Tab>
    <Div>1111</Div>
    <Div>222</Div>
    <Div>333</Div>
  </Tab>