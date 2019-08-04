/** 1-黑子 */
const BLACK = 1;
/** 2-白子 */
const WHITE = 2;
/** -1- 边界 */
const BOUNDARY = -1;
/** 方向偏移 */
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

/** 棋盘数据 */
// let map = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 2, 1, 0, 0, 0],
//   [0, 0, 0, 1, 2, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];
// 仅剩两个空格
let map = [
  [1, 2, 2, 1, 1, 2, 1, 1],
  [2, 2, 1, 1, 2, 2, 0, 1],
  [2, 1, 1, 0, 2, 2, 2, 1],
  [1, 1, 1, 2, 2, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 0, 1, 0, 2, 2],
  [1, 2, 2, 1, 1, 1, 2, 2],
  [2, 1, 2, 2, 1, 2, 1, 1],
];
// pass 用例
// let map = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 2, 2],
//   [0, 0, 0, 0, 0, 0, 2, 1],
// ];

/** @type {Element} 棋盘容器元素 */
let container = document.getElementById("board");
/** @type {Element} 提示元素 */
let textContainer = document.getElementById("tooltip");
/** 当前轮 */
let currentTurn = BLACK;

/** 切换下一轮 */
function nextTurn({ nextAvailable, needEnd = false }) {
  // 控制显示
  let msg;
  if (needEnd) {
    // 检测棋盘中哪种棋数量多
    const { countBlack, countWhite } = countChess(map);
    if (countWhite > countBlack) {
      msg = `本轮结束, 白子赢`;
    } else if (countWhite < countBlack) {
      msg = `本轮结束, 黑子赢`;
    } else {
      msg = `本轮结束, 平局`;
    }
  } else {
    if (!nextAvailable) {
      msg = (currentTurn === BLACK) ? '白子无可下位置, 仍是黑子轮' : '黑子无可下位置, 仍是白子轮';
    } else {
      // 切换标志
      if (currentTurn === BLACK) {
        currentTurn = WHITE;
      } else {
        currentTurn = BLACK;
      }
      if (currentTurn === BLACK) {
        msg = '本轮为黑子环节';
      } else {
        msg = '本轮为白子环节';
      }
  
    }
  }
  textContainer.textContent = msg;
}

/** 获取边界 */
function checkPath() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      Object.keys(deriction).forEach((key) => {
        if (map[i][j] <= 0) return;
        const x = i + deriction[key][0];
        const y = j + deriction[key][1];
        if (!boundaryCheck(x, y)) return;

        if (map[x][y] === 0) {
          map[x][y] = BOUNDARY;
        }
      });
    }
  }
}

/** 检测边界是否有可落子的点 */
function checkAvailable({ turnData, currentMap }) {
  let canmove = false;
  for (let i = 0; i < 8; i++) {
    let needBreak = false;
    for (let j = 0; j < 8; j++) {
      if (map[i][j] !== BOUNDARY) continue;
      // 吃子, 各个方向
      // 如果找到 则标志退出循环
      needBreak = Object.keys(deriction).some((key) => {
        // 判断下一轮的人员
        const data = findOneWay({ i, j, selfData: turnData, deriction: deriction[key], currentMap });
        if (!data) return false;
        console.log('找到可落子位置', i, j);
        canmove = true;
        return true;
      });
      if (needBreak) break;
    }
    if (needBreak) break;
  }
  return canmove;
}

/** 边界判断 */
function boundaryCheck(x, y) {
  return (x >= 0 && x <= 7 && y >= 0 && y <= 7)
}

/**
 * 在特定方向寻找可吃的范围, 如果找到返回坐标, 否则返回false
 * @param {object} param0 参数对象
 * @returns {boolean|object} 可吃的范围, 如果不可吃则返回 false
 */
function findOneWay({ i, j, deriction, selfData, currentMap }) {
  // 往前走
  function next() {
    x += deriction[0];
    y += deriction[1];
  }

  let canmove = false;
  let x = i;
  let y = j;
  let same = selfData;
  let diffent = (selfData === WHITE) ? BLACK : WHITE;
  while (next(), boundaryCheck(x, y)) {
    if (currentMap[x][y] === diffent) {
      canmove = true;
    } else if (currentMap[x][y] === same) {
      break;
    } else if (currentMap[x][y] <= 0) {
      canmove = false;
      break;
    }
  }
  if (!boundaryCheck(x, y)) {
    canmove = false;
  }


  if (canmove) {
    return { x, y };
  }
  return false;
}

/**
 * 全方向的吃子规则, 8个方向
 * @param {object} param0 参数对象
 * @returns {boolean} 是否成功吃子, 某个方向吃即可
 */
function eat({ i, j, target, currentMap }) {

  // 吃子, 各个方向
  let canmove = false;
  Object.keys(deriction).forEach((key) => {
    const data = findOneWay({ i, j, selfData: target, deriction: deriction[key], currentMap });
    if (!data) return;

    // 翻转/吃子
    let { x, y } = data;
    // 回退
    function back() {
      x -= deriction[key][0];
      y -= deriction[key][1];
    }
    while (back(), boundaryCheck(x, y)) {
      currentMap[x][y] = target;
      if (x === i && y === j) {
        break;
      }
    }
    canmove = true;
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
      if (map[i][j] === BLACK) {
        cell.classList.add('black');
      } else if (map[i][j] === WHITE) {
        cell.classList.add('white');
      } else if (map[i][j] === BOUNDARY) {
        cell.classList.add('boundary');
      }
      if (map[i][j] > 0) continue;
      cell.addEventListener('click', (event) => {
        // 吃子
        const canMove = eat({ i, j, target: currentTurn, currentMap: map });

        if (!canMove) {
          alert('必须要落在可以吃子的位置');
          return;
        }

        // 边界检测
        checkPath();
        const nextTurnData = (currentTurn === WHITE) ? BLACK : WHITE;
        const ifAvailable = checkAvailable({ turnData: nextTurnData, currentMap: map });
        let ifEnd = false;
        // 如果对手无法落子, 检查自己是否可落子, 不可落子则游戏结束
        if (!ifAvailable) {
          ifEnd = !checkAvailable({ turnData: currentTurn, currentMap: map });
        }

        // 进入下一轮, 切换对手
        nextTurn({ nextAvailable: ifAvailable, needEnd: ifEnd });

        // 渲染
        render();
      });
    }
    container.appendChild(document.createElement('br'));
  }
}

/** 深度克隆 */
function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

/** 统计棋盘信息 */
function countChess(mapData) {
  /** 黑棋计数 */
  let countBlack = 0;
  /** 白棋计数 */
  let countWhite = 0;
  /** 空位计数 */
  let countEmpty = 0
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (mapData[i][j] === WHITE) {
        countWhite += 1;
      } else if (mapData[i][j] === BLACK) {
        countBlack += 1;
      } else {
        countEmpty += 1;
      }
    }
  }
  return {
    countBlack,
    countWhite,
    countEmpty,
  };
}

/** 尝试某步, 返回尝试后的新 map 数据集 */
function testStep({ currentMap, x, y, target}) {
  const newMap = deepClone(currentMap);
  const canMove = eat({ i: x, j: y, target, currentMap: newMap });
  if (!canMove) {
    return false;
  }
  return {
    x,
    y,
    count: countChess(newMap),
    map: newMap,
  };
}

/** 给出建议步骤 */
function getTip() {
  console.group(`${ (currentTurn === BLACK) ? '黑子' : '白子' }下一步提示`);
  const currentMap = map;
  const testCollection = [];
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      if (currentMap[i][j] !== BOUNDARY) continue;
      const testData = testStep({ currentMap, x: i, y: j, target: currentTurn})
      if (testData) {
        testCollection.push(testData)
      }
    }
  }
  if (testCollection.length === 0) {
    console.log('没有可走的位置');
    console.groupEnd();
    return false;
  }
  let betterStep;
  const key = (currentTurn === BLACK) ? 'countBlack' : 'countWhite';
  testCollection.forEach((item) => {
    betterStep = betterStep || item;
    
    if (betterStep.count[key] < item.count[key]) {
      betterStep = item;
    }
  });
  console.log('可走位置有', testCollection);
  console.log('建议走', betterStep);
  console.groupEnd();
}

render();
