/**
 * 主函数入口
 */

class ChessBord {
  constructor({ size = 8, bc = 'antiquewhite', borderC = '#ccc', border = 1 }) {
    if (size < 8) {
      alert("棋盘大小至少为8");
      throw Error('棋盘大小至少为8');
    }
    if ((size % 2) !== 0) {
      alert("棋盘大小需要为偶数");
      throw Error('棋盘大小需要为偶数');
    }
    /** 行数 */
    this.row = size;
    /** 列数 */
    this.column = size;
    /** 背景色 */
    this.bc = bc;
    /** 边框色 */
    this.borderC = borderC;
    /** @type {number} 边框宽度 */
    this.border = border;
    /** 棋盘初始数据 */
    this.data = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const centerX = this.row / 2;
    const centerY = this.column / 2;
    for (let i = 0; i < this.row; i ++) {
      this.data[i].push([]);
      for (let j = 0; j < this.column; j ++) {
        this.data[i][j].push(0);
      }
    }
  }

  /**
   * 绘制棋盘方法
   * @param {Element} ele 绘制的父元素 
   */
  draw(ele) {
    if (!ele) {
      return false;
    }

  }
}
