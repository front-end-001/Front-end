import MyCreate from "./MyCreate";
import Component, {ATTRIBUTE_SYMBOL, PROPERTY_SYMBOL} from './Component'

export default class Fragment extends Component {
  created() {
    this.root = document.createDocumentFragment()
    this.root = this.render();
  }

  render() {
    const {children} = this[ATTRIBUTE_SYMBOL]
    for(let child of children) {
      this.root.appendChild(child.root)
    }
    return this.root
  }
}
