import { Carousel } from "./Carousel.js";

import Tab from "./base-component/Tab.js"
import Div from "./base-component/Div.js"
import Text from './base-component/Text';
import ScrollView from './base-component/ScrollView';
import Title from './base-component/Title';
import ListView from './component-demo/ListView';

import myCreate from './utils/myCreate';


var c = <Div>
            <Title></Title>
            <Tab style="width:100%;height: 700px;">
                <Div tab-title="推荐" style="overflow: scroll">
                    <ScrollView>
                        <Div class="carousel-wrap" style="width: 7.04rem; height: 3.43rem;margin: 0 .23rem; border-radius: .25rem; overflow: hidden;">
                        <Carousel style="width:100%;height:500px;" width={500} data={[
                            "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner1.jpg",
                            "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner2.jpg",
                            "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner3.jpg",
                        ]}>
                        </Carousel>
                        </Div>
                        <ListView data={[{a: '12312', b: 'dsafds'}]}></ListView>
                    </ScrollView>
                </Div>
                <Div tab-title="有趣的店"  style="background-color:lightgreen;">
                    <Div> dafdsafds </Div>
                </Div>
                <Div tab-title="品牌新店" style="background-color:pink;"></Div>
            </Tab>
        </Div>
c.appendTo(document.body);
