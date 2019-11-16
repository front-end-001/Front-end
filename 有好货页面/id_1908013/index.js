import TabView from './TabView'
import ScrollView from './ScrollView'
import ListView from './ListView'
import BrandList from './BrabdStore'

import create from './create.js'

function loadMore () {
    console.log('load more')
}

window.render = function (obj, container) {
    console.log(obj)
    var c = <TabView style="width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column">
        <ScrollView tab-title="推荐" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;background-color:#eee;white-space:normal;background:url('./images/bg.png') center top no-repeat;background-size:100%">
            <ListView data={obj}/>
        </ScrollView>
        <ScrollView tab-title="有趣的店" style="-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;">
            
        </ScrollView>
        <ScrollView tab-title="品牌新店" style="-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;">
            <BrandList data={obj.mostFavourateShops}/>
        </ScrollView>
    </TabView>
    c.appendTo(container);
}

