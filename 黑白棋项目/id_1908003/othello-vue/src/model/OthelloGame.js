import { deepClone } from '../assets/js/utils.js';

/** 1-黑子 */
const BLACK = 1;
/** 2-白子 */
const WHITE = 2;
/** -1- 边界 */
const BOUNDARY = -1;


export class ChessPattern {
  constructor(mapData) {
    /** @type {number[][]} 初始棋盘数据 */
    this.map = mapData || deepClone(this.defaultData);
  }

  defaultData = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  /** 方向偏移集合 */
  derictions = {
    left: [0, -1],
    right: [0, 1],
    up: [-1, 0],
    down: [1, 0],
    leftTop: [-1, -1],
    leftDown: [1, -1],
    rightTop: [-1, 1],
    rightDown: [1, 1],
  };

  /**
   * 
   * @param {{x: number, y: number, target: 1|2}} param0 移动参数
   * @returns {string|{map: number[][], ifNextAvailable: boolean, ifEnd: boolean}} 返回字符串表示走棋失败, 字符串内容是说明
   */
  move({ x, y, target }) {
    if (this.map[x][y] > 0) return '当前位置不可落子';

    /** 移动标记 */
    let hasMove = false;
    // 吃子, 各个方向
    Object.keys(this.derictions).forEach((key) => {
      /** @type {number[]} 方向偏移量 */
      const deriction = this.derictions[key];
      const data = this.findOneWay({ x, y, target, deriction });

      // 如果该方向不可消除
      if (!data) return;

      // 翻转/吃子逻辑
      let newX = data.x;
      let newY = data.y;

      /** 安照方向回退 */
      function back(deriction) {
        newX -= deriction[0];
        newY -= deriction[1];
      }

      while (back(deriction), this.boundaryCheck(newX, newY)) {
        this.map[newX][newY] = target;

        // 到落子位置结束循环
        if (newX === x && newY === y) break;
      }

      hasMove = true;
    });

    if (!hasMove) return '当前位置不可落子';

    // 更新边界标记
    this.markBoundary();
    // 检测对手是否能落子
    /** 对手 */
    const nextTarget = (target === WHITE) ? BLACK : WHITE;
    /** @type {boolean} true-对手可落子, false-对手不可落子 */
    const ifNextAvailable = this.checkAvailable({ target: nextTarget });
    /** @type {boolean} true-当前棋局已结算, false-棋局未结束 */
    let ifEnd = false;
    // 如果对手无法落子, 检查自己是否可落子, 不可落子则游戏结束
    if (!ifNextAvailable) {
      ifEnd = !this.checkAvailable({ target });
    }

    // 执行到这里说明已经走棋成功, 构造返回数据
    const result = {
      map: this.map,
      ifNextAvailable,
      ifEnd,
    }

    return result;
  }

  /**
   * 自动走棋
   * @param {1|2} target 角色
   */
  autoMove(target) {
    let canmove = false;
    let x;
    let y;
    for (let i = 0, needBreak = false; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.map[i][j] !== BOUNDARY) continue;
        // 各个方向确认是否可吃子
        // 如果找到 则标志退出循环
        needBreak = Object.keys(this.derictions).some((key) => {
          const data = this.findOneWay({ x: i, y: j, target, deriction: this.derictions[key] });
          if (!data) return false;
          // console.log(`找到${(target === WHITE) ? '白' : '黑'}子可落子位置(${i},${j})`);
          x = i;
          y = j;
          canmove = true;
          return true;
        });
        if (needBreak) break;
      }
      if (needBreak) break;
    }
    if (!canmove) return false;
    return this.move({ x, y, target });
  }

  setMap(mapData) {
    this.map = mapData ? deepClone(mapData) : deepClone(this.defaultData);
  }

  /** 标记边界 */
  markBoundary() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // 该坐标没有棋子则跳过
        if (this.map[i][j] <= 0) continue;

        Object.keys(this.derictions).forEach((key) => {
          const x = i + this.derictions[key][0];
          const y = j + this.derictions[key][1];

          if (!this.boundaryCheck(x, y)) return;

          if (this.map[x][y] === 0) {
            this.map[x][y] = BOUNDARY;
          }
        });
      }
    }
  }

  /**
   * 检测边界是否有可落子的点
   * @param {{target: 1|2}} param0 target 表示检测白子还是黑子的可落子的点
   * @returns {boolean} true-有落子点, false-无落子点
   */
  checkAvailable({ target }) {
    let canmove = false;
    for (let i = 0, needBreak = false; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.map[i][j] !== BOUNDARY) continue;
        // 各个方向确认是否可吃子
        // 如果找到 则标志退出循环
        needBreak = Object.keys(this.derictions).some((key) => {
          const data = this.findOneWay({ x: i, y: j, target, deriction: this.derictions[key] });
          if (!data) return false;
          // console.log(`找到${(target === WHITE) ? '白' : '黑'}子可落子位置(${i},${j})`);
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
  boundaryCheck(x, y) {
    return (x >= 0 && x <= 7 && y >= 0 && y <= 7)
  }

  /**
   * 在特定方向寻找可吃的范围, 如果找到返回坐标, 否则返回false
   * @param {{x: number, y: number, deriction: number[], target: 1|2}} param0 参数对象
   * @returns {false|{x: number, y: number}} 可吃则返回命中的坐标, 如果不可吃则返回 false
   */
  findOneWay({ x, y, deriction, target }) {
    // 往前走
    function next(deriction) {
      newX += deriction[0];
      newY += deriction[1];
    }

    let canmove = false;
    let newX = x;
    let newY = y;
    /** 同色棋 */
    const same = target;
    /** 异色棋 */
    const diffent = (target === WHITE) ? BLACK : WHITE;
    while (next(deriction), this.boundaryCheck(newX, newY)) {
      if (this.map[newX][newY] === diffent) {
        canmove = true;
      } else if (this.map[newX][newY] === same) {
        break;
      } else if (this.map[newX][newY] <= 0) {
        canmove = false;
        break;
      }
    }
    if (!this.boundaryCheck(newX, newY)) {
      canmove = false;
    }


    if (!canmove) return false;
    /** 找到的坐标 */
    return { x: newX, y: newY };
  }

  /** 统计棋盘信息 */
  countChess() {
    /** 黑棋计数 */
    let countBlack = 0;
    /** 白棋计数 */
    let countWhite = 0;
    /** 空位计数 */
    let countEmpty = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.map[i][j] === WHITE) {
          countWhite += 1;
        } else if (this.map[i][j] === BLACK) {
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
}
export default class ChessGame {
  /**
   * 构造函数
   * @param {1|2} player 玩家选择的
   * @param {function} updateCb 更新回调, 用于通知更新
   */
  constructor(player, updateCb) {
    this.player = player;
    /** @type {1|2} 当前轮 */
    this.currentTarget = BLACK;
    /** @type {1|2|3|0} 1-游戏开局, 2-游戏进行中, 3-pass规则生效中, 0-游戏结束 */
    this.status = 1;
    /** 是否锁定, true-锁定,不可操作 false-非锁定,可操作 */
    this.block = false;
    this.pattern = new ChessPattern();
    if (typeof updateCb === 'function') {
      this.updateNotify = updateCb;
    }

    // 过程缓存
    /** @type {object[]} */
    this.patterns = [];
    this.record();
  }

  getMap() {
    return deepClone(this.pattern.map);
  }

  /**
   * 玩家走棋
   * @param {number} x 行
   * @param {number} y 列
   * @returns {true|string} 走棋成功返回 true, 走棋失败返回失败原因
   */
  move(x, y) {
    if (this.block) return '请稍等...';
    // 吃子
    const moveResult = this.pattern.move({ x, y, target: this.currentTarget });

    const doNextTurn = (moveResult) => {
      if (typeof moveResult === 'string') {
        return moveResult;
      }

      // 进入下一轮, 切换对手
      if (moveResult.ifNextAvailable) {
        this.currentTarget = (this.currentTarget === WHITE) ? BLACK : WHITE;
        this.status = 2;
      } else if (moveResult.ifEnd) {
        this.status = 0;
      } else {
        this.status = 3;
      }

      // 记录当前步
      this.record();

      // 判断下一步是AI 自动走下一步
      if (this.currentTarget !== this.player) {
        this.block = true;
        // 模拟 AI 走棋时间
        setTimeout(() => {
          doNextTurn(this.pattern.autoMove(this.currentTarget));
        }, 2000);
      } else {
        this.block = false;
      }

      this.notify();
    }
    
    doNextTurn(moveResult);
    return true;
  }

  /**
   * 获取当前的提示文字
   * @returns {string} 当前游戏提示文字
   */
  getTip() {
    /** 提示文案 */
    let msg = '';
    /** 当前轮文字 */
    const currentText = (this.currentTarget === WHITE) ? '白棋' : '黑棋';
    const currentRoleText = (this.currentTarget === this.player) ? '玩家' : 'AI';

    if (this.status === 0) {
      const { countBlack, countWhite } = this.countChess();
      if (countBlack !== countWhite) {
        msg = `游戏已结束, ${ currentText }赢!`;
      } else {
        msg = '游戏结束, 平局';
      }
    } else if (this.status === 1) {
      msg = `${currentRoleText}轮: 开局, 黑棋先手`;
    } else if (this.status === 2) {
      msg = `${currentRoleText}轮: 请${ currentText }落子`;
    } else if (this.status === 3) {
      msg = `${currentRoleText}轮: PASS! ${ currentText }继续落子`;
    }

    return msg;
  }

  /** 重新开始 */
  reStart() {
    if (this.block) return;
    
    this.currentTarget = BLACK;
    this.status = 1;
    this.pattern.setMap();
    this.notify();
  }

  /** 缓存当前步 */
  record() {
    this.patterns.push({
      map: deepClone(this.pattern.map),
      currentTarget: this.currentTarget,
      status: this.status,
    });
  }

  /**
   * 回退
   * 回退应该回到同一个颜色上次落子的时机
   */
  moveBack() {
    if (this.block) return;
    if (this.patterns.length === 1) {
      return false;
    }

    let step;
    while (this.patterns.length > 1) {
      this.patterns.pop();
      step = this.patterns[this.patterns.length - 1];
      if (step.currentTarget === this.currentTarget) break;
    }
    this.currentTarget = step.currentTarget;
    this.status = step.status;
    this.pattern.setMap(step.map);
    this.notify();
  }

  /** 统计棋盘信息 */
  countChess() {
    return this.pattern.countChess();
  }

  /** 更新主动通知 */
  notify() {
    if (!this.updateNotify) return;
    try {
      this.updateNotify(this);
    } catch(err) {
      // eslint-disable-next-line
      console.error(err);
    }
  }

  isBlock() {
    return false;
  }
}

// // 仅剩两个空格
// let map = [
//   [1, 2, 2, 1, 1, 2, 1, 1],
//   [2, 2, 1, 1, 2, 2, 0, 1],
//   [2, 1, 1, 0, 2, 2, 2, 1],
//   [1, 1, 1, 2, 2, 2, 1, 2],
//   [2, 1, 2, 1, 2, 1, 2, 1],
//   [1, 2, 2, 0, 1, 0, 2, 2],
//   [1, 2, 2, 1, 1, 1, 2, 2],
//   [2, 1, 2, 2, 1, 2, 1, 1],
// ];
// // pass 用例
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


// /** 尝试某步, 返回尝试后的新 map 数据集 */
// function testStep({ currentMap, x, y, target }) {
//   const newMap = deepClone(currentMap);
//   const canMove = eat({ i: x, j: y, target, currentMap: newMap });
//   if (!canMove) {
//     return false;
//   }
//   return {
//     x,
//     y,
//     count: countChess(newMap),
//     map: newMap,
//   };
// }

// /** 给出建议步骤 */
// function getTip() {
//   console.group(`${ (currentTurn === BLACK) ? '黑子' : '白子' }下一步提示`);
//   const currentMap = map;
//   const testCollection = [];
//   for (let i = 0; i < 7; i += 1) {
//     for (let j = 0; j < 7; j += 1) {
//       if (currentMap[i][j] !== BOUNDARY) continue;
//       const testData = testStep({ currentMap, x: i, y: j, target: currentTurn })
//       if (testData) {
//         testCollection.push(testData)
//       }
//     }
//   }
//   if (testCollection.length === 0) {
//     console.log('没有可走的位置');
//     console.groupEnd();
//     return false;
//   }
//   let betterStep;
//   const key = (currentTurn === BLACK) ? 'countBlack' : 'countWhite';
//   testCollection.forEach((item) => {
//     betterStep = betterStep || item;

//     if (betterStep.count[key] < item.count[key]) {
//       betterStep = item;
//     }
//   });
//   console.log('可走位置有', testCollection);
//   console.log('建议走', betterStep);
//   console.groupEnd();
// }
