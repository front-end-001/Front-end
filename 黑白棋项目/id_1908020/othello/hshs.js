const app = document.querySelector('#app')
const BLANK = 1
const WHITE = 2
let arr = new Array(64).fill(0)
let color = 1
arr[27] = 1
arr[28] = 2
arr[35] = 2
arr[36] = 1
// 方向
const inspect_list = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]
render()

function handleClick(index) {
  let canMove = false
  inspect_list.forEach(direction => {
    let next_position = next_pos(index, direction)
    //console.log(next_pos)
    function haha() {
      if ((next_position.x > -1) &&
        (next_position.x < 8) &&
        (next_position.y > -1) &&
        (next_position.y < 8)) {
        if(arr[index]===3-color){
          canMove=true
          next_position = next_pos2(next_position.x, next_position.y, direction)
          haha()
        }else if (arr[index]===0){
          
        }
      }
    }
    haha()
  })
  if (canMove) {
    arr[index] = color
    render()
    color = 3 - color
  }
}
function render() {
  app.innerHTML = ''
  let container = document.createElement('div')
  arr.forEach((value, index) => {
    let node = document.createElement('div')
    node.innerText = index
    node.addEventListener('click', e => handleClick(index))
    node.classList.add('block')
    if (value === 1) {
      node.classList.add('black')
    } else if (value === 2) {
      node.classList.add('white')
    }
    container.appendChild(node)
    if ((index + 1) % 8 === 0) {
      container.appendChild(document.createElement('br'))
    }
  })
  app.appendChild(container)
}
function pos(index) {
  return {
    x: Math.floor(index / 8),
    y: index % 8
  }
}
function next_pos(index, direction) {
  return {
    x: pos(index).x + direction[0],
    y: pos(index).y + direction[1]
  }
}
function next_pos2(x, y, direction) {
  return {
    x: x + direction[0],
    y: y + direction[1]
  }
}