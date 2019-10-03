import MyCreate, { Component } from "MyCreate";

export default class ListContainer extends Component {
  render() {
    const data = this.getAttribute("data") || [];
    return (
      <div className="Swiper-item">
        {data.map(d => {
          return (
            <span>
              {d.title}
              <span>{d.content}</span>
            </span>
          );
        })}
      </div>
    );
  }
}
