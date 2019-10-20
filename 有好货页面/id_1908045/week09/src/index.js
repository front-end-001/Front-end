import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

import tree from './my.component'


window.render = function (data) {
    let c = tree

    c.appendTo(document.body)
}


