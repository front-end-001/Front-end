/**
 * src: 图像路径
 * fit: fill/contain/cover/none/scale-down, 默认 contain
 * alt: 同原生
 * lazy: 是否开启懒加载, 默认 false
 */

import Component, {
  PROP_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import './index.scss';

let lazyImageObserver;

if (typeof window !== 'undefined' && window.IntersectionObserver) {
  lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // @ts-ignore
        entry.target.$_model.loadImage();
      }
    });
  });
}

export default class ImageEle extends Component {
  constructor(attrs) {
    super(attrs);
    // 设置初始化状态
    this[STATUS_SYMBOL].status = 'unload';

    // 设置默认属性
    this[PROP_SYMBOL].lazy = true;
    this[PROP_SYMBOL].alt = '';
    this[PROP_SYMBOL].fit = 'cover';
  }

  render() {
    const { lazy } = this[PROP_SYMBOL];
    this[STATUS_SYMBOL].status = 'unload';

    const ele = (
      <div class="c-image">
        <div class="c-image__loading">加载中</div>
      </div>
    );
    // 开启懒加载
    if (lazyImageObserver && lazy) {
      ele.$el.$_model = this;
      lazyImageObserver.observe(ele.$el);
    } else {
      this.loadImage();
    }
    
    return ele;
  }

  loadImage() {
    if (this[STATUS_SYMBOL].status !== 'unload') return;

    const { src, fit, alt } = this[PROP_SYMBOL];
    const onErrorFuc = e => {
      const errorEle = <div class="c-image__error">加载失败</div>;
      this.$el.innerHTML = '';
      image = null;
      this.$el.appendChild(errorEle.$el);
      this[STATUS_SYMBOL].status = 'error';
    };

    const onLoadFuc = e => {
      this.$el.innerHTML = '';
      this.$el.appendChild(image);
      this[STATUS_SYMBOL].status = 'load';
    };

    let image = new Image();
    image.onload = onLoadFuc;
    image.onerror = onErrorFuc;
    image.classList.add('c-image__inner');
    image.src = src;
    image.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
    if (alt) {
      image.setAttribute('alt', alt);
    }
    if (fit) {
      let innerStyle = '';
      innerStyle += `object-fit: ${fit};`;
      image.setAttribute('style', innerStyle);
    }
    this[STATUS_SYMBOL].status = 'loading';
    // 解除监听
    lazyImageObserver.unobserve(this.$el);
  }

  mounted() {}
}
