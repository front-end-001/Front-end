import MyCreate, { Component } from "MyCreate";
import cx from "classnames";
import "./TabList.css";

const list = ["推荐", "有趣的店", "品牌新店"];

export default class TabList extends Component {
  render() {
    const tabIndex = this.getProperty("tabIndex");

    return (
      <div className="TabList">
        {list.map((item, index) => {
          return (
            <span
              className={cx("TabList-item", {
                "is-active": tabIndex === index
              })}
            >
              {item}
            </span>
          );
        })}
      </div>
    );
  }
}
