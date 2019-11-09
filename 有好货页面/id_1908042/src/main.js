import TabView from './components/TabView'
import ScrollView from './components/ScrollView'
import ListView from './components/ListView'
import './style/style.less'

const loadMore = () => {
    this.setAttribute('placeHolderText', '加载中...')
    setTimeout(() => {
        this.setAttribute('placeHolderText', 'no more')
    }, 1000)
}

const refresh = (cb) => {
    fetch('./data/list.json')
        .then(r => r.json())
        .then(data => cb())
}

window.render = data => {
    const component = 
        <TabView style="width: 100%; height: 100%">
            <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} placeHolderText='加载中...' on-refresh={refresh}>
                <ListView data={data}></ListView>
            </ScrollView>
            <ScrollView tab-title="有趣的店" style="background: lightgreen"></ScrollView>
            <ScrollView tab-title="品牌新店" style="background: lightblue"></ScrollView>
        </TabView>

    component.appendTo(document.body)
}
