class OthelloGame {
  constructor(container) {
    this.matrix = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.matrixHistory = [];
    this.matrixHistory = [];
    this.container = container;
    this.color = 1;
    this.colorHistory = [];
    this.colorMap = {
      1: "black",
      2: "white"
    };

    this.updateView();
  }
  /**
   * 更新视图
   */
  updateView() {
    this.container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let line = 0; line < 8; line++) {
      for (let row = 0; row < 8; row++) {
        const curValue = this.matrix[line][row];
        const div = document.createElement("div");
        div.classList.add("chessboard_item");
        curValue !== 0 &&
          div.classList.add(`chess--${this.colorMap[curValue]}`);
        div.addEventListener("click", () => {
          this.move(line, row);
        });
        fragment.append(div);
      }
      fragment.append(document.createElement("br"));
    }
    this.container.appendChild(fragment);
  }
  /**
   * 更新矩阵
   */
  updateMaTrix(eatDirections, line, row) {
    this.matrixHistory.push(JSON.parse(JSON.stringify(this.matrix))); // 保存上一份棋盘矩阵
    this.colorHistory.push(this.color);
    this.matrix[line][row] = this.color;
    eatDirections.forEach(direction => {
      for (var i = 1; i < direction.step; i++) {
        const l = direction.direction.map(el => el * i);
        this.matrix[line + l[0]][row + l[1]] = this.color;
      }
    });
  }
  /**
   * 走棋，落子后先更新矩阵再根据矩阵更新视图
   */
  move(line, row) {
    if (this.matrix[line][row] !== 0) return;
    const eatDirections = this.getEatDirections(line, row); // 获取可以吃子的所有方向
    if (eatDirections.length === 0) return; // 无法吃子，下子无效
    this.updateMaTrix(eatDirections, line, row);
    this.color = 3 - this.color;
    this.adjustGameover(); // 检查pass情况亦或者游戏是否结束
    this.updateView(this.matrix);
  }
  /**
   * 悔棋
   */
  regret() {
    if (this.matrixHistory.length === 0) {
      alert("先走再悔");
      return;
    }
    this.matrix = this.matrixHistory.pop();
    this.color = this.colorHistory.pop();
    this.updateView();
  }
  /**
   * 获取下棋子的位置可以吃子的方向
   * return: [{step: Int,direction: [Int, Int]}]
   */
  getEatDirections(line, row) {
    const result = [];
    let directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];
    [1, 2, 3, 4, 5, 6, 7].forEach(step => {
      let r = directions.map(direction => {
        const haha = direction.map(el => el * step);
        if (
          line + haha[0] > 7 ||
          row + haha[1] > 7 ||
          line + haha[0] < 0 ||
          row + haha[1] < 0
        ) {
          return false;
        }
        const curValue = this.matrix[line + haha[0]][row + haha[1]];
        if (step === 1) {
          if (curValue === 3 - this.color) {
            return true;
          } else {
            return false;
          }
        } else {
          if (curValue === 3 - this.color) {
            return true;
          } else if (curValue === this.color) {
            return direction;
          } else {
            return false;
          }
        }
      });

      let indexes = [];
      r.forEach((el, index) => {
        if (typeof el === "object") {
          result.push({
            direction: el,
            step
          });
        } else if (el) {
          indexes.push(index);
        }
      });

      directions = directions.filter((el, index) => {
        return indexes.includes(index);
      });
    });

    return result;
  }
  /**
   * 判断当前角色是否可以走棋
   * return: boolean
   */
  adjustCanMove() {
    for (let line = 0; line < 8; line++) {
      for (let row = 0; row < 8; row++) {
        if (
          this.matrix[line][row] === 0 &&
          this.getEatDirections(line, row).length > 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * 判断当前比赛是否结束（两人都不能走棋即为结束）
   * return boolean
   */
  adjustGameover() {
    if (!this.adjustCanMove(this.matrix)) {
      this.color = 3 - this.color;
    }
    if (!this.adjustCanMove(this.matrix)) {
      alert("游戏结束");
    }
  }
}

const game = new OthelloGame(document.getElementById("app"));

document.getElementById("btn").addEventListener("click", () => {
  game.regret();
});

/**
 * ！！！！！！！！！
 * 理解winter老师的抽象手法后重构
 * ！！！！！！！！！！！
 */
