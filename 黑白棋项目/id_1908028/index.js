class OthelloPattern {
  constructor(
    arr = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 2, 1, 1, 2, 2, 2, 2],
      [1, 1, 1, 1, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 2, 2, 2],
      [1, 2, 1, 1, 0, 2, 1, 0],
      [1, 1, 1, 2, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 1, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
    ]
  ) {
    // this.arr = [
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 1, 2, 0, 0, 0],
    //   [0, 0, 0, 2, 1, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    // ];
    this.arr = arr;
  }

  move(x, y, color, checkOnly = false) {
    if (![0, 1, 2].includes(this.arr[y][x])) {
      this.arr[y][x] = 0;
    }
    let ox = x;
    let oy = y;
    let count = 0;
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
      [0, -1],
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
    // if (canMove && !checkOnly) {
    //   color = 3 - color;
    // }
    return { canMove, count };
  }
}

class OthelloGame {
  constructor() {
    this.pattern = new OthelloPattern();
    this.color = 2;
    this.optimal = void 0;
  }
  // checkPass() {
  //   let check = [];
  //   for (let y = 0; y < this.pattern.arr.length; y++) {
  //     for (let x = 0; x < this.pattern.arr[y].length; x++) {
  //       let move = this.pattern.move(x, y, this.color, true);
  //       if (move.canMove) {
  //         check.push({
  //           x,
  //           y,
  //           num:
  //             this.color === 1
  //               ? this.count().white + move.count
  //               : this.count().black + move.count,
  //         });
  //       }
  //     }
  //   }
  //   if (check.length) {
  //     for (let i = 0; i < check.length; i++) {
  //       this.pattern.arr[check[i].y][check[i].x] = check[i].num.toString();
  //     }
  //     return false;
  //   }
  //   return true;
  // }

  checkPass() {
    let result = this.simulation();
    if (!result.result) {
      this.pattern.arr = result.copyArr.map((item) => {
        let [...arr] = item;
        return arr;
      });
      return false;
    }
    return true;
  }

  simulation() {
    let copyArr = this.pattern.arr.map((item) => {
      let [...arr] = item;
      return arr;
    });

    let check = [];
    let copyCheck2 = [];
    let copyCheck = [];

    for (let y = 0; y < copyArr.length; y++) {
      for (let x = 0; x < copyArr[y].length; x++) {
        let move = this.pattern.move(x, y, this.color, true);
        if (move.canMove) {
          check.push({
            x,
            y,
            num:
              this.color === 1
                ? this.count().white + move.count
                : this.count().black + move.count,
          });
        }
      }
    }
    if (check.length) {
      for (let i = 0; i < check.length; i++) {
        copyArr[check[i].y][check[i].x] = check[i].num.toString();
        let xx = this.pattern.arr.map((item) => {
          let [...arr] = item;
          return arr;
        });
        copyCheck = [];
        let copyPattern = new OthelloPattern(xx);
        copyPattern.move(check[i].x, check[i].y, this.color, false);
        for (let y = 0; y < copyPattern.arr.length; y++) {
          for (let x = 0; x < copyPattern.arr[y].length; x++) {
            let move = copyPattern.move(x, y, 3 - this.color, true);
            if (move.canMove) {
              // console.log(x,y)
              copyCheck.push({
                x,
                y,
                num:
                  3 - this.color === 1
                    ? this.count(copyPattern.arr).white + move.count
                    : this.count(copyPattern.arr).black + move.count,
              });
            }
          }
        }
        if (copyCheck.length) {
          for (let k = 0; k < copyCheck.length; k++) {
            let yy = xx.map((item) => {
              let [...arr] = item;
              return arr;
            });
            let copyPattern = new OthelloPattern(yy);
            copyPattern.move(
              copyCheck[k].x,
              copyCheck[k].y,
              3 - this.color,
              false
            );
            for (let y = 0; y < copyPattern.arr.length; y++) {
              for (let x = 0; x < copyPattern.arr[y].length; x++) {
                let move = copyPattern.move(x, y, this.color, true);
                if (move.canMove) {
                  copyCheck2.push({
                    i,
                    x,
                    y,
                    num:
                      this.color === 1
                        ? this.count(copyPattern.arr).white + move.count
                        : this.count(copyPattern.arr).black + move.count,
                  });
                }
              }
            }
          }
        }
      }
      this.optimal=copyCheck2.length?check[copyCheck2.sort((a, b) => b.num - a.num)[0].i]:copyCheck.length?copyCheck.sort((a, b) => b.num - a.num)[0]:check.sort((a, b) => b.num - a.num)[0]
      return { result: false, copyArr };
    }
    return { result: true, copyArr };
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

  move(x, y) {
    if (this.pattern.move(x, y, this.color, false).canMove) {
      this.color = 3 - this.color;
    }
    if (this.checkPass()) {
      console.log('passed');
      this.color = 3 - this.color;
      if (this.checkPass()) {
        console.log('Game Over');
      }
    }
  }
}
