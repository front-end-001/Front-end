/*
 * @Author: your name
 * @Date: 2019-10-27 17:18:00
 * @LastEditTime: 2019-10-27 17:18:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Front-end/有好货页面/id_1908028/script.js
 */
import TabView from "./TabView.js";
import ScrollView from "./ScrollView.js";
import ListView from "./ListView.js";

import Div from "./Div.js";
import { create } from "./create.js";

import tree from "./my.component";

function loadMore() {
  setTimeout(() => {
    this.setAttribute("placeHolderText", "没有更多啦！");
  }, 5000);
}

window.render = function(data, root) {
  var c = (
    <div>
      <span class="x">abc</span>
      <ListView style="abc:1" data={[{ a: 1, b: 2 }]}></ListView>
    </div>
  );
  c.appendTo(document.body);
};
