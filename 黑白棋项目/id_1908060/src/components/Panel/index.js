import React from 'react';
import './style.scss';
import { score } from './../../js/move';
import { BLACK, WHITE } from './../../config';

function Color({ color }) {
    const colorName = color === BLACK ? 'black' : 'white';
    return <span className={`color color__${colorName}`}/>
}

export default function({ color,  pattern }) {
    const result = score(pattern);
    return (<div className={'panel'}>
        <div>当前 <Color color={color}/></div>
        <div><Color color={BLACK}/>得分： {result.black}</div>
        <div><Color color={WHITE}/>得分： {result.white}</div>
    </div>)
}
