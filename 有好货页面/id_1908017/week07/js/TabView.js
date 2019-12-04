import { BaseComponent, ATTR_SYMBOL, STATE_SYMBOL } from "./component";
import { enableGesture } from "./gesture.v2";

export class TabView extends BaseComponent {
  created() {
    this[STATE_SYMBOL].pos = null;
    this.root = document.createElement('div');
    //   <nav>
    //     <a href="#" class="active">推荐</a>
    //     <a href="#">有趣的店</a>
    //     <a href="#">品牌新店</a>
    //     <a href="#">发现</a>
    //   </nav>

    this.headers = document.createElement('nav');
    this.root.appendChild(this.headers);
    this.contents = document.createElement('div');
    this.contents.classList.add('content');
    this.contents.classList.add('bg01');
    this.root.appendChild(this.contents);
  }
  appendChild(child) {
    const header = document.createElement('a');
    header.innerText = child[ATTR_SYMBOL]['tab-title'];
    this.headers.appendChild(header);
    child.mount(this.contents);
  }
  mounted() {
    const { headers } = this;
    for (let i = 0; i < headers.children.length; i++) {
      headers.children[i].addEventListener('click', () => {
        this.setState_pos(i);
      });
    }
    this.setState_pos(0);
    //支持手势
    enableGesture(this.root);
    /**
     * 手势需求
     * 瞬滑 切屏
     * *慢滑 随手指移动
     */
    this.root.addEventListener('panend', e => {
      if (e.isFlick&&Math.abs(e.dx) >= Math.abs(e.dy)) {

      // console.log('end TabView',e,e===window.cc);
        const to = this[STATE_SYMBOL].pos + (e.dx < 0 ? 1 : -1);
        this.setState_pos(to);
      }
    })
    // this.root.addEventListener('pan', () => {
    //   console.log('tabView pan');
    // })
    // this.root.addEventListener('panend', () => {
    //   console.log('tabView panend');
    // })
    // this.root.addEventListener('pancancel', () => {
    //   console.log('tabView pancancel');
    // })
  }
  setState_pos(pos) {
    if (pos < 0 || pos > this.contents.children.length - 1) return;
    const lastPos = this[STATE_SYMBOL].pos;
    if (!Number.isInteger(lastPos)) {
      for (let h of this.headers.children) {
        h.classList.remove('active');
      }
      for (let content of this.contents.children) {
        content.style.display = 'none';
      }
    } else {
      this.headers.children[lastPos].classList.remove('active');
      this.contents.children[lastPos].style.display = 'none';
    }
    this.headers.children[pos].classList.add('active');
    this.contents.children[pos].style.display = '';
    this[STATE_SYMBOL].pos = pos;
  }
}
/**
 * 需求整理：
 * 显示tab头 0
 * 点击tab头显示对应内容 0
 * 切换tab 时有动画 1
 * 支持手势切换 1
 */


/**
 * ?
 *   支持rel: 来标记jsx中组件
 *
 */