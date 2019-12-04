import { h, Component } from '../../../base';

import './index.scss';

export default class RecommendList extends Component {
  constructor(props) {
    super(props);
  }

  async mounted() {
    console.log('RecommendList mounted');
    // this.data = await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve([3]);
    //   }, 7000);
    // });
    // const p = new Proxy(this.props.data, {
    //   set(target, p, value, receiver) {
    //     console.log('data更新');
    //   },
    // });
    // this.props.data.push(4);
    // setTimeout(() => {
    //   console.log(this.props.data);
    // }, 8000);
    // console.log(this.data);
    // this.rerender()
  }

  render() {
    let data = this.props.data || [1];
    data = data.filter(c => {
      if (c.showType === 'shop') {
        return true;
      }
      return false;
    });
    return (
      <div className="recommend-list">
        {data.map(child => {
          return (
            <div className="recommend-item">
              <div className="recommend_header">
                <div className="recommend_header_left">
                  <img className="avatar" src={child.shopLogo} alt="加载失败" />
                </div>
                <div className="recommend_header_middle">
                  <div className="title">{child.shopName}</div>
                  <div className="star">
                    <img src={child.shopLevelImg} alt="star" />
                  </div>
                </div>
                <div className="recommend_header_right">进店</div>
              </div>
              <div className="recommend_content">
                <div className="recommend_content_desc">
                  {child.shopRecommendReason.type === 'FANS' ? (
                    <img src={child.shopRecommendReason.icon} alt="desc" />
                  ) : (
                    <div className="daren">
                      <img src={child.shopRecommendReason.icon} alt="desc" />
                      <img
                        className="daren-logo"
                        src="http://gw.alicdn.com/tfs/TB1EwtbCBLoK1RjSZFuXXXn0XXa-42-42.png_110x10000.jpg_.webp"
                        alt=""
                      />
                    </div>
                  )}

                  <span className="reason">{child.shopRecommendReason.text}</span>
                </div>
                <div className="recommend_content_product">
                  {[child.shopItemVOs.shift()].map(c => {
                    return (
                      <div className="product_left">
                        <img src={c.itemPic} alt="加载失败" />
                        <div className="product_left_inner" />
                      </div>
                    );
                  })}

                  <div className="product_right">
                    {child.shopItemVOs.map((c, index) => {
                      return (
                        <div className={index === 0 ? 'product_right_top' : 'product_right_bottom'}>
                          <img src={c.itemPic} alt="加载失败" />
                          <div className="product_right_inner" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="recommend_footer">相似好店></div>
            </div>
          );
        })}
      </div>
    );
  }
}
