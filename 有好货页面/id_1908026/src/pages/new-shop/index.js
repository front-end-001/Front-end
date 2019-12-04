import { h, Component } from '../../base';

import { SwitchButton, Scroll } from '../../components';
import datalist from '../../data/newshop';

import './index.scss';

export default class NewShop extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
  }

  mounted() {
    console.log('NewShop mounted');
  }

  render() {
    return (
      <Scroll>
        <div className="new-shop">
          {datalist.map(data => {
            return (
              <div className="new-shop_item">
                <img
                  className="bc1"
                  src={
                    data.brandInfo
                      ? data.brandInfo.pic_url
                      : 'http://gw.alicdn.com/tfs/TB1fOKQIhYaK1RjSZFnXXa80pXa-702-550.png'
                  }
                  alt=""
                />
                <img
                  className="bc2"
                  src="http://gw.alicdn.com/tfs/TB1LOvUI3HqK1RjSZFkXXX.WFXa-702-550.png_790x10000.jpg_.webp"
                  alt=""
                />
                <div className="shop_item_title">
                  <img src={data.shopLogo} alt="加载失败" />

                  {data.brandInfo ? (
                    <div className="shop_item_title_desc">
                      <img
                        src="http://gw.alicdn.com/tfs/TB1qzinCFzqK1RjSZSgXXcpAVXa-34-44.png_110x10000.jpg_.webp"
                        style="width: 12px;height: 11px;"
                        alt=""
                      />
                      <span style="font-size: 11px;color: rgb(243, 209, 177);margin:0 4px 0 3px; overflow: hidden;">
                        品牌宣言
                      </span>
                      <span>{data.brandInfo.description}</span>
                    </div>
                  ) : (
                    <div className="shop_item_title_desc">
                      <img
                        src="http://gw.alicdn.com/tfs/TB1LjJHISzqK1RjSZPcXXbTepXa-48-44.png_110x10000.jpg_.webp"
                        style="width: 12px;height: 11px;"
                        alt=""
                      />
                      <span style="font-size: 11px;margin:0 4px 0 3px; overflow: hidden;">
                        该店已被{data.fansCount}人关注啦
                      </span>
                    </div>
                  )}
                </div>

                <div className="shop_item_desc">
                  <div className="shop_item_desc_left">
                    <div className="shop_item_desc_left_name">{data.shopName}</div>
                    <div className="shop_item_desc_left_tags">
                      {data.brandInfo ? (
                        <div style="display: flex;align-items: center">
                          <img
                            src={data.brandInfo.national_flag}
                            alt=""
                            style="width:11px;height:11px;margin-right: 2px"
                          />
                          <span>{data.brandInfo.location}</span>
                        </div>
                      ) : (
                        data.tags[0].name + ' · ' + data.tags[1].name
                      )}
                    </div>
                  </div>
                  <div className="shop_item_desc_right">
                    进店
                    <img
                      src="http://gw.alicdn.com/tfs/TB1GnbACrrpK1RjSZTEXXcWAVXa-24-54.png_110x10000.jpg_.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div className="shop_item_content">
                  {data.shopItemVOs.map(child => {
                    return (
                      <div className="shop_item_content_item">
                        <img src={child.itemPic} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Scroll>
    );
  }

  handleChange(index) {
    console.log(index);
  }
}
