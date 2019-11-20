import MyCreate, { Component } from "MyCreate";
import "./animation";
import "./gesture";
import CarouselComponent from "./component";

import "./Carousel.common.css";

export default class Carousel extends Component {
  componentDidMount() {
    const c = new CarouselComponent({
      container: document.getElementsByClassName("carousel")[0],
      elementWidth: document.documentElement.clientWidth - 34
    });
  }

  render() {
    return <div className="carousel" />;
  }
}
