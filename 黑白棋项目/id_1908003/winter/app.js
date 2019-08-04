/** 1-黑子 */
const BLACK = 1;
/** 2-白子 */
const WHITE = 2;

/** 棋盘数据 */
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

/** @type {Element} 棋盘容器元素 */
let container = document.getElementById("board");
/** @type {Element} 提示元素 */
let textContainer = document.getElementById("tooltip");
/** 当前轮 */
let currentTurn = BLACK;

/** 切换下一轮 */
function nextTurn() {
  // 切换标志
  if (currentTurn === BLACK) {
    currentTurn = WHITE;
  } else {
    currentTurn = BLACK;
  }
  // 控制显示
  let msg;
  if (currentTurn === BLACK) {
    msg = '本轮为黑子环节';
  } else {
    msg = '本轮为白子环节';
  }
  textContainer.textContent = msg;
}

/**
 * 某个方向的吃子规则, stateless
 * @param {object} param0 参数对象
 * @returns {boolean} 是否成功吃子
 */
function eatOneWay({ i, j, deriction, currentTurn }) {
  // 往前走
  function next() {
    x += deriction[0];
    y += deriction[1];
  }
  // 回退
  function back() {
    x -= deriction[0];
    y -= deriction[1];
  }
  // 边界判断
  function boundaryCheck() {
    return (x >= 0 && x <= 7 && y >= 0 && y <= 7)
  }
  let canmove = false;
  let x = i;
  let y = j;
  let same = currentTurn;
  let diffent = (currentTurn === WHITE) ? BLACK : WHITE;
  while (next(), boundaryCheck()) {
    if (map[x][y] === diffent) {
      canmove = true;
    } else if (map[x][y] === same) {
      break;
    } else if (map[x][y] === 0) {
      canmove = false;
      break;
    }
  }
  if (!boundaryCheck()) {
    canmove = false;
  }

  while (canmove && (back(), boundaryCheck())) {
    map[x][y] = same;
    if (x === i && y === j) {
      break;
    }
  }
  return canmove;
}

/**
 * 全方向的吃子规则, 8个方向
 * @param {object} param0 参数对象
 * @returns {boolean} 是否成功吃子, 某个方向吃即可
 */
function eat({ i, j, currentTurn }) {
  /** 吃子方向 */
  const deriction = {
    left: [0, -1],
    right: [0, 1],
    up: [-1, 0],
    down: [1, 0],
    leftTop: [-1, -1],
    leftDown: [1, -1],
    rightTop: [-1, 1],
    rightDown: [1, 1],
  };
  // 吃子, 各个方向
  let canmove = false;
  Object.keys(deriction).forEach((key) => {
    if (eatOneWay({
        i,
        j,
        currentTurn,
        deriction: deriction[key],
      })) {
      canmove = true;
    }
  });
  return canmove;
}

/** 渲染函数 */
function render() {
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement('div');
      container.appendChild(cell)
      cell.classList.add('chess-cell');
      cell.addEventListener('click', (event) => {
        // 吃子
        const canMove = eat({ i, j, currentTurn });

        if (!canMove) {
          alert('必须要落在可以吃子的位置');
          return;
        }
        // 渲染
        render();

        // 进入下一轮
        nextTurn();
      });
      if (map[i][j] === BLACK) {
        cell.classList.add('black');
      }
      if (map[i][j] === WHITE) {
        cell.classList.add('white');
      }
    }
    container.appendChild(document.createElement('br'))
  }
}

render();
