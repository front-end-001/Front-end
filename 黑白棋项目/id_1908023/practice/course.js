let map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const container = document.getElementById('container');
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
        let x = j;
        let canmove = false;
        while (x-- > 0) {
          if (map[i][x] === 2) {
            canmove = true;
          } else {
            break;
          }
        }
  
        if (canmove) {
          while(++x <= j) {
            map[i][x] = 1;
          }
        }
        console.log(map);
        render();
      })
    }
  }
  container.appendChild(fragment);
}

