import { h, Component } from '../../base';
import { throttle } from '../../utils';

import './index.scss';

const STATE_SYMBOL = Symbol('state');

export default class SwitchButton extends Component {
  constructor(props) {
    super(props);

    this[STATE_SYMBOL] = Object.create(null);

    this[STATE_SYMBOL].loading = false;

    this[STATE_SYMBOL].position = 2;
  }

  mounted() {
    this.img = Array.from(this._childNode[0].children)[0];
    this.changeActive();
  }

  render() {
    const data = this.props.data || [];
    const style = `width: ${data.length * 56.67}px`;
    return (
      <div className="switch-button" style={style} onClick={this.buttonClick.bind(this)}>
        <img
          src="http://gw.alicdn.com/tfs/TB1PqAvCwHqK1RjSZFkXXX.WFXa-120-42.png_140x10000.jpg_.webp"
          alt=""
        />
        {data.map((child, index) => {
          return (
            <span className="switch-button_item" data-index={index}>
              {child.title}
            </span>
          );
        })}
      </div>
    );
  }

  buttonClick(e) {
    const index = Number(e.target.dataset.index);
    if (this[STATE_SYMBOL].position === index || isNaN(index)) return;
    this[STATE_SYMBOL].position = index;
    this.changeActive();

    this.dispatchEvent('click', index);
  }

  changeActive() {
    this.img.style.left = this[STATE_SYMBOL].position * 56.67 - 1 + 'px';
    Array.from(this._childNode[0].children).forEach((child, index) => {
      if (Number(child.dataset.index) === this[STATE_SYMBOL].position) {
        child.classList.add('switch-button_item--active');
      } else {
        child.classList.remove('switch-button_item--active');
      }
    });
  }
}
