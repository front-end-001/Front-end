import MyCreate, { Component } from "MyCreate";
import TabContainer from "./TabContainer";
import Header from './Header'

import "./App.css";

export default class App extends Component {
  componentDidMount() {
    //关闭选择
    //document.addEventListener("selectstart",function(e){ e.preventDefault(); });
    //避免鼠标变成文本选择形状
    //document.addEventListener("mousedown",function(e){ e.preventDefault(); });
    //避免上下滚屏
    document.addEventListener(
      "touchmove",
      function(e) {
        if (e.touches.length == 2) e.preventDefault();
      },
      { passive: false }
    );
    document.addEventListener(
      "touchmove",
      function(e) {
        if (e.touches.length == 2) e.preventDefault();
      },
      { passive: false }
    );
  }

  render() {
    return (
      <div className="app">
        <Header />
        <TabContainer />
      </div>
    );
  }
}
