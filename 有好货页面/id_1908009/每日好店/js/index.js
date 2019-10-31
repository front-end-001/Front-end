import { myCreate } from '../js/creat.js'
import Tab from '../commponents/Tab.js';
import Scroll from '../commponents/Scroll.js';
import Head from '../commponents/Head.js'
import Text from '../commponents/Text.js'
import List from '../commponents/List.js';
import Carousel from '../commponents/Carousel.js'

function loadMore(a){
    // console.log(a)
    setTimeout(()=>{
        this.setAttribute('placeHolderText','nothing')
    },5000)
}
let imgData = [
    'https://miro.medium.com/max/1200/1*ywwgEHXg0M0m1IhFFUpGzw.jpeg',
    'https://www.creativeboom.com/uploads/articles/f9/f919c497156e23e78445af58d7fce641db0a0e18_1100.jpg',
    'https://cdn.mos.cms.futurecdn.net/azUHp3WBrAGumLLiVu5KXf.jpg'
]

window.render = function(data){
   // console.log(data)
    let app = document.getElementById('app')
    var haed = <Head>
        {/* <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/back.svg'/>
    <p>每日好店</p>
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/share.svg' />
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/more.svg'/> */}
    </Head>

    var tab = <Tab style='width:100%;height:100%'>
                    <Scroll tab-title='推荐'  on-scrolToBottom={loadMore} placeHolderText='...' class='bg2'>
                        <Carousel class='Carousel' data={imgData}></Carousel>
                        <p class='tab1-title'>超多人喜欢的店!</p>
                        <List data={data}></List>
                    </Scroll>
                    <Scroll tab-title='有趣的店' >
                    </Scroll>
                    <Scroll tab-title='品牌新店' ></Scroll>
            </Tab>
    //app.appendChild(head)
    tab.appendTo(app)

//haed
}

