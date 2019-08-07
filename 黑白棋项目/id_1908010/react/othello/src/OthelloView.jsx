
import React from 'react';
import {Button} from 'antd';
import './App.css';

class OthelloView extends React.Component {
    constructor(props) {
        super(props);
        this.game = props.game;
        this.state = {
            refresh: false
        }
    }

    regret() {
        this.props.game.revert();
        this.refresh();
    }

    reset() {
        this.props.game.reset();
        this.refresh();
    }

    move(x, y) {
        console.log(this.props.game);
        this.props.game.move(x, y);
        this.refresh();
    }

    refresh() {
        this.setState({
            refresh: !this.state.refresh
        });
    }

    constructBoard() {
        let result = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                result.push(this.constructCell(x, y));
            }
            result.push(<br key={`br_${x}`}/>);
        }
        return result;
    }

    constructCell(x, y) {
        let pieceValue = this.game.pattern.board[x][y];
        let cellClass = `cell ${pieceValue === 1 ? "black" : ""} ${pieceValue === 2 ? "white" : ""} `;
        let canMove = this.game.pattern.move(x, y, this.game.color, true);
        cellClass += `${canMove ? "step" : ""} ${canMove && this.game.color === 1 ? "black": ""} ${canMove && this.game.color === 2 ? "white": ""}`;
        return (
            <div className={cellClass} onClick={this.move.bind(this, x, y)} key={`cell_${x*8+y}`}/>
        )
    }

    render() {
        return (
            <div id="container">
                {this.constructBoard()}
                <Button type="default" onClick={this.regret.bind(this)}>{"悔棋"}</Button>
                <Button type="default" onClick={this.reset.bind(this)}>{"重新开始"}</Button>
            </div>

        )
    }
}

export default OthelloView;