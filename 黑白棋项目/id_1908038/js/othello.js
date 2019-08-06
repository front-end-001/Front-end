class OthelloPattern {
  constructor(map) {
    this.map = map || [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,2],
      [0,0,0,0,0,0,2,1]
    ];
  }
  move(i, j, color, checkOnly) {
    if(this.map[i][j] > 0) //有子才能走
      return;
    let directions = [ //不同方向
      {x:-1, y:-1},
      {x:-1, y:0},
      {x:-1, y:1},
      {x:0, y:-1},
      {x:0, y:1},
      {x:1, y:-1},
      {x:1, y:0},
      {x:1, y:1}
    ];
    let moveSuccess = false;

    for (let direction of directions) {
      let canMove = false;
      let [x,y] = [j, i];
      while(true){
        x += direction.x;
        y += direction.y;
        if(x < 0 || x >= 8 || y < 0 || y >= 8) { //边界
          canMove = false;
          break;
        }
        if(this.map[y][x] == 3 - color) {
          canMove = true;
        } else if(this.map[y][x] == color) {
          break;
        } else if(this.map[y][x] == 0) {
          canMove = false;
          break;
        }
      }
      
      moveSuccess = moveSuccess || canMove;

      if(canMove && !checkOnly) { //往回吃子
        while(true) {
          x -= direction.x;
          y -= direction.y;

          this.map[y][x] = color;
          if(x == j && y == i)
            break;
        }
      }
    }
    return moveSuccess;
  }
  checkPass(color) {
    for(let i = 0;i < 8;i++) {
      for(let j = 0;j < 8;j++) {
        if(this.move(i, j,color, true))
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
    if(pattern.move(i, j, color, false)) {
      color = 3 - color;
      if (pattern.checkPass(color)) {
        alert('pass');
        color = 3 - color;
        if (pattern.checkPass(color)) {
          alert('Game Over!');
        }
      }
      this.patterns.push(pattern);
      this.colors.push(color);
      return true;
    }
  }
  revert() { //悔棋
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
  }
  render() {
    this.container.innerHTML = '';
    for(let i=0;i<8;i++) {
      for(let j=0;j<8;j++) {
        let cell = document.createElement('div');
        this.container.appendChild(cell);
        cell.style = `vertical-align:middle;
          width:30px;
          height:30px;
          margin:1px;
          background-color:darkgreen;
          display:inline-block`;
        cell.addEventListener('click', e => {
          this.game.move(i, j);
          this.render();
        });
        if(this.game.pattern.map[i][j] > 0) {
          cell.className = `${this.game.pattern.map[i][j] == 1 ? 'black': 'white'}`;
        }
      }
      this.container.appendChild(document.createElement('br'));
    }
    let regret = document.createElement('button');
    regret.innerText = '悔棋';
    regret.addEventListener('click', e => {
      this.game.revert();
      this.render();
    });
    this.container.appendChild(regret);
  }
}

new OthelloView(document.getElementById("board"),
  new OthelloGame()).render();
new OthelloView(document.getElementById("board2"),
  new OthelloGame()).render();