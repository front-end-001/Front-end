import "./NewBrand.css";
import baseClass from "../../baseClass";
import { create } from "../../create";

class NewBrand extends baseClass {
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
      <div className="newBrandItem">
        <div className="newBrandItem_top">
          <div className="newBrandItem_logo"></div>
          <div className="newBrandItem_follow">该店已被3.9万人关注啦</div>
        </div>
        <div className="newBrandItem_bottom">
          <div className="newBrandItem_des">
            <div className="newBrandItem_des_left">
              <div className="newBrandItem_title">极客时间旗舰店</div>
              <div className="newBrandItem_subTitle">科技风 行业优质</div>
            </div>
            <div className="newBrandItem_des_right">
              <div className="goShop">
                进店
              </div>
            </div>
          </div>
          <div className="newBrandItem_img">
            <div className="newBrandItem_img_left"></div>
            <div className="newBrandItem_img_right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBrand;
