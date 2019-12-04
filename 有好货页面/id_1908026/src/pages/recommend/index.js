import { h, Component } from '../../base';

import { Scroll, Carousel } from '../../components';
import RecommendList from './recommend-list';

import datalist from '../../data/recommend';

import './index.scss';

export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
  }

  mounted() {
    console.log('Recommend mounted');
  }

  render() {
    const carouselData = datalist.shift();
    console.log(carouselData);
    let data = [1, 2];
    const dep = [];
    data = new Proxy(data, {
      get(target, p, receiver) {
        console.log('get', p);
        return target[p];
      },
      set(target, p, value, receiver) {
        console.log('set', p);

        target[p] = value;
        return true;
      },
    });

    function loadMore(q) {
      const p = new Promise(resolve => {
        setTimeout(() => {
          resolve([q]);
        }, 500);
      });
      p.then(r => {
        console.log(r);
        data.push(...r);
        console.log(666, data);
      });
    }
    return (
      <Scroll title="推荐">
        <div className="carousel_wrapper">
          <Carousel data={carouselData.bannerFeeds} />
        </div>
        <RecommendList data={datalist} />
      </Scroll>
    );
  }

  handleChange(index) {
    console.log(index);
  }
}
