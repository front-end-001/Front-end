import BaseComponent from '../Base/BaseComponent';
import TabPane from './TabPane';
import TabHeader from './TabHeader';

class Tab extends BaseComponent {
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
    this.STATE.h = 0;
  }

  appendChild(child: TabPane): TabPane {
    const headText = child.getAttribute('title') ? child.getAttribute('title') : '';
    const headChild = document.createElement('span');
    headChild.innerText = headText;
    headChild.classList.add('tab-header-item');
    this.header.appendChild(headChild);

    this.tabPanes.push(child);
    if (this.contentContainer) {
      // Bad
      if (this.PROPERTY.children.length === 0) {
        child.setAttribute('className', 'tab-pane-enabled');
      }
      child.appendTo(this.contentContainer);
      this.PROPERTY.children.push(child);
    }
    return child;
  }

  isValid(): boolean {
    const children = this.PROPERTY.children as TabPane[];
    if (children.length > 0) return true;
    return false;
  }
}

export default Tab;
