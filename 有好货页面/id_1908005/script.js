import Tab from "./Tab.js";
import Div from "./Div.js";
import ScrollView from "./ScrollView.js";
import Wrapper from "./Wrapper.js";
import ListView from "./ListView.js";

import myCreate from "./myCreate";

window.render = function(data, root) {
  let c = (
    <Tab
      style="width:100%;height:calc(100% - 70px);position: relative;
      top: 70px;"
      class="myTab"
    >
      <ScrollView
        tab-title="推荐"
        class="mytab-content-box"
        key={"recommend"}
        active={true}
        //style={"background: #000"}
      >
        推荐
        <ListView data={data}>
          <Div>
            <img style={"width: 100px, height: 100px"}></img>
            <h1>00987</h1>
          </Div>
        </ListView>
      </ScrollView>
      <ScrollView
        tab-title="有趣的店"
        style=""
        class="mytab-content-box"
        key={"interest"}
        //style={"background: pink"}
      >
        有趣的店
      </ScrollView>
      <ScrollView
        tab-title="品牌新店"
        style=""
        class="mytab-content-box"
        key={"newShops"}
        //style={"background: lightblue"}
      >
        品牌新店
      </ScrollView>
    </Tab>
  );
  let header = document.getElementById("header");
  c.appendTo(header);
};

