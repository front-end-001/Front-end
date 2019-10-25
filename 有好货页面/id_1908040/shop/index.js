import TabView from './components/TabView.js';
import ScrollView from './components/ScrollView.js';
import TextView from './components/TextView.js';
import RecommendListView from './components/RecommendListView.js';
// import RecommendItemView from './components/RecommendItemView.js';
// import ListView from './components/ListView.js';
import CarouselView from './components/CarouselView.js';
import FavoriteView from './components/FavoriteView.js';
import Div from './components/Div.js';

import {create} from './lib/create.js';

// import tree from "./my.component";
import tree from "./my2.component";


// 下拉加载更多
function loadMore() {
  // console.log(111);
  // console.log('load more');
  setTimeout(() => {
    this.setAttribute('placeHolderText', '没有更多啦!');
  }, 2000);
}

window.render = function(data, root) {
  var c = tree;
  // var c = <Div>{tree}</Div>
  c.appendTo(document.body);
}
