import BaseComponent from '../Base/BaseComponent';
import { createElement } from '../../babel/babelTransformToJSX';
import { Title } from '../index';
import { spawn } from 'child_process';

class ListView extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.root.classList.add('listView');
    this.setAttribute('data', []);
  }

  appendChild(child: any): any {
    if (!this.root) return;
    this.PROPERTY.children.push(child);
    if (child instanceof BaseComponent) {
      child.appendTo(this.root);
    } else if (typeof child === 'string') {
      this.root.appendChild(document.createTextNode(child));
    } else {
      this.root.appendChild(child);
    }

    return child;
  }

  mounted(): void {
    if (!this.root) return;
  }

  setAttribute(name: string, value: any): any {
    super.setAttribute(name, value);
    if (name === 'data' || name === 'renderItem') {
      const that = this;
      if (this.root) {
        const childs = this.root.childNodes;
        for (let i = childs.length - 1; i >= 0; i--) {
          this.root.removeChild(childs[i])
        }

      }
      for (let data of this.PROPERTY.data) {
        let child = this.generateChildItem(data);
        if (child) {
          this.appendChild(child);
        }
      }
    }
  }

  generateChildItem(data: any) {
    if (this.ATTRIBUTE.renderItem) {
      return this.ATTRIBUTE.renderItem(data)
    }
    debugger
    let childRoot = (
      <div class='list-item'>

        <div class='list-item_title'>
          <img src={data.icon} class='list-item_title_image' ></img>
          <Title level="4" class='list-item_title_content'>{data.title}</Title>
        </div>


        <div class='list-item_content'>{data.content}</div>
      </div>
    );
    return childRoot;
  }
}

export default ListView;
