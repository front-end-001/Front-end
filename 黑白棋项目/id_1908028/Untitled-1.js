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