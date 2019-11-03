import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

import { create } from './components/create.js'

function loadMore(loadDone) {
    this.setAttribute('placeHolderText', '加载中，请稍后...')
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多了')
    }, 1000)
}

function refresh(cb) {
    fetch('./list.json').then(r=>{
        return r.json()
    }).then(data=>{
        console.log(data)
        cb()
    })
    
}

window.render = function (data) {
    let c = <TabView style="width: 100%; height: 100%">
        <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText='加载中，请稍后' on-refresh={refresh}>
            <ListView data={data}></ListView>
        </ScrollView>
        <ScrollView tab-title="有趣的店" style="background: lightgreen"></ScrollView>
        <ScrollView tab-title="品牌新店" style="background: lightblue"></ScrollView>
    </TabView>

    c.appendTo(document.body)
}


