// 数据结构 1 黑  2 白
let board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 2, 1]
];
let container = document.getElementById('container');
let color = 1; // 黑先

// x列，y行 checkOnly只用于检查是否可以落子，并不真正落子
function move(x, y, checkOnly = false) {
  let canMove = false;
  let [ox, oy] = [x, y];

  if (board[y][x] > 0) {
    return false;
  }

  // 移动方向向量 [x, y]
  let directions = [
    [-1, 0], // 左
    [1, 0], // 右
    [0, -1], // 上
    [0, 1], // 下
    [-1, -1], // 左上
    [-1, 1], // 左下
    [1, -1], // 右上
    [1, 1] // 右下
  ];

  for (let direction of directions) {
    let hasOpposite = false;
    let directionCanMove = false; // 当前方向能否移动
    let [x, y] = [ox, oy];
    while (true) {
      x += direction[0];
      y += direction[1];
      if (x < 0 || x >= 8 || y < 0 || y >= 8) {
        break;
      }
      if (board[y][x] === 0) {
        break;
      }
      if (board[y][x] === 3 - color) {
        hasOpposite = true;
      }
      if (board[y][x] === color) {
        if (hasOpposite) {
          directionCanMove = true;
        }
        break;
      }
    }

    // 往回吃
    if (directionCanMove && !checkOnly) {
      while (true) {
        x -= direction[0];
        y -= direction[1];
        if (x === ox && y === oy) {
          break;
        }
        board[y][x] = color;
      }
    }

    canMove = canMove || directionCanMove;
  }

  // 点击处落子
  if (canMove && !checkOnly) {
    board[oy][ox] = color;
    // 吃完子，对手下
    color = 3 - color;
  }

  return canMove;
}

function checkPass() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (move(x, y, true)) {
        return false;
      }
    }
  }
  return true;
}

// 统计黑子数量
function statistics() {
  let black = 0;
  let white = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 1) {
        black++;
      } else if (board[y][x] === 2) {
        white++;
      }
    }
  }

  return {white, black};
}

function render() {
  container.innerHTML = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let element = document.createElement('div');
      element.className = `cell ${
        board[y][x] === 1 ? 'black' : board[y][x] === 2 ? 'white' : ''
      }`;
      element.addEventListener('click', () => {
        move(x, y);
        if (checkPass()) {
          let pass = color === 1 ? '黑棋' : '白棋';
          console.log(pass + 'pass');
          color = 3 - color;
          if (checkPass()) {
            alert('Game Over!');
            let num = statistics();
            let winner = num.black > num.white ? '黑子' : '白子';
            console.log('黑子: ' + num.black + ', 白子: ' + num.white + ', 赢家是: ' + winner);
          }
        }
        render();
      });
      container.appendChild(element);
    }
    container.appendChild(document.createElement('br'));
  }
}

render();
