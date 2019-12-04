import TabView from "./teacher/tabview.js";
import ScrollView from './teacher/scrollview.js';
import ListView from './teacher/listview';
import {create} from './teacher/create.js';
// import tree from './my.component';
import Carousel from './carouselview.js';

/*
* 禁用系统的scroll
* */
function loadMore() {
    this.setAttribute('placeHolderText', '加载中......');
    setTimeout(() => {
        this.setAttribute('placeHolderText', '没有更多了');
        console.log('end', Date.now());
        this.setAttribute('triggered', false);
    }, 2500);
}

window.render = function (data, root) {
    let cardView3 = JSON.parse(JSON.stringify(data));
    cardView3.dataType = 'cardview3';
    let pictures = [
        "https://img.alicdn.com/imgextra/i4/739179444/O1CN01WomSRa2JdOw1a4KAa_!!739179444.jpg_430x430q90.jpg",
        "https://img.alicdn.com/imgextra/i1/3954877919/O1CN01pQ18Jj28MwxyqWBXe_!!3954877919.jpg_430x430q90.jpg",
        "https://img.alicdn.com/imgextra/i3/3954877919/O1CN01V0UUen28Mwy1c9xR1_!!0-item_pic.jpg_430x430q90.jpg",
        "https://img.alicdn.com/imgextra/i4/2274338009/O1CN01vC8AkK292AdnMTgq5_!!2274338009.jpg_430x430q90.jpg"
    ];
    let c = /*<div>
        <div style="height: 279px; background-color: #9e48ff;">
            <div style="display: flex; align-items: center; height: 100%;">
                <div style="width: 33.33%;">

                </div>
                <div
                    style="display: flex; align-items: center;width: 33.33%; font-family: PingFangSC-Medium; font-size: 64px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #FFFFFF;">
                    每日好店
                </div>
                <div style="width: 33.33%;"></div>
            </div>
        </div>*/
        <TabView style="width:100%;height:100%;">
            <ScrollView tab-title="推荐" placeHolderText="加载更多" on-scrolltobottom={loadMore}
                        style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:#f8f8f9;white-space:normal;font-size:50px">
                <Carousel
                    style="margin: 28px; height: 492px; width: 924px;; overflow: hidden; white-space: nowrap;"
                    pictures={pictures}>
                </Carousel>
                <div
                    style="margin: 69px 34px 40px; height: 43px; font-family: PingFangSC-Medium; font-size: 46px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #333333;">
                    超多人气收藏的店
                </div>
                <div style="margin: 0 28px 35px; display: flex; width: 924px;">
                    <div
                        style="height: 361px; width: 450px; margin-right: 24px; border-radius: 18px; background-color: #fefefe;">
                        <div style="margin: 27px 35px; display: flex;">
                            <div style="width: 78px; height: 78px;">
                                <img style="width: 100%; height: 100%; border-radius: 50%;"
                                     src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573301646402&di=610f315e87317c7fdb4c3c55ee04a65a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f0305548ff320000019ae937d7f2.jpg%401280w_1l_2o_100sh.jpg"
                                     alt=""/>
                            </div>
                            <div style=" height: 78px; display: flex; flex-flow: column;">
                                <div
                                    style="margin-left: 18px; height: 34px; font-family: PingFangSC-Regular; font-size: 36px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #333333;">
                                    极客时间旗舰店
                                </div>
                                <div
                                    style="margin:18px 0 0 18px; width: 63px; height: 30px; font-family: PingFangSC-Regular; font-size: 26px; line-height: 25px; background-color: #ee0507; border-radius: 15px; color: #FFFFFF;">天猫
                                </div>
                            </div>
                        </div>
                        <div style="margin: 0 35px 30px 35px; height: 199px; display: flex;">
                            <div style="border-radius: 18px; height: 100%; width: 199px; margin-right: 28px;">
                                <img style="border-radius: 18px; width:100%; height:100%"
                                     src="https://img.alicdn.com/imgextra/i1/3954877919/O1CN01pQ18Jj28MwxyqWBXe_!!3954877919.jpg_430x430q90.jpg"
                                     alt=""/>
                            </div>
                            <div style="border-radius: 18px; height: 100%; width: 199px;">
                                <img style="border-radius: 18px; width:100%; height:100%"
                                     src="https://img.alicdn.com/imgextra/i3/2191160435/TB19WqyqASWBuNjSszdXXbeSpXa_!!0-item_pic.jpg_430x430q90.jpg"
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                    <div style="height: 361px; width: 450px; border-radius: 18px; background-color: #fefefe;">
                        <div style="margin: 27px 35px; display: flex;">
                            <div style="width: 78px; height: 78px;">
                                <img style="width: 100%; height: 100%; border-radius: 50%;"
                                     src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573301792809&di=3912196aacf69dd84d60d5aaf9c0adc8&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F27%2F11%2F16pic_2711338_b.jpg"
                                     alt=""/>
                            </div>
                            <div style=" height: 78px; display: flex; flex-flow: column;">
                                <div
                                    style="margin-left: 18px; height: 34px; font-family: PingFangSC-Regular; font-size: 36px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #333333;">
                                    当当旗舰店
                                </div>
                                <div
                                    style="margin:18px 0 0 18px; width: 63px; height: 30px; font-family: PingFangSC-Regular; font-size: 26px; line-height: 25px; background-color: #ee0507; border-radius: 15px; color: #FFFFFF;">天猫
                                </div>
                            </div>
                        </div>
                        <div style="margin: 0 35px 30px 35px; height: 199px; display: flex;">
                            <div style="border-radius: 18px; height: 100%; width: 199px; margin-right: 28px;">
                                <img style="border-radius: 18px; width:100%; height:100%"
                                     src="https://img.alicdn.com/imgextra/i1/2406931838/O1CN01WjXfUV1PRqWaM5Au0_!!2406931838.jpg_1152x1920Q50s50.jpg"
                                     alt=""/>
                            </div>
                            <div style="border-radius: 18px; height: 100%; width: 199px;">
                                <img style="border-radius: 18px; width:100%; height:100%"
                                     src="https://img.alicdn.com/imgextra/i4/2274338009/O1CN01vC8AkK292AdnMTgq5_!!2274338009.jpg_430x430q90.jpg"
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <ListView data={data}></ListView>
            </ScrollView>
            <ScrollView tab-title="有趣的店" placeHolderText="load more" on-scrolltobottom={loadMore}
                        style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightgreen;white-space:normal;font-size:50px">
                <ListView data={data}></ListView>
            </ScrollView>
            <ScrollView tab-title="品牌新店" placeHolderText="load more" on-scrolltobottom={loadMore}
                        style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:#FFFFFF;">
                <ListView data={cardView3}></ListView>
            </ScrollView>
        </TabView>
    // </div>;

    // let c = tree;
    // c = <div>
    //     <span class="x">000</span>
    //     <br/><br/>
    //     <ListView data={[{abc: 123 * 123}]}></ListView>
    // </div>;
    c.appendTo(document.body);
};
