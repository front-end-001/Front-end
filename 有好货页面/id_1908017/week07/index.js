import { h, BaseComponent } from './js/component';
import { Text } from './js/Text';
class HelloWorld extends BaseComponent {
  created() {
    super.created();
    this.root.innerText = 'hello world';
  }
  setAttribute(name, val) {
    super.setAttribute(name, val);
    if (name === 'title') {
      this.root.setAttribute(name, val);
    }
  }
  mounted() {
    this.root.addEventListener('click', e => {
      this.triggerEvent('click', e);
    })
  }
}
function clickHandler(e) {
  console.log('clickHandler', e, this);
}
(<HelloWorld title='show a title' on-click={clickHandler} >
  <Text>row1</Text>
  <Text>row2</Text>
</HelloWorld>).mount(document.getElementById('app'));