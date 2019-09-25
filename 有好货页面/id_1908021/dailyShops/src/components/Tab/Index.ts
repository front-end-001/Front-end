import BaseComponent from '../Base/BaseComponent';
import TabPane from './TabPane';
import TabHeader from './TabHeader';
import { createSpanElem } from '../_utils_/utils';

class Tab extends BaseComponent {
  static TabPane = TabPane;

  private tabPanes: TabPane[] = [];
  private header: TabHeader = new TabHeader();
  private contentContainer: HTMLDivElement | null = null;

  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('tab-panes-container');
    // this.root.setAttribute('id', `hbw-Tab${Date.now()}`);
    this.header.appendTo(this.root);
    this.root.appendChild(this.contentContainer);
    this.STATE.activeIndex = 0;
  }

  appendChild(child: TabPane): TabPane {
    this.addTabHeader(child.getAttribute('title'));

    this.tabPanes.push(child);
    if (this.contentContainer) {
      if (this.PROPERTY.children.length === 0) {
        child.setAttribute('className', 'tab-pane tab-pane-active');
        child.appendTo(this.contentContainer);
      }
      this.PROPERTY.children.push(child);
    }
    return child;
  }

  addTabHeader(title: string | undefined): void {
    const headText = title ? title : '';
    const headChild = createSpanElem(headText);
    headChild.classList.add('tab-header-item');
    this.header.appendChild(headChild);
    headChild.addEventListener('click', event => {
      this.STATE.activeIndex = this.header.active = this.header.children.indexOf(headChild);
      this.triggerEvent('activeIndexChange');
    });
  }

  activeIndexChange() {
    if (!this.contentContainer) return;
    // 删除所有子节点
    this.contentContainer.childNodes.forEach(child => {
      // @ts-ignore
      this.contentContainer.removeChild(child);
    });
    // 添加激活节点
    const children = this.PROPERTY.children as TabPane[];
    this.PROPERTY.children.forEach((child: TabPane, index: number) => {
      if (index === this.STATE.activeIndex && this.contentContainer) {
        child.appendTo(this.contentContainer);
        child.setAttribute('className', 'tab-pane tab-pane-active');
      }
    });
  }

  mounted(): void {
    this.addEventListener('activeIndexChange', this.activeIndexChange);
  }

  destroy() {
    this.tabPanes.forEach(tabpane => {
      tabpane.destroy();
    });

    this.header.destroy();
    super.destroy();
  }

  isValid(): boolean {
    const children = this.PROPERTY.children as TabPane[];
    if (children.length > 0) return true;
    return false;
  }
}

export default Tab;
