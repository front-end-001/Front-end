import React from 'react';
import './index.scss';
import { BLANK, BLACK, WHITE } from './../../config';

const getClassName = type => {
    switch (type) {
        case BLANK:
            return 'blank';
        case BLACK:
            return 'black';
        case WHITE:
            return 'white';
    }
};

function Piece({ type }) {
    return <span className={`piece ${getClassName(type)}`}></span>;
}

// 格子
function Col({ id, piece, squares, col, row, onClick }) {
    return (
        <div key={id} className={'col'} onClick={() => onClick({x: col, y: row})}>
            <Piece type={squares[col][row]}></Piece>
        </div>
    );
}

// 行
function Line({ line, squares, onClick }) {
    return (
        <div className={'row'}>
            {new Array(8).fill(0).map((_, col) => {
                return <Col key={col} row={line} col={col} squares={squares} onClick={onClick}/>;
            })}
        </div>
    );
}

// 棋盘面板
export default function Index({ squares, onClick }) {
    return (
        <div className={'board'}>
            {new Array(8).fill(0).map((_, row) => {
                return <Line key={row} line={row} squares={squares} onClick={onClick}/>;
            })}
        </div>
    );
}
