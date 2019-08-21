import React from "react";
import OthelloCell from "./OthelloCell";
import OthelloPattern from "./OthelloPattern";

export default class OthelloGame extends React.Component {
  constructor(props) {
    super(props);
    this.pattern = new OthelloPattern();
    this.state = {
      status: this.pattern.clone(),
      color: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (row, cell) => {
    let color = this.state.color;
    if (this.pattern.move(row, cell, color)) {
      color = 3 - color;
      if (this.pattern.checkPass(color)) {
        color = 3 - color;
        if (this.pattern.checkPass(color)) {
          this.finished = true;
          setTimeout(() => {
            alert("Game Over!");
          }, 500);
        }
        // else {
        //     //TODO AI 部分
        //     const [x,y] = computeNextStep(this.pattern, color);
        //     this.pattern.move(x,y,color)
        //     this.setState({
        //         state: this.pattern.status
        //     })
        // }
      }
      this.setState({
          status: this.pattern.status,
          color
      })
    }
  };

  getTip = () => {
    if (this.pattern.finished) {
      const winner = this.pattern.getWinner();
      return `游戏结束， ${
        winner === 0 ? "平局！" : winner < 0 ? "黑" : "白"
      }方获胜`;
    } else {
        return `请${this.state.color === 1?'黑':'白'}棋走棋`
    }
  };

  render = () => {
    return (
      <div id="OthelloGame">
        <div id="tip">
          <span>{this.getTip()}</span>
        </div>
        {this.state.status.map((row, rowIndex) => {
          let rowDivs = [];
          row.forEach((cell, colIndex) => {
            rowDivs.push(
              <OthelloCell
                cellStatus={this.state.status[rowIndex][colIndex]}
                row={rowIndex}
                col={colIndex}
                onClick={() => {
                  this.handleClick(rowIndex, colIndex);
                }}
              />
            );
          });
          rowDivs.push(<br/>);
          return rowDivs;
        })}
      </div>
    );
  };
}
