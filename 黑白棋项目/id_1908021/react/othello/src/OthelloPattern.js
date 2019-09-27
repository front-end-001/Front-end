export default class OthelloPattern {
  constructor() {
    this._status = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this._finished = false;
  }

  get status() {
    return this._status;
  }

  get finished() {
    return this._finished;
  }

  set status(value) {
    this._status = value;
  }

  set finished(value) {
    this._finished = value;
  }

  move(row, col, color, checkOnly) {
    if (this._status[row][col] !== 0) return;
    let directions = [
      [1, 1],
      [1, -1],
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1]
    ];

    let moveSuccess = false;

    for (const dir of directions) {
      let [x, y] = [row, col];
      let canMove = false;
      while (true) {
        x += dir[0];
        y += dir[1];
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
          canMove = false;
          break;
        }

        const xyStatus = this._status[x][y];
        if (xyStatus === 3 - color) {
          canMove = true;
        } else if (xyStatus === color) {
          break;
        } else if (xyStatus === 0) {
          canMove = false;
          break;
        }
      }

      moveSuccess = canMove || moveSuccess;
      if (canMove && !checkOnly) {
        while (true) {
          x -= dir[0];
          y -= dir[1];
          this._status[x][y] = color;
          if (x === row && y === col) break;
        }
      }
    }
    return moveSuccess;
  }

  checkPass(color) {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        if (this.move(i, j, color, true)) return false;
      }
    return true;
  }

  getWinner() {
    let white = 0;
    let black = 0;
    this._status.forEach(line => {
      line.forEach(cell => {
        if (cell === 1) {
          black++;
        } else if (cell === 2) {
          white++;
        }
      });
    });
    return white - black;
  }

  clone() {
    return this._status.slice();
  }
}
