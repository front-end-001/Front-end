import BaseComponent from '../Base/BaseComponent';
import { createElement } from '../../babel/babelTransformToJSX';
import Title from '../title/index';

interface config {
  name: string;
  promotion?: string;
  fans?: number;
  level?: number;
  url: string;
  items: string[];
}

const defaultConfig: config = {
  name: '',
  promotion: '',
  fans: 0,
  level: 5,
  url: '',
  items: []
};

class Shop extends BaseComponent {
  constructor() {
    super();
    this.created();
  }

  created(): void {
    this.root = document.createElement('div');
    // this.setAttribute('config', defaultConfig);
  }

  setAttribute(name: string, value: any): any {
    super.setAttribute(name, value);
    if (name === 'config' && this.root) {
      const shopDom = this.createShopDom();
      this.PROPERTY.children.push(shopDom);
      this.root.appendChild(shopDom);
    }
  }

  mounted(): void {
    if (!this.root) return;
  }

  createShopDom(): any {
    if (!this.root) return;
    const config = this.PROPERTY.config;
    console.log('1111', this.PROPERTY.config)
    const childDom = (
      <div class='hbw-shop'>
        <div class="shop-title">
          <img src={config.icon} class="shop-title_icon"></img>
          <div class="shop-title_name">
            <Title level={config.level} class="shop-title_name_text">
              {config.name}
            </Title>
            <img
              class="shop-title_name_icon"
              src="../imgs/dailyShops/mipmap-hdpi/icon 天猫标识.png"
            ></img>
          </div>
          {
            this.PROPERTY.isRecommend ?
              <a href={config.url}>
                <div class="shop-title_btn">
                  <span class='shop-title_btn_text'>进店</span>
                </div>
              </a>
              : ""
          }
        </div>
        {
          this.PROPERTY.isRecommend ? <div class="shop_fans">
            <img src='../imgs/dailyShops/mipmap-hdpi/icon 好店君.png' ></img>
            <span>好店君：该店已被{this.fansTrans(config.fans)}人关注，快来关注吧！</span>
          </div> : ""
        }
        <div class={this.PROPERTY.isRecommend ? "shop_content_flex" : "shop_content_normal"}>
          <div class="shop_content_col1">
            <a href={config.items[0] ? config.items[0].url : ''}>
              <img src={config.items[0] ? config.items[0].image : ''}></img>
            </a>
          </div>

          <div class="shop_content_col2">
            {
              config.items.map((val, index: number) => {
                if (index > 0) {
                  return (<div>
                    <img src={val.image}></img>
                  </div>)
                }
              })
            }
          </div>
        </div>
      </div>
    );
    return childDom;
  }

  fansTrans(fans: number): string {
    if (fans < 10000) {
      return fans.toString()
    }

    return `${(fans / 10000).toFixed(1)}万`
  }

}


export default Shop;
