import MyCreate, {
  Component,
  Fragment,
  ATTRIBUTE_SYMBOL,
  PROPERTY_SYMBOL
} from "MyCreate";
import TabList from "./TabList";
import Swiper from "./Swiper";

import "./TabContainer.css";

export default class TabContainer extends Component {
  constructor(attr) {
    super({ ...attr, props: { state: { tabIndex: 0 } } });
  }

  render() {
    const {tabIndex} = this.getProperty("state");
    return (
      <div className="TabContainer">
        <TabList props={{tabIndex}} />
        <Swiper />
      </div>
    );
  }
}
