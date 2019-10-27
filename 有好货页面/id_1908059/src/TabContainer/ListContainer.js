import MyCreate, { Component, Fragment } from "MyCreate";
import ListItem from "./ListItem";
import Carousel from "~/Carousel";

export default class ListContainer extends Component {
  render() {
    const data = this.getAttribute("data") || [];
    const index = this.getAttribute("index");
    return (
      <div className="Swiper-item">
        {index === 1 && (
          <Fragment>
            <span className="Swiper-container--title">超多人收藏的店</span>
            <Carousel />
          </Fragment>
        )}
        {data.map(d => {
          return <ListItem item={d} />;
        })}
      </div>
    );
  }
}
