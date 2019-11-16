import "./recommend.css";
import baseClass from "../../baseClass";
import SmallShop from "../SmallShop";
import BigShop from "../BigShop";
import { create } from "../../create";

class Recommend extends baseClass {
  constructor() {
    super();
    this.created();
  }

  created() {
    this.root = document.createElement("div");
    this.root.style.height = "100%";
    this.render().appendTo(this.root);
  }

  render() {
    return (
      <div className="recommend">
        <div className="recommend_title">超多人收藏的店！</div>
        <div className="small">
          <SmallShop className="small_left" />
          <SmallShop />
        </div>
        <div>
          <BigShop className="big" />
          <BigShop className="big" />
          <BigShop className="big" />
        </div>
      </div>
    );
  }
}

export default Recommend;
