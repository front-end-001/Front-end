import { h, Component } from '../../base';

import { Scroll } from '../../components';
import datalist from '../../data/newshop';

import './index.scss';

export default class Find extends Component {
  constructor(props) {
    super(props);
  }

  mounted() {
    console.log('Find mounted');
  }

  render() {
    return <Scroll title="推荐">发现页面</Scroll>;
  }
}
