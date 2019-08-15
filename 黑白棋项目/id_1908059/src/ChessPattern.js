export default class ChessPattern {
  static initialMap = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  constructor({ updateMap }) {
    this.updateMap = updateMap;
    this.map = ChessPattern.initialMap;
  }

  move({ i, j }, color, checkOnly) {
    let moveSuccess = false;
    let directions = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ];
    const newMap = this.cloneMap();
    for (let direction of directions) {
      let canmove = false;
      let [x, y] = [j, i];
      while (1) {
        y += direction.y;
        x += direction.x;
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
          canmove = false;
          break;
        }

        if (this.map[y][x] === 3 - color) {
          canmove = true;
        } else if (this.map[y][x] === color) {
          break;
        } else if (this.map[y][x] === 0) {
          canmove = false;
          break;
        }
      }
      moveSuccess = moveSuccess || canmove;

      if (canmove && !checkOnly) {
        while (true) {
          x -= direction.x;
          y -= direction.y;
          newMap[y][x] = color;
          if (x === j && y === i) {
            break;
          }
        }
      }
    }
    if (!checkOnly) {
      this.map = newMap;
      this.updateMap(newMap);
    }

    return moveSuccess;
  }

  cloneMap = () => {
    return this.map.map(column => [...column]);
  };

  checkPass(color) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.move({ i, j }, color, true)) {
          return false;
        }
      }
    }
    return true;
  }
}
