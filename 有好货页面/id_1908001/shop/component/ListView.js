import { myCreate } from '../tool/create'
import css from './css/ListView.css'
import Component from './Component'
import ShopInfo from './ShopInfo'
export default class ListView extends Component {
    constructor() {
        super()
    }
    render () {
        const data = this.getAttribute('data') || []
        const topTwoData = data.slice(0, 2)
        return <div>
            {
                topTwoData.map(shop => {
                    const icon = './static/' + shop.icon
                    return <div style={css.shopInfo}>
                            <img src={icon} style={css.icon} />
                            <span style={css.shopName}>
                                <span>{shop.name}</span>
                                <img src='./static/icon-tmall@2x.png' style={css.tmallImg} />
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
                data.slice(2, 5).map(shop => {
                    return <ShopInfo data={shop} />
                })
            }
        </div>
    }
    setAttribute (name, value) {
        super.setAttribute(name, value)
        if (name === 'data') {
            this.container.innerHTML = ''
            this.render().appendTo(this.container)
        }
    }
}
