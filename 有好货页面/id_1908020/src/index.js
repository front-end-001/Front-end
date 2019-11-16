import './index.css'
import Div from './component/Div'
import ListView from './component/ListView'
import create from './create'

function aaaa() {
  console.log('aaaaaaaa')
}

let c =<ListView/>
  // <Div className="container1" >
  //   <Div className="container2" style="color:red;" on-click={aaaa.bind(this)}>111</Div>
  //   <Div className="container3" style="color:green;" >222</Div>
  //   <Div className="container4" style="color:blue;" >333</Div>
  //   {/* asdfasdf
  //   <Div className="container" style="color:green;" >111</Div> */}
  // </Div>

c.appendTo(document.querySelector('#app'))
console.log(c)