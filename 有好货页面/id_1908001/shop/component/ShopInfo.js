import { myCreate } from '../tool/create'
import css from './css/ListView.css'
import Component from './base/Component'
export default class ShopInfo extends Component {
    render () {
        const shop = this.getAttribute('data')
        if (!shop) {
            return <div></div>
        }
        const icon = './static/' + shop.icon
        return <div style={css.shop}>
            <div>
                <img src={icon} style={css.icon} />
                <span style={css.shopName}>
                    <span>{shop.name}</span>
                        <img src='./static/icon-tmall@2x.png' style={css.tmallImg} />
                    </span>
                <button style={css.goToShopButton}>进店  ></button>
            </div>
            <div style={css.shopDesc}>
                <img src='./static/goodShop@2x.png' style={css.goodShopIcon} />
                {shop.desc}</div>
            <div style={css.goods}>
                {
                    shop.goods.map((good, index) => {
                        const img = './static/' + good.img
                        return <div style={index === 0 ? css.goodsFirstDiv : css.goodsSecondDiv}>
                            <img src={img} style={css.goodImg} />
                        </div>
                    })
                }
            </div>
        </div>
    }
}
