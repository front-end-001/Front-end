class Pattern {
  constructor(map) {
    this.map = map || [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
  move(i, j, color, checkOnly){
    if(this.map[i][j] > 0)
      return;
    let directions = [
      {x:-1, y:-1},
      {x:-1, y:0},
      {x:-1, y:1},
      {x:0, y:-1},
      {x:0, y:1},
      {x:1, y:-1},
      {x:1, y:0},
      {x:1, y:1}
    ]
    let moveSuccess = false;
    for(let direction of directions) {
      let canmove = false;
      let [x, y] = [j, i];
      while(true) {
        x += direction.x;
        y += direction.y;
        if(x < 0 || x >= 8 || y < 0 || y >= 8) {
          canmove = false;
          break;
        }
        if(this.map[y][x] == 3 - color) {
          canmove = true;
        } else if(this.map[y][x] == color) {
          break
        } else if(this.map[y][x] == 0) {
          canmove = false;
          break;
        }
      }

      moveSuccess = moveSuccess || canmove;

      if(canmove && !checkOnly) {
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

  checkPass(color){
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(this.move(i, j, color, true))
          return false;
      }
    }
    return true;
  }

  clone(){
    return new Pattern(this.map.map(line => line.slice()));
  }
}

class Game {
  constructor() {
    // this.pattern = new Pattern();
    this.colors = [1];
    // this.colors = [];
    this.patterns = [new Pattern()];
  }

  get pattern(){
    return this.patterns[this.patterns.length - 1];
  }
  get color(){
    return this.colors[this.colors.length - 1];
  }

  move(i, j) {
    console.log('colors:', this.colors);
    let pattern = this.pattern.clone();
    let color = this.color;

    if(pattern.move(i, j, color, false)){
      color = 3 - color;
      if(pattern.checkPass(color)) {
        color = 3 - color;
        if(pattern.checkPass(color)) {
          alert("Game over!");
        }
      }
      this.colors.push(color);
      this.patterns.push(pattern);
      // clone map
      // console.log('xx', this.pattern.map.map(l => [...l]));
      // let m = this.pattern.map.map(l => l.slice());
      return true;
    }
  }

  reverse() {
    // console.log('current patterns:', this.patterns);

    if(this.patterns.length > 1) {
      this.patterns.pop();
      this.colors.pop();
    }
  }
}

class View {
  constructor(container, game) {
    this.container = container;
    this.game = game;
  }

  render() {
    this.container.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        this.container.appendChild(cell);

        cell.addEventListener('click', (e) => {
          this.game.move(i, j);
          this.render()
        });

        if (this.game.pattern.map[i][j] === 1) {
          let chess = document.createElement('div');
          chess.className = 'black';
          cell.appendChild(chess);
        }
        if (this.game.pattern.map[i][j] === 2) {
          let chess = document.createElement('div');
          chess.className = 'white';
          cell.appendChild(chess);
        }
      }
      let br = document.createElement('br');
      this.container.appendChild(br);
    }

    let regret = document.createElement('button');
    regret.innerText = "悔棋";
    regret.addEventListener('click', () => {
      this.game.reverse();
      this.render();
    });
    this.container.appendChild(regret);
  }
}

new View(document.getElementById('container'), new Game()).render();
