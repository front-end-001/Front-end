import MyCreate, { Component } from "MyCreate";
import cx from "classnames";
import EventBus from "eventbusjs";
import "./TabList.common.css";

export const list = ["推荐", "有趣的店", "品牌新店"];

export default class TabList extends Component {
  constructor(props) {
    super(props);
    this.tabIndex = 0;
  }

  handleTabChange = (_, { index }) => {
    const tabs = document.getElementsByClassName("TabList-item");
    tabs[this.tabIndex].classList.remove("is-active");
    this.tabIndex = index;
    tabs[this.tabIndex].classList.add("is-active");
  };

  componentDidMount() {
    EventBus.addEventListener("swiperChange", this.handleTabChange);
  }

  render() {
    return (
      <div className="TabList">
        {list.map((item, index) => {
          return (
            <span
              className={cx("TabList-item", {
                "is-active": index === (this.tabIndex || 0)
              })}
              onClick={e => {
                EventBus.dispatch("tabChange", e.target, { index });
                this.handleTabChange(null, { index });
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    );
  }
}
