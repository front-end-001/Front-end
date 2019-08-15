export default class OthelloTurn {
  constructor(board, color, preIsPass) {
    this.board = board;
    this.color = color;
    this._computedStatus = computedStatus(board, color, preIsPass);
  }
  static createFromMove({ pos, board, color }) {
    const class$ = this;
    return new class$(board, color, pos < 0);
  }
  get isPass() {
    return this._computedStatus.isPass;
  }
  get isGameEnd() {
    return this._computedStatus.isGameEnd;
  }
  get moves() {
    return this._computedStatus.moves;
  }
}

function computedStatus(board, color, preIsPass) {
  let isPass = false,
    isGameEnd = false,
    moves = [];

  const nextTurnColor = 3 - color;
  const movesNoPass = getMoves(board, color);
  if (preIsPass && movesNoPass.length === 0) {
    isGameEnd = true;
  } else if (!board.some(c => c <= 0)) {
    //没有空白格子了
    isGameEnd = true;
  }
  if (!isGameEnd) {
    isPass = movesNoPass.length === 0;
    if (isPass) {
      moves.push({ pos: -1, board, color: nextTurnColor });
    } else {
      for (const { pos, board, diff } of movesNoPass) {
        moves.push({ pos, board, diff, color: nextTurnColor });
      }
    }
  }

  return { isPass, isGameEnd, moves };
}

function getMoves(board, color) {
  const moves = [];
  for (let pos = 0, len = board.length; pos < len; pos++) {
    const result = getEatResult(pos, color, board);
    if (result.length > 0) {
      const changeBoard = board.slice();
      for (const changePos of flattenDeep(result)) {
        changeBoard[changePos] = color;
      }
      moves.push({ pos, diff: result, board: changeBoard });
    }
  }
  // return [{ pos, board, color }];
  return moves;
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
];

function getEatResult(pos, color, board) {
  const eats = [];
  const curColor = board[pos];
  if (curColor > 0) return []; //已经有子了，不能落子
  for (const _direction of directions) {
    let nextPos = pos,
      preEats = [];
    while (inBoard((nextPos = getNextPos(nextPos, _direction)))) {
      const nextColor = board[nextPos];
      if (nextColor <= 0) {
        //空白 不能eat
        break;
      } else if (nextColor === color) {
        //同色 吃中间的子
        preEats.length && eats.push(preEats);
        break;
      } else {
        //异色 preEats.push(异色)
        preEats.push(nextPos);
      }
    }
  }

  if (eats.length > 0) {
    return [pos, eats]; //diff: 吃掉掉子和 当前落子
  } else {
    return []; //no diff
  }
}

function inBoard(pos) {
  return 0 <= pos && pos < 64;
}

function getNextPos(pos, [xDiff, yDiff]) {
  let { x, y } = posToXy(pos);
  x += xDiff;
  y += yDiff;
  if ([x, y].every(_ => 0 <= _ && _ < 8)) {
    return xyToPos({ x, y });
  }
  return -1;
}

function xyToPos({ x, y }) {
  return x + y * 8;
}

function posToXy(pos) {
  const x = pos % 8,
    y = Math.floor(pos / 8);
  return { x, y };
}

function flattenDeep(arr) {
  return Array.isArray(arr) ? arr.flatMap(flattenDeep) : arr;
}
