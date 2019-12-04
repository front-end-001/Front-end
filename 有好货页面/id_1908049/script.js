import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"
import ListView from "./ListView.js"
import './ListView.css'
import logo from './src/img/logo.png'
import prod from './src/img/prod.png'
import storeLogo from './src/img/store-logo.png'
import {Carousel} from './src/component/Carousel'

import Div from "./Div.js"
import {create} from "./create.js"

import tree from "./my.component";


function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

window.render = function(data, root){
    // console.log("cssobj",cssobj);
    let imagedata = [
        {
          "image": "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner1.jpg",
          "url": "https://time.geekbang.org/column/intro/100023201"
        },
        {
          "image": "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner2.jpg",
          "url": "https://time.geekbang.org/column/intro/100023201"
        },
        {
          "image": "https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner3.jpg",
          "url": "https://time.geekbang.org/column/intro/100023201"
        }
      ];
    var c = <div class="header-background">
        <header class="flex-between header" style="padding-top:100px">
            <img src="http://static001.geekbang.org/univer/classes/js_dev/static/icon/back.svg"></img>
            <img src={logo} class="logo"></img>
            <div>
            <img src="http://static001.geekbang.org/univer/classes/js_dev/static/icon/share.svg" style="margin-right: 30px; width:50px"></img>
            <img src="http://static001.geekbang.org/univer/classes/js_dev/static/icon/more.svg" style="margin-right: 30px"></img>
            </div>
        </header>

        <TabView style="width:100%;height:100%;margin-top:60px;">
        <ScrollView tab-title="推荐" placeHolderText="load more" on-scrolToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;">
          <div class="flex-center" style="margin-top: 30px">
            <Carousel data={imagedata} class="carousel"></Carousel>
          </div>
          <div style="padding:0 30px">
            <div class="title">超多人收藏的店！</div>
            <div class="flex-between mt-30">
              <div class="store1">
                <div class="store1-header flex-right">
                  <img src={storeLogo} class="storeLogo"></img>
                  <div>
                    <div class="storeName">极客时间旗舰店</div>
                    <img src="http://gw.alicdn.com/tfs/TB1ipgJvYZnBKNjSZFhXXc.oXXa-104-48.png_110x10000.jpg_.webp" style="width:66px; height:30px;"></img>
                  </div>
                </div>
                <div class="flex-right mt-30">
                  <img src={prod} class="prod" style="margin-right:28px" />
                  <img src={prod} class="prod" />
                </div>
              </div>

              <div class="store1">
                <div class="store1-header flex-right">
                  <img src={storeLogo} class="storeLogo"></img>
                  <div>
                    <div class="storeName">极客时间旗舰店</div>
                    <img src="http://gw.alicdn.com/tfs/TB1ipgJvYZnBKNjSZFhXXc.oXXa-104-48.png_110x10000.jpg_.webp" style="width:66px; height:30px;"></img>
                  </div>
                </div>
                <div class="flex-right mt-30">
                  <img src={prod} class="prod" style="margin-right:28px" />
                  <img src={prod} class="prod" />
                </div>
              </div>
            </div>
            <div class="store2 mt-30">
                <div class="store1-header flex-right">
                  <img src={storeLogo} class="storeLogo"></img>
                  <div>
                    <div class="storeName">极客时间旗舰店</div>
                    <img src="http://gw.alicdn.com/tfs/TB1ipgJvYZnBKNjSZFhXXc.oXXa-104-48.png_110x10000.jpg_.webp" style="width:66px; height:30px;"></img>
                  </div>
                </div>
                <div class="flex-right mt-30">
                    <img src={prod} class="prod-max" style="margin-right:28px" />
                    <div>
                      <img src={prod} class="prod" />
                      <img src={prod} class="prod" />
                    </div>
                </div>
              </div>

            <div class="store2">

            </div>
          </div>


          <ListView></ListView>
         
        </ScrollView>
        <ScrollView tab-title="有趣的店"  style="white-space: normal">
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
          def def def def def def def def def def def def def def def def def def 
        </ScrollView>
        <ScrollView tab-title="品牌新店" style="">
          <ListView style="abc:1" data={[{a:1, b:2}]}></ListView>
        </ScrollView>
    </TabView>
    </div>
    c.appendTo(document.body);
}


