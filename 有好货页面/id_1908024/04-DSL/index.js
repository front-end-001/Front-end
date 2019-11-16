import TabView from './TabView.js'
import ScrollView from './ScrollView.js'

import { create } from './create.js'
import ListView from './ListView.js'

function loadMore() {
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多啦！')
    }, 3000)
}

window.render = function(data, root) {
    var c = (
        <TabView style="width:100%;height:100%;">
            <ScrollView
                tab-title="推荐"
                style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px"
                on-scrolToBottom={loadMore}
                placeHolderText="load more"
            >
                <ListView data={data}></ListView>
            </ScrollView>
            <ScrollView tab-title="有趣的店" style="background-color:lightgreen;">
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
                def def def def def def def def def def def def def def def def def def def def def
            </ScrollView>
            <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
        </TabView>
    )
    c.appendTo(document.body)
}
