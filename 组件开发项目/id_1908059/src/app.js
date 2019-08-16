import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import "./app.css";

const data = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

class App extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  state = {
    position: 0,
    nextPosition: 0
  };

  nextFrame = () => {
    let position = this.state.position + 1;
    let nextPosition = position + 1;
    this.setState(
      {
        position: position % this.props.data.length,
        nextPosition: nextPosition % this.props.data.length
      },
      () => {
        setTimeout(this.nextFrame, 3000);
      }
    );
  };

  componentDidMount() {
    this.nextFrame();
  }

  render() {
    const { data } = this.props;
    const { position, nextPosition } = this.state;
    return (
      <div className="carousel">
        {data.map((d, index) => {
          const basePosition = index * 100;
          let style = {};
          if (position === index) {
            style = {
              transform: `translate(${-basePosition - 100}%)`
            };
          } else if (nextPosition === index) {
            style = {
              transform: `translate(${-basePosition}%)`
            };
          } else {
            style = {
              transform: `translate(${-basePosition + 100}%)`,
              transition: "ease 0s"
            };
          }

          return <img key={index} src={d} style={style} />;
        })}
      </div>
    );
  }
}

ReactDOM.render(<App data={data} />, document.querySelector("#app"));
