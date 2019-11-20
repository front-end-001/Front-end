import "./bigShop.css";
import baseClass from "../../baseClass";
import { create } from "../../create";

class BigShop extends baseClass {
  constructor() {
    super();
    this.created();
  }

  created() {
    this.root = document.createElement("div");
    this.render().appendTo(this.root);
  }

  render() {
    return (
      <div className="bigShopItem">
        <div className="bigShopItem_top">
          <div className="bigShopItem_des">
            <div className="bigShopItem_logo"></div>
            <div>
              <div className="bigShopItem_title">极客时间旗舰店</div>
              <div className="bigShopItem_subTitle">天猫</div>
            </div>
          </div>
          <div className="bigShopItem_goShop">进店</div>
        </div>
        <div className="bigShopItem_tip">
          好店君：该店已被1.3万人关注，快来关注吧！
        </div>
        <div className="bigShopItem_img">
          <div className="bigShopItem_img_left"></div>
          <div className="bigShopItem_img_right">
            <div className="bigShopItem_img_right_top"></div>
            <div className="bigShopItem_img_right_bottom"></div>
          </div>
        </div>
        <div className="similar">相似好店</div>
      </div>
    );
  }
}

export default BigShop;
