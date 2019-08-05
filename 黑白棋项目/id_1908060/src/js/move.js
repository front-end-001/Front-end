import directions from './direction';
import { BLANK, BLACK, WHITE } from './../config';

// 步进
export const step = (point, direction, isReverse = false) => {
    return {
        x: point.x + (-1) ** isReverse * direction.x,
        y: point.y + (-1) ** isReverse * direction.y
    };
};

// 二维坐标转一维下标
export const point2index = (x, y) => 10 * (y + 1) + x + 1;

// 计算得分
export const score = (pattern) => {
    return pattern.reduce((ret, cur) => {
        if(cur === BLACK) {
            ret.black += 1;
        } else if(cur === WHITE) {
            ret.white += 1;
        }
        return ret;
    } ,{ white: 0, black: 0 });
};


export default function move(pattern, { x, y }, color) {
    if (pattern[point2index(x, y)]) {
        return { pattern, type: false };
    }
    pattern = [...pattern];
    const start = { x, y };
    const type = directions.map(direction => {
        let canmove;
        ({ x, y } = start);
        // 吃子
        while (true) {
            ({ x, y } = step({ x, y }, direction));
            if (pattern[point2index(x, y)] === BLANK) {
                canmove = false;
                break;
            }
            if (pattern[point2index(x, y)] === color) {
                break;
            }
            canmove = true;
        }

        // 变子
        if (canmove) {
            while (true) {
                ({ x, y } = step({ x, y }, direction, true));
                pattern[point2index(x, y)] = color;
                if (x === start.x && y === start.y) {
                    break;
                }
            }
        }
        return canmove;
    });
    return { pattern, type: type.some(Boolean) };
}
