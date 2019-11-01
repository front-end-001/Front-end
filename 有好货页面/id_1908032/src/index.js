import Tab from './components/Tab';
import Div from './components/Div';
import ScrollView from './components/ScrollView';
import Title from './components/Title';
import { create } from './create';
import ListShop from './components/ListShop';
import Carousel from './components/Carousel';
import ListView from './components/ListView';
import Shop from './components/Shop';
import ShopCover from './components/ShopCover';
import TabButton from './components/TabButton';
import ShopItem from './components/ShopItem';
import ShopItemInfo from './components/ShopItemInfo';
import './app.scss';

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
        images: ['https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2200595984506/O1CN01vcg0Wh1j9nEttBRLN_!!0-item_pic.jpg_460x460Q90.jpg', 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/1865963391/O1CN01aGsEHv1av7cmYKLcg_!!1865963391-0-pixelsss.jpg_460x460Q90.jpg'],
        mainImg: 'https://gdp.alicdn.com/imgextra/i3/766568254/O1CN01jNbVh02AqNh4vIJ6k_!!766568254.jpg',
        notice: '乐高官方旗舰店',
    },
    { 
        logo: 'https://img.alicdn.com/tfscom/TB1YNCYiHr1gK0jSZFDXXb9yVXa.jpg_q90.jpg', 
        name: '索尼官方旗舰店', 
        images: ['https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/782731205/O1CN01FMsUgD1KlvpGues0U_!!0-item_pic.jpg_460x460Q90.jpg', 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i1/782731205/O1CN01qslZxs1Klvp92Wvfe_!!0-item_pic.jpg_460x460Q90.jpg'],
        mainImg: 'https://gdp.alicdn.com/imgextra/i2/782731205/O1CN01AGifkt1KlvpDzLTty_!!782731205.jpg',
        notice: '索尼大法好!',
    },
]

let buttons = ['全部','小惊喜','想不到'];

var c = <Tab style="width: 100%;height: 100%;">
    <ScrollView 
        tab-title="推荐" 
        default={true}
        style="-webkit-overflow-scrolling:touch;font-size: 50px; overflow: auto;"
    >
        {/* <Carousel data={imgs} width={window.outerWidth}></Carousel> */}
        <div style={{ width: '100%', height: '492px' }}></div>
        <div style="padding: 40px 34px;">
            <Title style="font-size:46px; color: rgba(51, 51, 51, 1); font-weight: bold">超多人收藏的店！</Title>
        </div>
        <div style="display: flex; margin: 0 34px 35px 34px;">
            {
                shops.map((shop, index) => (
                    <div style={{flex: 1, marginRight: index === 0 ? '25px' : '' }}>
                        <Shop data={shop} />
                    </div>
                ))
            }
        </div>
        <ListView 
            //TODO:这里renderItem必须要在data之前，否者会报错，待优化
            renderItem={item => <ListShop data={item}></ListShop>}
            data={shops} 
        />
    </ScrollView>
    <ScrollView tab-title="有趣的店" style="font-size: 50px; overflow: scroll;">
        <div class="header-title">
            <span style={{fontSize: '46px', color: '#fff'}}>新奇好店都在这</span>
            <TabButton data={buttons} curr={0} />
        </div>
        <ListView 
            //TODO:这里renderItem必须要在data之前，否者会报错，待优化
            renderItem={(item, index) => <ShopItem isReverse={ index / 2 != 0 }  data={[]} /> }
            data={shops} 
        />
        
    </ScrollView>
    <ScrollView tab-title="品牌新店" style="font-size: 50px; overflow: scroll;">
        <ShopItemInfo data={{}} />
    </ScrollView>
</Tab>

c.appendTo(document.body);