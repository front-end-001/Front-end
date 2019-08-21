window.onload = function () {
  class OthelloPattern {
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

    // 走子，checkOnly--是否是检查模式，返回 true 说明可以走子
    move(i, j, color, checkOnly) {
      // 如果当前点击的地方已经有子了
      if (this.map[i][j] > 0) return;

      // 设置找子方向
      let directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
      ];
      let moveSuccess = false;
      for (let direction of directions) {
        // 游标是否可以移动
        let canmove = false;
        // j 表示横排, 相应的 x 是横排
        let [x, y] = [j, i];
        // 找子逻辑
        while (true) {
          x += direction.x;
          y += direction.y;
          // 判断边界情况
          if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            canmove = false;
            break;
          }
          // 如果是对方颜色说明还可以继续往前找
          if (this.map[y][x] === 3 - color) {
            canmove = true;
            // 遇到当前颜色说明找到头了
          } else if (this.map[y][x] === color) {
            break;
            // 如果是空的也不能下子
          } else if (this.map[y][x] === 0) {
            canmove = false;
            break;
          }
        }

        moveSuccess = moveSuccess || canmove;

        // 找到目标棋子后，开始翻转棋子颜色，检查模式不翻转
        if (canmove && !checkOnly) {
          while (true) {
            // 反向翻转颜色
            x -= direction.x;
            y -= direction.y;
            this.map[y][x] = color;
            // x 和 y 回到当前格的时候，说明还原到原位了
            if (x === j && y === i)
              break;
          }
        }
      }
      // 返回 true 则说明还可以再走子，就重新绘制一次棋盘
      return moveSuccess;
    }

    // 检查是否胜利了，返回 true 则表示胜利了
    checkPass(color) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          // 如果可以再走子，说明游戏还没完
          if (this.move(i, j, color, true))
            return false;
        }
      }
      return true;
    }
    
    clone() {
      return new OthelloPattern(this.map.map(line => line.slice()));
    }
  }

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
    move(i, j) {
      let pattern = this.pattern.clone();
      let color = this.color;
      if (pattern.move(i, j, color, false)) {
        // 交换选手颜色
        color = 3 - color;
        // 先检查一遍当前颜色的
        if (pattern.checkPass(color)) {
          console.log('pass');
          color = 3 - color;
          // 再检查一遍对方颜色的
          if (pattern.checkPass(color)) {
            alert('Game over!');
          }
        }
        this.patterns.push(pattern);
        this.colors.push(color);
        return true;
      }
    }

    // 悔棋
    revert() {
      if (this.patterns.length > 1) {
        this.patterns.pop();
        this.colors.pop();
      }
    }

  }

  class OthelloView {
    constructor(container, game) {
      this.container = container;
      this.game = game;
      // this.fragment = document.createDocumentFragment();
    }

    // 渲染棋盘和逻辑
    render() {
      // current.innerText = color === 1 ? '黑方' : '白方';
      // 渲染时把之前的节点清空
      this.container.innerHTML = '';
      const fragment = document.createDocumentFragment();
      // let black = [], white = [];
      // let 绑定了作用域，所以事件里面就不用使用闭包来传递变量了
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          // 计数
          // if (chessData[i][j] === 1) {
          //   black.push(1);
          // }
          // if (chessData[i][j] === 2) {
          //   white.push(2);
          // }

          const emptyChessBox = document.createElement('div');
          emptyChessBox.className = 'chess-box';
          // 吃子逻辑
          emptyChessBox.addEventListener('click', e => {
            this.game.move(i, j)
            this.render();
          });

          if (this.game.pattern.map[i][j] === 2) {
            emptyChessBox.className = 'chess-box chess-white';
          } else if (this.game.pattern.map[i][j] === 1) {
            emptyChessBox.className = 'chess-box chess-black';
          }
          fragment.appendChild(emptyChessBox);
        }
      }

      // count.innerText = `黑：${black.length}，白：${white.length}`;

      this.container.appendChild(fragment);
    }
  }



  // document.createDocumentFragment
  const container = document.querySelector('.container');
  // const fragment = document.createDocumentFragment();
  // const current = document.querySelector('#current');
  // const count = document.querySelector('#count');

  new OthelloView(container, new OthelloGame()).render();

}