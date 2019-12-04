/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 19:27:58
 * @LastEditTime: 2019-10-31 14:28:36
 * @LastEditors: Please set LastEditors
 */
import { create } from "./create";
import Root from "./component/Root";
import Title from "./component/Title";
import Tab from "./component/Tab";
import TabsPane from "./component/TabsPane";
import NewBrand from "./component/NewBrand";
import Recommend from "./component/Recommend";

import "./index.css";

var c = (
  <Root className="root_style">
    <Title className="title_style"></Title>
    <Tab active="first">
      <TabsPane label="推荐" name="first">
        <Recommend />
      </TabsPane>
      <TabsPane label="有趣的店" name="second"></TabsPane>
      <TabsPane label="品牌新店" name="third">
        <NewBrand className="newBrand" />
        <NewBrand className="newBrand" />
        <NewBrand className="newBrand" />
      </TabsPane>
    </Tab>
  </Root>
);
c.appendTo(document.getElementById("app"));
