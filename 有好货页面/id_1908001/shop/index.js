import TabContainer from './component/TabContainer'
import ScrollContainer from './component/ScrollContainer'
import ListView from './component/ListView'
import { myCreate } from './create'

const scrollEnd = () => {
    console.log('加载更多')
}
window.render = function (data) {
    const tab = <TabContainer className="tab-container">
        <ScrollContainer on-scrollEnd={scrollEnd} tabTitle='推荐' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:yellow">
            <ListView data={data}>123</ListView>
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb fjlsadjflsajflsajflsjflsjflkjslfjlsjflksjflksjf
            abb
            abb
            abb
        </ScrollContainer>
        <ScrollContainer tabTitle='有趣的店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:green" />
        <ScrollContainer tabTitle='好店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:red" />
    </TabContainer>
    tab.appendTo(document.body)
}

