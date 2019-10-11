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

            if (map[y][x] == 2) {
              canmove = true;
            } else if (map[y][x] == 1) {
              break;
            } else if (map[y][x] == 0) {
              canmove = false;
              break;
            }
          }

          if (canmove) {
            while(true) {
              x -= direction.x;
              y -= direction.y;
              map[y][x] = 1;
              if (x == j && y == i) {
                break;
              }
            }
          }
        }
        render();
      })
    }
  }
  container.appendChild(fragment);
}
