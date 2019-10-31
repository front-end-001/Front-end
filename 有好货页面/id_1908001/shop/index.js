import TabContainer from './component/TabContainer'
import ScrollContainer from './component/ScrollContainer'
import ListView from './component/ListView'
import css from './index.css'
import Carousel from './component/Carousel'
import { myCreate } from './tool/create'

const scrollEnd = () => {
    console.log('加载更多')
}
const images = ['static/slider1.png',
    'static/slider2.png',
    'static/slider3.png']

window.render = function (data) {
    const tab =
        <div style={css.main}>
            <TabContainer className="tab-container">
                <ScrollContainer on-scrollEnd={scrollEnd} tabTitle='推荐' style={css.scroll}>
                    <Carousel data={images} />
                    <h2>超多人收藏的店!</h2>
                    <ListView data={data} />
                </ScrollContainer>
                <ScrollContainer tabTitle='有趣的店' style={css.scroll}>
                </ScrollContainer>
                <ScrollContainer tabTitle='好店' style={css.scroll} />
            </TabContainer>
        </div>
    tab.appendTo(document.body)
}

