import React from 'react';
import './App.css';

import Board from './components/Board';
import Panel from './components/Panel';
import format from './utils/formatArray';
import { BLACK, WHITE, INIT_PATTERN } from './config';
import { useState, useEffect } from 'react';

import move from './js/move';

function App() {
    const [squares, setSquares] = useState(INIT_PATTERN);
    const [color, setColor] = useState(BLACK);

    function onClick(point) {
        const { pattern, type } = move(squares, point, color);
        if(type) {
            setSquares(pattern);
            setColor(color === BLACK ? WHITE : BLACK);
        }
    }
    // useEffect(() => {
    //     let i = -1;
    //     let j = -1;
    //     while(++i<8) {
    //         while(++j<8) {
    //             if(move(squares, {x: i, y: j}, color).type) {
    //                 return;
    //             }
    //         }
    //     }
    //     setColor(color === BLACK ? WHITE : BLACK);
    // }, []);

    return (
        <div className="App">
            <Panel pattern={squares}  color = {color} />
            <Board squares={format(squares)}  onClick = {onClick} />
        </div>
    );
}

export default App;
