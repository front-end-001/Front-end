// 落子逻辑
class OthelloPattern {
  constructor(board) {
    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0, 2, 1]
    ];
  }
  move(x, y, color, checkOnly = false) {
    let canMove = false;
    let [ox, oy] = [x, y];
  
    // 有棋子不能落子
    if (this.board[y][x] > 0) {
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
        if (this.board[y][x] === 0) {
          break;
        }
        if (this.board[y][x] === 3 - color) {
          hasOpposite = true;
        }
        if (this.board[y][x] === color) {
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
          this.board[y][x] = color;
        }
      }
  
      canMove = canMove || directionCanMove;
    }
  
    // 点击处落子
    if (canMove && !checkOnly) {
      this.board[oy][ox] = color;
      // 吃完子，对手下
      color = 3 - color;
    }
  
    return canMove;
  }
  checkPass(color) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.move(x, y, color, true)) {
          return false;
        }
      }
    }
    return true;
  }
  // 统计黑子数量
  statistics() {
    let black = 0;
    let white = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.board[y][x] === 1) {
          black++;
        } else if (this.board[y][x] === 2) {
          white++;
        }
      }
    }

    return {white, black};
  }
  // clone自身
  clone() {
    return new OthelloPattern(this.board.map(line => [...line]))
  }
}

// 游戏
class OthelloGame {
  constructor() {
    this.patterns = [new OthelloPattern()];
    this.colors = [1];
  }
  get pattern() {
    return this.patterns[this.patterns.length - 1];
  }
  get color() {
    return this.colors[this.colors.length - 1];
  }
  move(x, y) {
    let pattern = this.pattern.clone();
    let color = this.color;
    if (pattern.move(x, y, color, false)) {
      color = 3 - color;
      if (pattern.checkPass(color)) {
        let pass = color === 1 ? '黑棋' : '白棋';
        console.log(pass + 'pass');
        color = 3 - color;
        if (pattern.checkPass(color)) {
          alert('Game Over!');
          let num = pattern.statistics();
          let winner = num.black > num.white ? '黑子' : '白子';
          console.log('黑子: ' + num.black + ', 白子: ' + num.white + ', 赢家是: ' + winner);
        }
      }
      // 落子 pattern和color入栈
      this.patterns.push(pattern);
      this.colors.push(color);
      return true;
    }
  }
  // 悔棋 pattern和color出栈
  revert() {
    if (this.patterns.length > 1) {
      this.patterns.pop();
      this.colors.pop();
    }
  }
}

// UI
class OthelloView {
  constructor(container) {
    this.container = container;
    this.game = new OthelloGame();
  }
  render() {
    this.container.innerHTML = '';
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let element = document.createElement('div');
        element.className = `cell ${
          this.game.pattern.board[y][x] === 1 ? 'black' : this.game.pattern.board[y][x] === 2 ? 'white' : ''
        }`;
        element.addEventListener('click', () => {
          this.game.move(x, y);
          this.render();
        });
        this.container.appendChild(element);
      }
      this.container.appendChild(document.createElement('br'));
    }
    let regret = document.createElement('button');
    regret.innerText = '悔棋';
    this.container.appendChild(regret);
    regret.addEventListener('click', () => {
      this.game.revert();
      this.render();
    });
  }
}

new OthelloView(document.getElementById('container')).render();