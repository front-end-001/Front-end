import "./smallShop.css";
import baseClass from "../../baseClass";
import { create } from "../../create";

class SmallShop extends baseClass {
  constructor() {
    super();
    this.created();
  }

  created() {
    this.root = document.createElement("div");
    this.root.classList.add("smallShopItem");
    this.render().appendTo(this.root);
  }

  render() {
    return (
      <div className="smallShop_content">
        <div className="smallShopItem_top">
          <div className="smallShopItem_logo"></div>
          <div>
            <div className="smallShopItem_title">极客时间旗舰店</div>
            <div className="smallShopItem_subTitle">天猫</div>
          </div>
        </div>
        <div className="smallShopItem_img">
          <div className="smallShopItem_img_left"></div>
          <div className="smallShopItem_img_right"></div>
        </div>
      </div>
    );
  }
}

export default SmallShop;
