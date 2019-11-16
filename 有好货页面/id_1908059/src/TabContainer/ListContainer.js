import MyCreate, { Component, Fragment } from "MyCreate";
import ListItem from "./ListItem";
import Carousel from "~/Carousel";

export default class ListContainer extends Component {
  render() {
    const { data, header } = this.getAttribute("data") || [];
    return (
      <div className="Swiper-item">
        {header}
        {data.map(d => {
          return <ListItem item={d} />;
        })}
      </div>
    );
  }
}
