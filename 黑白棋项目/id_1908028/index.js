class OthelloPattern {
  constructor(
    arr = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 2, 1, 1, 2, 1, 2, 2],
      [1, 1, 1, 1, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 2, 2, 2],
      [1, 2, 1, 1, 0, 2, 1, 0],
      [1, 1, 1, 2, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 1, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2]
    ]
    // arr = [
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 1, 2, 0, 0, 0],
    //   [0, 0, 0, 2, 1, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0]
    // ]
  ) {
    this.arr = arr;
  }

  set history(value) {
    this.arr = value.map(item => item.slice());
    return;
  }

  move(x, y, color, checkOnly = false) {
    let ox = x;
    let oy = y;
    let count = 1;
    if (this.arr[y][x] !== 0) {
      return false;
    }

    let canMove = false;
    let directions = [
      [-1, -1],
      [-1, 1],
      [-1, 0],
      [1, -1],
      [1, 1],
      [1, 0],
      [0, 1],
      [0, -1]
    ];
    for (let direction of directions) {
      x = ox;
      y = oy;
      let directionCanMove = false;
      let hasOpposite = false;
      while (true) {
        x -= direction[0];
        y -= direction[1];
        if (x < 0 || x > 7 || (y < 0 || y > 7)) {
          break;
        }
        if (this.arr[y][x] === 3 - color) {
          hasOpposite = true;
        }
        if (this.arr[y][x] === color) {
          if (hasOpposite) {
            directionCanMove = true;
          }
          break;
        }
        if (this.arr[y][x] === 0) {
          break;
        }
      }
      if (directionCanMove && checkOnly) {
        let countX = x;
        let countY = y;
        while (true) {
          if (countX === ox && countY === oy) {
            break;
          }
          countX += direction[0];
          countY += direction[1];
          if (countX !== ox || countY !== oy) {
            count++;
          }
        }
      }
      if (directionCanMove && !checkOnly) {
        while (true) {
          if (x === ox && y === oy) {
            break;
          }
          x += direction[0];
          y += direction[1];
          this.arr[y][x] = color;
        }
      }
      canMove = canMove || directionCanMove;
    }
    return { canMove, count };
  }
}

class OthelloGame {
  constructor() {
    this.pattern = new OthelloPattern();
    this.color = 2;
    this.portability = void 0;
    this.history = [
      { color: 2, arr: this.pattern.arr.map(item => item.slice()) }
    ];
    this.optimal = void 0;
  }
  checkPass() {
    let check = [];
    for (let y = 0; y < this.pattern.arr.length; y++) {
      for (let x = 0; x < this.pattern.arr[y].length; x++) {
        let move = this.pattern.move(x, y, this.color, true);
        if (move.canMove) {
          check.push({
            x,
            y,
            num:
              this.color === 1
                ? this.count().white + move.count
                : this.count().black + move.count
          });
        }
      }
    }
    if (check.length) {
      this.portability = check;
      return false;
    }
    this.portability = [];
    return true;
  }

  count(arr = this.pattern.arr) {
    let white = 0;
    let black = 0;
    for (let y = 0; y < arr.length; y++) {
      for (let x = 0; x < arr[y].length; x++) {
        switch (arr[y][x]) {
          case 1:
            white++;
            break;
          case 2:
            black++;
            break;
        }
      }
    }
    return { white, black };
  }

  regret() {
    if (this.history.length > 2) {
      this.history.shift();
      this.pattern.history = this.history[0].arr;
      this.color = 3 - this.history[0].color;
      this.checkPass();
    } else if (this.history.length === 2) {
      this.history.shift();
      this.pattern.history = this.history[0].arr;
      this.color = this.history[0].color;
      this.checkPass();
    }
  }

  move(x, y) {
    if (this.pattern.move(x, y, this.color, false).canMove) {
      this.history.unshift({
        color: this.color,
        arr: this.pattern.arr.map(item => item.slice())
      });
      this.color = 3 - this.color;
    }
    if (this.checkPass()) {
      console.log("passed");
      if (this.checkPass()) {
        console.log("Game Over");
      } else {
        this.color = 3 - this.color;
      }
    }
  }
}

class Ai {
  constructor() {
    this.pattern = new OthelloPattern();
    this.check = [];
  }

  ai(
    portability = [
      { i: 0, x: 0, y: 1 },
      { i: 1, x: 4, y: 4 },
      { i: 2, x: 7, y: 4 },
    ],
    arr = this.pattern.arr,
    color = 2,
    check = this.check
  ) {
    for (let [i, position] of portability.entries()) {
      let copy = arr.map(item => item.slice());
      let copyPattern = new OthelloPattern(copy);
      check = [];
      copyPattern.move(position.x, position.y, color, false);
      for (let y = 0; y < copyPattern.arr.length; y++) {
        for (let x = 0; x < copyPattern.arr[y].length; x++) {
          let move = copyPattern.move(x, y, 3 - color, true);
          if (move.canMove) {
            check.push({
              i,
              x,
              y
            });
          }
        }
      }
      if (check.length) {
        this.ai(check, copy, 3 - color, []);
      }
    }
    console.log(check)
  }
}
