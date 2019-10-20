import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

import { create } from './components/create.js'
// import tree from './my.component'

// console.log(tree)


window.render = function (data,root) {
    let c = <div>
        <ListView data={[{a:1,b:2}]}></ListView>
    </div>

    c.appendTo(document.body)
}


