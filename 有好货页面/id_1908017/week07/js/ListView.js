
import { BaseComponent, STATE_SYMBOL, h, PROP_SYMBOL } from "./component";
import { Text } from './Text';

export class ListView extends BaseComponent {
  constructor() {
    super(...arguments);
    this[STATE_SYMBOL].data = null;
    this[PROP_SYMBOL].template = item => <Text>{item}</Text>;
  }
  setAttribute(name, val) {
    if (name === 'data') {
      this[STATE_SYMBOL][name] = val;
      return val;
    }
    if (name === 'template') {
      this[PROP_SYMBOL][name] = val;
      return val;
    }
    return super.setAttribute(name, val);
  }
  mounted() {
    const { data } = this[STATE_SYMBOL];
    const { template } = this[PROP_SYMBOL];
    const children = (data || []).map(template);
    this.appendChildren(children);
  }
  updateData(data) {
    const { data: oldData } = this[STATE_SYMBOL];
    const { template } = this[PROP_SYMBOL];
    /* 此处只实现了简单追加 */
    this[STATE_SYMBOL].data = data;
    this.appendChildren(data.slice(oldData.length).map(template));
  }
}
/**
 * 功能描述
 *  显示data,
 *  使用自定义模板
 *  追加data
 *
 */

/**
 * ??
 * 区分 state ，prop,attr
 */