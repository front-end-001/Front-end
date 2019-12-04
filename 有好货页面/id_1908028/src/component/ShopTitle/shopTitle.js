import "./shopTitle.css";
import baseClass from "../../baseClass";
import { create } from "../../create";

class ShopTitle extends baseClass {
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
      <div style="height:100%">
        <div className="shopTitle_logo"></div>
      </div>
    );
  }
}

export default ShopTitle;
