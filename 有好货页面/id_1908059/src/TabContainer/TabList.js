import MyCreate, { Component } from "MyCreate";
import cx from "classnames";
import "./TabList.css";

export const list = ["推荐", "有趣的店", "品牌新店"];

export default class TabList extends Component {
  componentDidMount() {
    const items = document.getElementsByClassName("TabList-item");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.addEventListener("click", () => {
        const onTabChange = this.getProperty("onTabChange");
        onTabChange(i);
      });
    }
  }

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
