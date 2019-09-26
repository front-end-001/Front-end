import { BaseComponent } from "./component";

export class ScrollView extends BaseComponent {
  created() {
    super.created();
    this.root.style.height = '100%';
    this.root.style.overflowY = 'auto';
    this.placeHolder = document.createElement('div');
  }

  mounted() {
    const { root } = this;
    this.root.appendChild(this.placeHolder);
    root.addEventListener('scroll', () => {
      const { height } = root.getBoundingClientRect();
      console.log('scroll', height > root.scrollHeight - root.scrollTop, height, root.scrollHeight, root.scrollTop);
      if (height >= root.scrollHeight - root.scrollTop) {
        this.triggerEvent('scrollEnd');
      }
    });
  }
  setAttribute(name, val) {
    super.setAttribute(name, val);
    if (name === 'end-text') {
      this.placeHolder.innerText = val;
    }
  }
}