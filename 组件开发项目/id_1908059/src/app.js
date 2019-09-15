import React, { Component } from "react";
import PropTypes from "prop-types";

import "./app.css";

export default class App extends Component {
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
