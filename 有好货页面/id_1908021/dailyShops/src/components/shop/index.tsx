import BaseComponent from '../Base/BaseComponent';
import { createElement } from '../../babel/babelTransformToJSX';
import Title from '../title/index';

interface config {
  name: string;
  url: string;
  items: string[];
  level: number;
  promotion?: string;
  fans?: number;
  icon?: string
}

const defaultConfig: config = {
  name: '',
  level: 0,
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
    } else if (name === 'renderTips') {
      if (this.root && this.root.getElementsByClassName('hbw-shop-title')) {
        this.root.getElementsByClassName('hbw-shop-title')[0].appendChild(this.createShopTips())
      }
    } else if (name === 'renderFans') {
      if (this.root && this.root.getElementsByClassName('hbw-shop-title')) {
        this.root.getElementsByClassName('hbw-shop-title')[0].appendChild(this.createShopFans())
      }
    } else if (name === 'renderEnterBtn') {
      if (this.root && this.root.getElementsByClassName('hbw-shop-title')) {
        this.root.getElementsByClassName('hbw-shop-title')[0].appendChild(this.createShopBtn())
      }
    }
  }

  mounted(): void {
    if (!this.root) return;
  }

  createShopDom(): any {
    if (!this.root) return;
    const titlePosition = this.PROPERTY.titlePosition === 'in' ? 'in' : 'out';
    const shopTitle = this.createShopTitle();
    const shopItems = this.createShopItems();
    const shopTips = this.createShopTips();

    const childDom = (
      <div class='hbw-shop'>
        {titlePosition === 'out' ? <div class='hbw-shop-title'>
          {shopTitle}
        </div> : ""}
        {shopTips}
        <div class='hbw-shop-items'>
          {shopItems}
        </div>
      </div>
    );
    return childDom;
  }

  createShopTitle(): any {
    const config = this.PROPERTY.config;

    const direction = this.PROPERTY.titleDirection === 'col' ? 'col' : 'row'

    return (<div class={direction === 'col' ? "shop-title_col" : "shop-title_row"}>
      <img src={config.icon} class="shop-title_icon"></img>
      <div class="shop-title_name">
        <Title level={this.PROPERTY.titleLevel ? this.PROPERTY.titleLevel : "4"} class="shop-title_name_text">
          {config.name}
        </Title>
        {
          this.PROPERTY.showTianMaoIcon ? (
            <img
              class="shop-title_name_icon"
              src="../imgs/dailyShops/mipmap-hdpi/icon 天猫标识.png"
            ></img>
          ) : ""
        }
        {
          this.PROPERTY.showPromotion ? (
            <span class="shop-title_promotion">{config.promotion}</span>
          ) : ""
        }

      </div>
      {
        (direction === 'col' && this.PROPERTY.renderFans && this.PROPERTY.fans) ? this.PROPERTY.renderFans(this.PROPERTY.fans) : ''
      }
    </div>
    )
  }

  createShopItems(): any {
    const config = this.PROPERTY.config;

    return (
      <div class={config.items.length > 2 ? "shop_content_flex" : "shop_content_normal"}>
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
    )
  }

  createShopTips(): any {
    if (this.PROPERTY.renderTips)
      if (typeof this.PROPERTY.renderTips === 'function') {
        return this.PROPERTY.renderTips(this.PROPERTY.config.fans)
      }
    return "";
  }

  createShopFans(): any {
    if (this.PROPERTY.renderFans)
      if (typeof this.PROPERTY.renderFans === 'function') {
        return this.PROPERTY.renderFans(this.PROPERTY.config.fans)
      }
    return "";
  }

  createShopBtn(): any {
    if (this.PROPERTY.renderEnterBtn)
      if (typeof this.PROPERTY.renderEnterBtn === 'function') {
        return this.PROPERTY.renderEnterBtn(this.PROPERTY.config.fans)
      }
    return "";
  }
}


export default Shop;
