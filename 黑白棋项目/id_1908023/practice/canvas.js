class Pattern {
  constructor(map) {
    this.map = map || [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }

  move(i, j, color, checkOnly) {
    if (this.map[i][j] > 0) return false;
    let moveSuccess = false;
    let directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
    ]


    for (let direction of directions) {
      let [y, x] = [i, j];
      let canmove = false;

      while (true) {
        x += direction.x;
        y += direction.y;

        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
          canmove = false;
          break;
        }

        if (this.map[y][x] == 3 - color) {
          canmove = true;
        } else if (this.map[y][x] == color) {
          break;
        } else if (this.map[y][x] == 0) {
          canmove = false;
          break;
        }
      }

      moveSuccess = moveSuccess || canmove;
      if (canmove && !checkOnly) {
        while (true) {
          x -= direction.x;
          y -= direction.y;
          this.map[y][x] = color;
          if (x == j && y == i) {
            break;
          }
        }
      }
    }

    return moveSuccess;
  }

  checkPass(color) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.move(i, j, color, true)) {
          return false;
        }
      }
    }
    return true;
  }

  clone() {
    return new Pattern(this.map.map(line => line.slice()));
  }
}

class Game {
  constructor(color = 1, map = null) {
    this.patterns = [new Pattern(map)];
    this.colors = [color];
  }

  get pattern() {
    return this.patterns[this.patterns.length - 1];
  }

  get color() {
    return this.colors[this.colors.length - 1];
  }

  move(i, j) {
    let pattern = this.pattern.clone();
    let color = this.color;

    if (pattern.move(i, j, color, false)) {
      color = 3 - color;
      if (this.pattern.checkPass(color)) {
        console.log('pass');
        color = 3 - color;
        if (this.pattern.checkPass(color)) {
          console.log('game over');
        }
      }

      this.patterns.push(pattern);
      this.colors.push(color);

      return true;
    }
    return false;
  }

  revert() {
    if (this.patterns.length > 1) {
      this.patterns.pop();
      this.colors.pop();
    }
  }
}

class View {
  constructor(container, game) {
    this.container = container;
    this.fragment = document.createDocumentFragment();
    this.game = game;
  }

  renderCanvas() {
    const ctx = this.container.getContext('2d');
    const block = 50;
    this.container.width = block * 8;
    this.container.height = block * 8;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        ctx.fillStyle = 'burlywood';
        ctx.fillRect(i * block + 1, j * block + 1, block - 2, block - 2);
        if (this.game.pattern.map[i][j] > 0) {
          ctx.beginPath();
          ctx.arc(i * block + block / 2, j * block + block / 2, block / 2 - 4, 0, 2 * Math.PI);
          ctx.fillStyle = this.game.pattern.map[i][j] === 1 ? 'black' : 'white';
          ctx.fill();
          ctx.closePath();
        }
      }
    }

    // 给整个 canvas 添加点击事件
    this.container.addEventListener('click', e => {
      // 计算出鼠标在 canvas 中点击时所在位置与棋盘块的关系，变相找到对应的 i 和 j
      let i = Math.floor(e.offsetX / block);
      let j = Math.floor(e.offsetY / block);
      if (this.game.move(i, j)) {
        this.renderCanvas();
      }
    })
  }

  renderDom() {
    this.container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const chessBox = document.createElement('div');
        chessBox.className = 'chess-box';
        this.fragment.appendChild(chessBox);
        const chess = this.game.pattern.map[i][j];
        if (chess > 0) {
          chessBox.className += `${chess === 2 ? ' chess-white' : ' chess-black'}`;
        }

        chessBox.addEventListener('click', () => {
          if (this.game.move(i, j)) {
            this.renderDom();
          }
        })
      }
    }

    const regret = document.createElement('button');
    regret.innerText = '悔棋';
    regret.addEventListener('click', () => {
      // 悔棋逻辑
      this.game.revert();
      this.renderDom();
    })
    this.fragment.appendChild(regret);

    this.container.appendChild(this.fragment);
  }
}

// const container = document.getElementById('container');

// new View(container, new Game()).renderDom();
const container = document.getElementById('main');
new View(container, new Game()).renderCanvas();
