import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import ChessPattern from "./ChessPattern";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: ChessPattern.initialMap
    };
    this.pattern = new ChessPattern({
      updateMap: this.updateMap,
      map: this.state.map
    });
    this.color = 1;
  }

  updateMap = newMap => {
    this.setState({ map: newMap });
  };

  move({ i, j }) {
    if (this.pattern.move({ i, j }, this.color, false)) {
      this.color = 3 - this.color;
      if (this.pattern.checkPass(this.color)) {
        this.color = 3 - this.color;
        if (this.pattern.checkPass(this.color)) {
          alert("game over");
        }
      }
    }
  }

  handleClickBlock = ({ x, y }) => {
    this.move({ i: y, j: x });
  };

  render() {
    const { map } = this.state;
    return (
      <div className="board">
        {map.map((mapColumn, colIdx) => {
          const mapBlocks = mapColumn.map((curVal, idx) => (
            <div
              className="block"
              key={`${colIdx}_${idx}`}
              onClick={() => this.handleClickBlock({ x: idx, y: colIdx })}
            >
              {curVal > 0 && (
                <span
                  className={cx("piece", {
                    "piece--white": curVal === 2,
                    "piece--black": curVal === 1
                  })}
                />
              )}
            </div>
          ));
          return (
            <Fragment key={colIdx}>
              {[...mapBlocks, <br key={`${colIdx}_br`} />]}
            </Fragment>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
