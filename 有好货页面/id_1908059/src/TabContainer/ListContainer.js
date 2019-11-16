import MyCreate, { Component } from "MyCreate";
import ListItem from "./ListItem";

export default class ListContainer extends Component {
  render() {
    const data = this.getAttribute("data") || [];
    const index = this.getAttribute("index");
    return (
      <div className="Swiper-item">
        {index === 1 && (
          <span className="Swiper-container--title">超多人收藏的店</span>
        )}
        {
          data.map((d) => {
            return <ListItem item={d} />
          })
        }
      </div>
    );
  }
}
