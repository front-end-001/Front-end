import Tab from './Tab';
import Div from './Div';
import ScrollView from './ScrollView';
import Title from './Title';
import { create } from './create';
import ListShop from './ListShop';
import Carousel from './Carousel';
import ListView from './ListView';
import Shop from './Shop';

let imgs = [
    {
        url: 'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg',
    },
    {
        url: 'https://img.alicdn.com/tfs/TB1N45jX.H1gK0jSZSyXXXtlpXa-966-644.jpg_970x970q100.jpg',
    },
    {
        url: 'https://img.alicdn.com/tps/i4/TB1ROUJjxD1gK0jSZFKSuwJrVXa.jpg_970x970q100.jpg',
    }
]

var c = <Tab style="width: 100%;height: 100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;font-size: 50px; overflow: auto;">
        {/* <Carousel data={imgs}></Carousel> */}
        <Div style="padding: 40px 34px;">
            <Title style="font-size:46px; color: rgba(51, 51, 51, 1); font-weight: bold">超多人收藏的店！</Title>
        </Div>
        <div style="display: flex; margin: 0 34px 35px 34px;">
            <div style="flex: 1; margin-right: 25px;">
                <Shop />
            </div>
            <div style="flex: 1">
                <Shop />
            </div>
        </div>
        <ListShop></ListShop>
        <ListView data={[1,2,3]}  />
    </ScrollView>
    <ScrollView tab-title="有趣的店" style="font-size: 50px; overflow: scroll;">
        456 
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="font-size: 50px; overflow: scroll;">
        789
    </ScrollView>
</Tab>

c.appendTo(document.body);