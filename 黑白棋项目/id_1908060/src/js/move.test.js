import move, { step, point2index, score } from './move';
import { INIT_PATTERN, BLACK, WHITE } from './../config';


test('步进', () => {
    expect(step({ x: 0, y: 0 }, { x: 1, y: 1 })).toEqual({ x: 1, y: 1 });
    expect(step({ x: 2, y: 3 }, { x: -1, y: 0 })).toEqual({ x: 1, y: 3 });
});

test('回退', () => {
    expect(step({ x: 0, y: 0 }, { x: 1, y: 1 }, true)).toEqual({ x: -1, y: -1 });
});


test('位移回退函数', () => {
    const point = { x: 0, y: 0 };
    const direction = { x: 1, y: 1 };
    expect(step(step(point, direction), direction, true)).toEqual(point);
});

test('二维坐标转一维坐标', () => {
    expect(point2index(0, 0)).toBe(11); // 左上
    expect(point2index(7, 0)).toBe(18); // 右上
    expect(point2index(0, 7)).toBe(81); // 左下
    expect(point2index(7, 7)).toBe(88); // 右下
});

test('初始落子', () => {
    expect(!!move(INIT_PATTERN, { x: 2, y: 3 }, BLACK).type).toBe(true);
    expect(!!move(INIT_PATTERN, { x: 2, y: 3 }, WHITE).type).toBe(false);
    expect(!!move(INIT_PATTERN, { x: 1, y: 3 }, BLACK).type).toBe(false);
    expect(!!move(INIT_PATTERN, { x: 1, y: 3 }, WHITE).type).toBe(false);
    expect(!!move(INIT_PATTERN, { x: 3, y: 3 }, BLACK).type).toBe(false);
    expect(!!move(INIT_PATTERN, { x: 3, y: 3 }, WHITE).type).toBe(false);
});

test('吃子规则', () => {
    expect(move(INIT_PATTERN, { x: 2, y: 3 }, BLACK).pattern).toEqual([
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, BLACK, BLACK, BLACK, null, null, null, null,
        null, null, null, null, BLACK, WHITE, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ]);


    expect(move(INIT_PATTERN, { x: 5, y: 3 }, WHITE).pattern).toEqual([
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, WHITE, WHITE, WHITE, null, null, null,
        null, null, null, null, BLACK, WHITE, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ]);

    expect(move(INIT_PATTERN, { x: 4, y: 2 }, WHITE).pattern).toEqual([
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, WHITE, null, null, null, null,
        null, null, null, null, WHITE, WHITE, null, null, null, null,
        null, null, null, null, BLACK, WHITE, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ]);

    expect(move([
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, WHITE, WHITE, null, null, null, null,
        null, null, null, null, BLACK, WHITE, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ], { x: 5, y: 2 }, BLACK).pattern)
        .toEqual([
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, BLACK, null, null, null,
        null, null, null, null, WHITE, BLACK, null, null, null, null,
        null, null, null, null, BLACK, WHITE, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ]);
});


test('结果计分', () => {
    expect(score(INIT_PATTERN)).toEqual({white: 2, black: 2});
    expect(score([BLACK])).toEqual({white: 0, black: 1});
    expect(score([WHITE])).toEqual({white: 1, black: 0});
    expect(score([WHITE, WHITE, WHITE, BLACK])).toEqual({white: 3, black: 1});
    expect(score([WHITE, BLACK, BLACK])).toEqual({white: 1, black: 2});
});
