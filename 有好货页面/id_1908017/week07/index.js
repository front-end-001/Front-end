import { h, BaseComponent } from './js/component';
class HelloWorld extends BaseComponent {
  created() {
    super.created();
    this.root.innerText = 'hello world';
  }
}
(<HelloWorld />).mount(document.getElementById('app'));