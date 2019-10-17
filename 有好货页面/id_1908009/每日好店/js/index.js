import { myCreate } from '../js/creat.js'
import Tab from '../commponents/Tab.js';
import Scroll from '../commponents/Scroll.js';
import Head from '../commponents/Head.js'
import Text from '../commponents/Text.js'
import List from '../commponents/List.js';
import Carousel from '../commponents/Carousel.js'

function loadMore(a){
    // console.log(a)
    console.log('load more')
    setTimeout(()=>{
        this.setAttribute('placeHolderText','nothing')
    },5000)
}

window.render = function(data){
   // console.log(data)
    let app = document.getElementById('app')
    var haed = <Head>
        {/* <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/back.svg'/>
    <p>每日好店</p>
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/share.svg' />
    <img src='http://static001.geekbang.org/univer/classes/js_dev/static/icon/more.svg'/> */}
    </Head>

    var tab = <Tab style='width:100%;height:100%;overflow-y:auto'>
        <Scroll tab-title='推荐'  on-scrolToBottom={loadMore} placeHolderText='load more' class='bg2'>
            <Carousel></Carousel>
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

