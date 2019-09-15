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
}

class Game {
  constructor(color = 1, map = null) {
    this.color = color;
    this.pattern = new Pattern(map);
  }

  move(i, j) {
    if (this.pattern.move(i, j, this.color, false)) {
      this.color = 3 - this.color;
      if (this.pattern.checkPass(this.color)) {
        console.log('pass');
        this.color = 3 - this.color;
        if (this.pattern.checkPass(this.color)) {
          console.log('game over');
        }
      }
      return true;
    }
    return false;
  }
}

class View {
  constructor(container, game) {
    this.container = container;
    this.fragment = document.createDocumentFragment();
    this.game = game;
  }

  render() {
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
            this.render();
          }
        })
      }
    }
    this.container.appendChild(this.fragment);
  }
}

const container = document.getElementById('container');

new View(container, new Game()).render();
