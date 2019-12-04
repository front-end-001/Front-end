import { myCreate } from '../js/creat.js'
import Tab from '../commponents/Tab.js';
import Scroll from '../commponents/Scroll.js';
import Head from '../commponents/Head.js'
import Text from '../commponents/Text.js'
import List from '../commponents/List.js';
import Carousel from '../commponents/Carousel.js'
import server from '../server/server.js'
import Card1 from '../commponents/Card-1.js'
import Card2 from '../commponents/Card-2.js'
import Card3 from '../commponents/Card-3.js'
import Card4 from '../commponents/Card-4.js'


function loadMoreList1(){
    server.RecommendationPageData().then(res=>{
        addData(res.recommendedShops, 2,list1)
    })
}

function loadMoreList2(){
    server.InterestingPageDataTypeAll().then(res=>{
        let flag = '1'//1 or 2
        let card2Arr = []
        for (let i of res.interestingShops){
            if (card2Arr.length < 3) {
                card2Arr.push(i)
            } else {
                let card = <Card3 type={flag} data={card2Arr} ></Card3>
                list2.root.append(card.root)
                if(flag > 1)flag ='1'; else flag='2';
                card2Arr=[]
            }
        }
    })
}

function loadMoreList3(){
    server.NewPageData().then(res => {
        // console.log(res.newShops)
        addData(res.newShops, 4, list3)
    })
}


function addData(dataArr,type,list,flag=1){//flag是card3的type值
    for (let i of dataArr) {
        i.type = type
        let card
        switch(type){
            case 1: card = <Card1 data={i}></Card1>; break;
            case 2: card = <Card2 data={i}></Card2> ;break;
            case 4: card = <Card4 data={i}></Card4>; break;
        }
        list.root.append(card.root)
    }    
}

let data = []

Promise.all([
        server.InterestingPageDataTypeAll(),
        server.NewPageData(),
        server.RecommendationPageData()
]).then(res=>{
    data = handleRes(res)
    window.render(res, document.body)
})

let list1,list2,list3

window.render = function(res){
    let [data2, data1, data0] = [...data]
    let app = document.getElementById('app')
    var head = <Head></Head>
    list1 = <List data={data0} ></List>
    list2 = <List data={data2.interestingShops}></List>
    list3 = <List data={data1.newShops}></List>
    var tab = <Tab style='width:100%;height:100%'>
                    <Scroll tab-title='推荐'  on-scrolToBottom={loadMoreList1} placeHolderText='...' class='bg2'>
                        <Carousel class='Carousel' data={data0.focusData}></Carousel>
                        <p class='tab1-title'>超多人喜欢的店!</p>
                        {list1}
                    </Scroll>
                    <Scroll tab-title='有趣的店' on-scrolToBottom={loadMoreList2} placeHolderText='...' class='bg2'>
                        <div class='clearfix page2-top'>
                            <p class='page2-title'>新奇好店都在这里</p>
                            <div class='page2-selected'>
                                <div class='item action'>全部</div>
                                <div class='item'>小惊喜</div>
                                <div class='item'>想不到</div>
                            </div>
                        </div>
                        {list2}
                    </Scroll>
                    <Scroll tab-title='品牌新店' class='bg2' placeHolderText='...' on-scrolToBottom={loadMoreList3} >
                       {list3}
                    </Scroll>
            </Tab>
    //app.appendChild(head)
    tab.appendTo(app)

//haed
}
function handleRes(res){
    res.map((val,index)=>{
        switch(index){
            case 0:  for (let i of val.interestingShops){i.type = 3} break;
            case 1:  for (let i of val.newShops) { i.type = 5 } break;
            case 2: 
                for (let i of val.mostFavourateShops) { i.type = 1 }
                for (let i of val.recommendedShops) { i.type = 2 }
            break;
        }
    })
    return res
}

