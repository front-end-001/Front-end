window.onload = function () {
  document.createDocumentFragment
  const container = document.querySelector('.container');
  const fragment = document.createDocumentFragment();
  const current = document.querySelector('#current');

  // 黑1 白2
  const chessData = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // 代表当前下棋的颜色，默认黑色
  let color = 1;
  
  render();

  function render() {
    current.innerText = color === 1 ? '黑方' : '白方';
    // 渲染时把之前的节点清空
    container.innerHTML = '';
    // let 绑定了作用域，所以事件里面就不用使用闭包来传递变量了
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const emptyChessBox = document.createElement('div');
        emptyChessBox.className = 'chess-box';
        // 黑色吃子逻辑
        emptyChessBox.addEventListener('click', e => {
          // 如果当前点击的地方已经有子了
          if (chessData[i][j] > 0) return;

          // 设置找子方向
          let directions = [
            {x: -1, y: -1},
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1},
          ];
          let moveSuccess = false;
          for (let direction of directions) {
            // 查找游标是否可以移动
            let canmove = false;
            // j 表示横排, 相应的 x 是横排
            let [x, y] = [j, i];
            while(true) {
              x += direction.x;
              y += direction.y;
              if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                canmove = false;
                break;
              }
              if (chessData[y][x] === 3 - color) {
                canmove = true;
              // 遇到黑棋说明找到头了
              } else if (chessData[y][x] === color) {
                break;
                // 如果左边的那个是空的也不能下子
              } else if (chessData[y][x] === 0) {
                canmove = false;
                break;
              }
            }

            // 找到目标棋子后，开始翻转棋子颜色
            if (canmove) {
              moveSuccess = true;
              while(true) {
                x -= direction.x;
                y -= direction.y;
                chessData[y][x] = color;
                if (x === j && y === i) {
                  break;
                }
              }
            }
          }
          if (moveSuccess) {
            color = 3 - color;
          }
          // 重新绘制一次棋盘
          render();
        });
        
        if (chessData[i][j] === 2) {
          emptyChessBox.className = 'chess-box chess-white';
          fragment.appendChild(emptyChessBox);
        } else if (chessData[i][j] === 1) {
          emptyChessBox.className = 'chess-box chess-black';
          fragment.appendChild(emptyChessBox);
        } else {
          fragment.appendChild(emptyChessBox);
        }
      }
    }
    container.appendChild(fragment);
  }
}