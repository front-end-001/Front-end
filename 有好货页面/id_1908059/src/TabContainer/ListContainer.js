import MyCreate, { Component } from "MyCreate";

export default class ListContainer extends Component {
  render() {
    const data = this.getAttribute("data") || [];
    const index = this.getAttribute("index")
    return (
      <div className="Swiper-item">
        <h1>{index}</h1>
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
