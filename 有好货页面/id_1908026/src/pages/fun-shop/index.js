import { h, Component } from '../../base';

import { SwitchButton, Scroll } from '../../components';
import datalist from '../../data/funshop';

import './index.scss';

const STATE_SYMBOL = Symbol('state');

export default class FunShop extends Component {
  constructor(props) {
    super(props);

    this[STATE_SYMBOL] = Object.create(null);

    this[STATE_SYMBOL].position = 0;
    this[STATE_SYMBOL].loading = false;
  }

  mounted() {
    console.log('FunShop mounted');
  }

  render() {
    const buttonData = [
      {
        title: '全部',
      },
      {
        title: '小惊喜',
      },
      {
        title: '想不到',
      },
    ];
    return (
      <Scroll>
        <div className="fun-shop">
          <div className="fun-shop_header">
            <span>新奇好店都在这</span>
            <SwitchButton data={buttonData} onClick={this.handleChange.bind(this)} />
          </div>

          <div className="fun-shop_list">
            {datalist.map((data, index) => {
              return (
                <div className="fun-shop_item">
                  {[data.shopList.shift()].map(child => {
                    const wh = child.shopLevelImg
                      .slice(0, -4)
                      .split('-')
                      .slice(1);
                    return (
                      <div className="large-shop">
                        <img src={child.shopItemVOs[0].itemPic} alt="加载失败" />
                        <div className="shop_inner">
                          <div className="shop_desc">
                            <div className="shop_desc_left">
                              <img
                                className="_desc_level"
                                src={child.shopLevelImg}
                                alt=""
                                style={`width: ${wh[0] / 2}px;height:${wh[1] / 2}px`}
                              />
                              <div className="shop_desc_name">{child.shopName}</div>
                            </div>
                            <div className="shop_desc_right">
                              <img
                                src="http://gw.alicdn.com/tfs/TB1S784OwTqK1RjSZPhXXXfOFXa-196-88.png_110x10000.jpg_.webp"
                                alt="加载失败"
                              />
                              <span>进店</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="other-shops">
                    {data.shopList.map((child, innerIndex) => {
                      const wh = child.shopLevelImg
                        .slice(0, -4)
                        .split('-')
                        .slice(1);
                      return (
                        <div className="small-shop">
                          <img src={child.shopItemVOs[0].itemPic} alt="加载失败" />
                          <div className="shop_inner">
                            <div className="shop_desc">
                              <div className="shop_desc_left">
                                <img
                                  className="_desc_level"
                                  src={child.shopLevelImg}
                                  alt=""
                                  style={`width: ${wh[0] / 2}px;height:${wh[1] / 2}px`}
                                />
                                <div className="shop_desc_name">{child.shopName}</div>
                              </div>
                              <img
                                src="http://gw.alicdn.com/tfs/TB1vtOgOCzqK1RjSZFpXXakSXXa-16-32.png_110x10000.jpg_.webp"
                                alt="加载失败"
                                style="width:5px;height:10px"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Scroll>
    );
  }

  handleChange(index) {
    console.log(index);
  }
}
