// 2 代表白色，1代表黑色
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();

let color = 1;

render();

function render() {
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const chessBox = document.createElement('div');
      chessBox.className = 'chess-box';
      fragment.appendChild(chessBox);
      const chess = map[i][j];
      if (chess > 0) {
        chessBox.className += `${chess === 2 ? ' chess-white' : ' chess-black'}`;
      }

      chessBox.addEventListener('click', () => {
        if (map[i][j] > 0) return;
        
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

            if (map[y][x] == 3 - color) {
              canmove = true;
            } else if (map[y][x] == color) {
              break;
            } else if (map[y][x] == 0) {
              canmove = false;
              break;
            }
          }

          if (canmove) {
            moveSuccess = true;
            while(true) {
              x -= direction.x;
              y -= direction.y;
              map[y][x] = color;
              if (x == j && y == i) {
                break;
              }
            }
          }
        }
        if (moveSuccess) {
          color = 3 - color;
          render();
        }
      })
    }
  }
  container.appendChild(fragment);
}
