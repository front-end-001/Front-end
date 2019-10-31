import { create } from './components/create.js'
import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

import {getList} from './api'

function loadMore(loadDone) {
    this.setAttribute('placeHolderText', '加载中，请稍后...')
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多了')
    }, 1000)
}

function refresh(cb) {
    getList().then(data=>{
        console.log(data)
        cb()
    }) 
}

function loadStoreMore(loadDone) {
    this.setAttribute('placeHolderText', '加载中，请稍后...')
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多了')
    }, 1000)
}

function refreshStore(cb) {
    getList().then(data=>{
        console.log(data,'123')
        cb()
    })
}

window.render = function (data) {
    let c = <TabView style="width: 100%; height: 100%">
        <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText='加载中，请稍后' on-refresh={refresh}>
            <ListView type='Recommended' data={data}></ListView>
        </ScrollView>
        <ScrollView tab-title="有趣的店" on-scrollToBottom={loadStoreMore} placeHolderText='加载中，请稍后' on-refresh={refreshStore}>
            {/* <ListView type='' data={data}></ListView> */}
        </ScrollView>
        <ScrollView tab-title="品牌新店">
            {/* <ListView type='' data={data}></ListView> */}
        </ScrollView>
    </TabView>

    c.appendTo(document.body)
}


