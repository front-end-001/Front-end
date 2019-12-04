import "./text.css";
import baseClass from "../../baseClass";

class Text extends baseClass {
  constructor(config) {
    super();
    this.text = config || "";
    this.created();
  }
  created() {
    this.root = document.createElement("span");
    this.root.innerText = this.text;
  }
}

export default Text;
