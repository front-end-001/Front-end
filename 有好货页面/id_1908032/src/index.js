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

let shops = [
    { 
        logo: 'https://img.alicdn.com/tfscom/TB127a5gwDD8KJjy0FdXXcjvXXa.jpg_b.jpg', 
        name: '乐高官方旗舰店', 
        images: ['https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2200595984506/O1CN01vcg0Wh1j9nEttBRLN_!!0-item_pic.jpg_460x460Q90.jpg', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/1865963391/O1CN01aGsEHv1av7cmYKLcg_!!1865963391-0-pixelsss.jpg_460x460Q90.jpg']
    },
    { 
        logo: 'https://img.alicdn.com/tfscom/TB1YNCYiHr1gK0jSZFDXXb9yVXa.jpg_q90.jpg', 
        name: '索尼', 
        images: ['https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/782731205/O1CN01FMsUgD1KlvpGues0U_!!0-item_pic.jpg_460x460Q90.jpg', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i1/782731205/O1CN01qslZxs1Klvp92Wvfe_!!0-item_pic.jpg_460x460Q90.jpg']
    },
]

var c = <Tab style="width: 100%;height: 100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;font-size: 50px; overflow: auto;">
        {/* <Carousel data={imgs}></Carousel> */}
        <Div style="padding: 40px 34px;">
            <Title style="font-size:46px; color: rgba(51, 51, 51, 1); font-weight: bold">超多人收藏的店！</Title>
        </Div>
        <div style="display: flex; margin: 0 34px 35px 34px;">
            {
                shops.map((shop, index) => (
                    <div style={{flex: 1, marginRight: index === 0 ? '25px' : '' }}>
                        <Shop data={shop} />
                    </div>
                ))
            }
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