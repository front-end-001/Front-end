export function h(component) {
  const instance = new component;
  return instance;
}
export class BaseComponent {
  constructor() {
    this.created();
  }
  created() {
    this.root = document.createElement('div');
  }
  mount(el) {
    el.append(this.root);
    this.mounted();
  }
  mounted() {

  }
}