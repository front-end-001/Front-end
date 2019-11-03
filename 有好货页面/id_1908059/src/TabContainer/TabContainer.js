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
  render() {
    return (
      <div className="TabContainer">
        <Swiper />
      </div>
    );
  }
}
