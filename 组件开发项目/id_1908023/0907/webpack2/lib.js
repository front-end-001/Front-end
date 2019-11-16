const a = 123;
export default a;
for (let a of [1,2,3]) {
  console.log(a);
}

class Button {
  render () {
    return (
      <div></div>
    )
  }
}

class Component {
  render () {
    return <Button />
  }
}

const c = new Component();

console.log(c.render());