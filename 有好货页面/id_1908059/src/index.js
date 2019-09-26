import MyCreate from "../MyCreate";
// import Carousel from "./Carousel/component";
// import "./Carousel/animation";
// import "./Carousel/gesture";
// import TabContainer from './Tab2'
// import Div2 from "./Div2";
import App from './App'

const DOMRender = (Component, dom) => {
  if (Component.appendTo) {
    Component.appendTo(dom);
  }
};

DOMRender(
  <App />,
  document.getElementById("root")
);
