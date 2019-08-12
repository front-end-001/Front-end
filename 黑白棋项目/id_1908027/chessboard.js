class OthelloPattern {
  //用栈来前进和后退，也就是数据结构
  constructor() {
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  move(i, j, color, checkOnly) {
    if (this.map[i][j] > 0) return;
    // 向量判断不同的方向，进行遍历循环
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
    // 黑字和白子的反转状态
    let moveSuccess = false;
    for (let direction of directions) {
      let canmove = false;
      let [x, y] = [j, i];
      while (true) {
        x += direction.x;
        y += direction.y;
        // 棋盘的边界
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
          if (x == j && y == i) break;
        }
      }
    }

    return moveSuccess;
  }
  checkPass(color) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.move(i, j, color, true)) return false;
      }
    }
    return true;
  }
}

class OthelloGame {
  constructor() {
    this.pattern = new OthelloPattern();
    this.color = 1;
  }
  move(i, j) {
    if (this.pattern.move(i, j, this.color, false)) {
      this.color = 3 - this.color;
      if (this.pattern.checkPass(this.color)) {
        this.color = 3 - this.color;
        if (this.pattern.checkPass(this.color)) {
          alert("Game over!");
        }
      }
      return true;
    }
  }
}
class OthelloView {
  constructor(container, game) {
    this.container = container;
    this.game = game;
  }
  render() {
    // 清空所有子节点
    this.container.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement("div");
        this.container.appendChild(cell);
        cell.style = `vertical-align:middle;width:50px;margin:1px;
                height:50px;background-color:darkgreen;
                display:inline-block`;
        // 这里吃子逻辑和pass规则
        cell.addEventListener("click", event => {
          this.game.move(i, j);
          this.render();
        });
        // 数据驱动是否落子
        if (this.game.pattern.map[i][j] > 0) {
          let disc = document.createElement("div");
          disc.style = `margin:2px;border-radius:46px;
                    width:46px;height:46px;
                    background-color:${
                      this.game.pattern.map[i][j] == 1 ? "black" : "white"
                    }`;
          cell.appendChild(disc);
        }
      }
      this.container.appendChild(document.createElement("br"));
    }
  }
}

// 构造一个实例，也就是一个棋盘
new OthelloView(document.getElementById("board"), new OthelloGame()).render();
