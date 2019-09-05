import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateElementWithGesture from "./CreateElementWithGesture";

import "./app.css";

export default class App extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  x = 0;

  state = {
    position: 0,
    // nextPosition: 0,
    isPan: false,
    dx: 0
  };

  // nextFrame = () => {
  //   let position = this.state.position + 1;
  //   let nextPosition = position + 1;
  //   this.setState(
  //     {
  //       position: position % this.props.data.length,
  //       nextPosition: nextPosition % this.props.data.length
  //     },
  //     () => {
  //       // setTimeout(this.nextFrame, 3000);
  //     }
  //   );
  // };

  componentDidMount() {
    // this.nextFrame();
  }

  onPan = ({ dx }) => {
    this.setState({
      dx,
      isPan: true
    });
  };

  onPanEnd = ({ dx }) => {
    let position = -Math.round((this.x + dx) / 500);
    position = Math.max(0, Math.min(position, this.props.data.length - 1));
    this.x = -position * 500;
    this.setState({ isPan: false, dx: 0, position });
  };

  getCurrentStyles = () => {
    const { isPan, dx, position } = this.state;
    return {
      transition: isPan ? "ease 0s" : "",
      transform: isPan
        ? `translateX(${dx + this.x}px)`
        : `translateX(${-position * 500}px)`
    };
  };

  render() {
    const { data } = this.props;
    return (
      <CreateElementWithGesture
        onPan={this.onPan}
        // onPanStart={console.log}
        onPanEnd={this.onPanEnd}
      >
        <div className="carousel">
          {data.map((d, index) => {
            // const basePosition = index * 100;
            let style = { ...this.getCurrentStyles() };
            // if (position === index) {
            //   style = {
            //     transform: `translate(${-basePosition - 100}%)`
            //   };
            // } else if (nextPosition === index) {
            //   style = {
            //     transform: `translate(${-basePosition}%)`
            //   };
            // } else {
            //   style = {
            //     transform: `translate(${-basePosition + 100}%)`,
            //     transition: "ease 0s"
            //   };
            // }

            return <img key={index} src={d} style={style} />;
          })}
        </div>
      </CreateElementWithGesture>
    );
  }
}
