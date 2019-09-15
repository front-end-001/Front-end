export const emptyObject = () => Object.create(null);

/**
 * BaseComponent
 *
 * @class BaseComponent
 */
export default class BaseComponent {
  // should define interface
  protected PROPERTY = emptyObject();
  protected ATTRIBUTE = emptyObject();
  protected EVENTS = emptyObject();
  protected STATE = emptyObject();
  protected root: HTMLDivElement | null = null;

  constructor() {
    this.PROPERTY.children = [];
  }

  created(): void {}

  destroy(): void {
    this.unmounted();
    this.ATTRIBUTE._container.removeChild(this.root);
    this.root = null;
  }

  appendTo(element: HTMLDivElement): void {
    this.ATTRIBUTE._container = element;
    if (this.root) {
      element.appendChild(this.root);
      this.mounted();
    }
  }

  appendChild(child: any): any {
    return child;
  }

  mounted(): void {}

  unmounted(): void {
    Object.getOwnPropertyNames(this.EVENTS).forEach(name => {
      this.EVENTS[name].clear();
    });

    this.ATTRIBUTE = null;
    this.PROPERTY = null;
    this.STATE = null;
    this.EVENTS = null;
  }

  update() {}

  get children() {
    return this.PROPERTY.children;
  }

  getAttribute(name: string): any {
    if (name === 'style' && this.root) {
      return this.root.getAttribute('style');
    }
    return this.ATTRIBUTE[name];
  }

  setAttribute(name: string, value: any): any {
    if (name === 'className' && this.root) {
      // this.root.setAttribute('class', value);
      this.root.className = value;
    }

    return (this.ATTRIBUTE[name] = value);
  }

  addEventListener(type: string, listener: Function) {
    if (!this.EVENTS[type]) this.EVENTS[type] = new Set();
    this.EVENTS[type].add(listener);
  }

  removeEventListener(type: string, listener: Function): void {
    if (!this.EVENTS[type]) {
      return;
    }

    this.EVENTS[type].delete(listener);
  }

  triggerEvent(type: string): void {
    if (!this.EVENTS[type]) return;
    for (let event of this.EVENTS[type]) event.call(this);
  }

  isValid(child: any): boolean {
    return true;
  }
}
