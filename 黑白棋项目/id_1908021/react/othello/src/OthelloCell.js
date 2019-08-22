import React from "react";

export default class OthelloCell extends React.Component {
  constructor(props) {
    super(props);

    this.emptyCellStype = {
      display: "inline-block",
      backgroundColor: "grey",
      width: "50px",
      height: "50px",
      margin: "2px"
    };
  }

  renderChess = () => {
    if (this.props.cellStatus === 0) return;
    let chessStyle = {
      width: "45px",
      height: "45px",
      borderRadius: "24px",
      backgroundColor: this.props.cellStatus === 1 ? "black" : "white",
      transition: "background-color 0.5s",
      verticalAlign: "middle",
      margin: "3px"
    };
    return <div style={chessStyle} />;
  };

  render = () => {
    return (
      <div
        style={this.emptyCellStype}
        onClick={() => {
          this.props.onClick(this.props.row, this.props.col);
        }}
      >
        {this.renderChess()}
      </div>
    );
  };
}
