import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

function loadMore(loadDone) {
    this.setAttribute('placeHolderText', '加载中，请稍后...')
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多了')
    }, 1000)
}

function refresh(cb) {
    fetch('./list.json').then(r=>r.json()).then(data=>{ cb() })
    
}

window.render = function (data) {
    const component = <TabView style="width: 100%; height: 100%">
        <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText='加载中，请稍后' on-refresh={refresh}>
            <ListView type="Recommonedned" data={data}></ListView>
        </ScrollView>
        <ScrollView tab-title="有趣的店" on-scrollToBottom={loadStoreMore} placeHolderText="加载中，请稍后" on-refresh={refreshStore}></ScrollView>
        <ScrollView tab-title="品牌新店"></ScrollView>
    </TabView>

    component.appendTo(document.body)
}


