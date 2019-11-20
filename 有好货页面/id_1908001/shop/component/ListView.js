import { myCreate } from '../tool/create'
import css from './css/ListView.css'
import Component from './base/Component'
import ShopInfo from './ShopInfo'
export default class ListView extends Component {
    render () {
        const data = this.getAttribute('data') || []
        const topShops = data.topShops || []
        const shops = data.shops || []
        return <div>
            {
                topShops.map(shop => {
                    const icon = './static/' + shop.icon
                    return <div style={css.shopInfo}>
                            <img src={icon} style={css.topIcon} />
                            <span style={css.topShopName}>
                                <span>{shop.name}</span>
                                <img src='./static/icon-tmall@2x.png' style={css.topTmallImg} />
                            </span>
                            {
                                shop.goods.slice(0, 2).map((good, index) => {
                                    return <div style={css.topGoodInfo}>
                                        <img src={'./static/' + good.img} style={css.topGoodImg} />
                                    </div>
                                })
                            }
                        </div>
                })
            }
            {
                shops.map(shop => {
                    return <ShopInfo data={shop} />
                })
            }
        </div>
    }
}
