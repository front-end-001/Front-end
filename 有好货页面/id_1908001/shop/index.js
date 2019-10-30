import TabContainer from './component/TabContainer'
import ScrollContainer from './component/ScrollContainer'
import ListView from './component/ListView'
import css from './index.css'
import Carousel from './../../../组件开发项目/id_1908001/component/Carousel'
import { myCreate } from './tool/create'

const scrollEnd = () => {
    console.log('加载更多')
}
const images = ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg']

window.render = function (data) {
    const tab =
        <div style={css.main}>
            <TabContainer className="tab-container">
                <ScrollContainer on-scrollEnd={scrollEnd} tabTitle='推荐' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:yellow">
                    <ListView data={data} class='color-blue'>123</ListView>

                </ScrollContainer>
                <ScrollContainer tabTitle='有趣的店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:green" />
                <ScrollContainer tabTitle='好店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:red" />
            </TabContainer>
        </div>
    tab.appendTo(document.body)
}

