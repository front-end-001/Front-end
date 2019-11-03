import BaseComponent from '../Base/BaseComponent';
import { createSpanElem, debounce } from '../_utils_/utils';
import { htmlEncode } from '../_utils_/encoderUtils';

export default class ScrollView extends BaseComponent {
  private placeHolder: HTMLDivElement | undefined;

  constructor() {
    super();
    this.created();
  }

  set placeHolderText(text: string) {
    if (this.placeHolder) {
      setTimeout(() => {
        // @ts-ignore
        this.placeHolder.innerText = text;
      }, 200);
      this.PROPERTY.placeHolderText = text;
    }
  }

  get placeHolderText(): string {
    return this.PROPERTY.placeHolderText;
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('scrollView');

    this.placeHolder = document.createElement('div');
    this.placeHolder.classList.add('placeHolder');
    // this.root.appendChild(this.placeHolder);
  }

  appendChild(child: any): any {
    if (!this.root) return;
    this.PROPERTY.children.push(child);
    if (child instanceof BaseComponent) {
      child.appendTo(this.root);
    } else if (typeof child === 'string') {
      this.root.appendChild(createSpanElem(child));
    } else {
      this.root.appendChild(child);
    }

    return child;
  }

  mounted(): void {
    if (!this.root) return;
    const that = this;
    // 注册下拉刷新事件
    // TODO debounce this问题
    // this.root.addEventListener('scroll', debounce(this.scrollToBottomHandler, 200));
    this.root.addEventListener('scroll', event => {
      this.scrollToBottomHandler();
    });
  }

  setAttribute(name: string, value: any): any {
    super.setAttribute(name, value);
    if (name === 'placeHolderText' && this.placeHolder) {
      this.placeHolder.innerText = value;
    }
  }

  scrollToBottomHandler(): void {
    if (this.root && this.placeHolder) {
      // debugger
      this.root.appendChild(this.placeHolder);

      let triggered = false;
      let clientRect = this.root.getBoundingClientRect();
      let placeHolderRect = this.placeHolder.getBoundingClientRect();
      if (clientRect.bottom < placeHolderRect.top) {
        if (!triggered) {
          this.triggerEvent('scrollToBottom');
          triggered = true;
        }
      } else {
        this.placeHolderText = this.ATTRIBUTE.placeHolderText;
      }
    }
  }
}
