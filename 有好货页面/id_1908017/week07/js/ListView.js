
import { BaseComponent, STATE_SYMBOL, h } from "./component";
import { Text } from './Text';

export class ListView extends BaseComponent {
  constructor() {
    super(...arguments);
    this[STATE_SYMBOL].data = null;
  }
  setAttribute(name, val) {
    if (name === 'data') {
      this[STATE_SYMBOL].data = val;
      return val;
    }
    return super.setAttribute(name, val);
  }
  mounted() {
    const { data } = this[STATE_SYMBOL];
    const children = (data || []).map(item => <Text>{item}</Text>);
    this.appendChildren(children);
  }
}
/**
 * 功能描述
 *  显示data,
 *  使用自定义模板
 *  追加data
 *
 */