import MyCreate, { Component } from "MyCreate";
import TabList from "~/TabContainer/TabList";
import titleImg from "./title.png";

import HeaderStyle from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={HeaderStyle.Header}>
        <div className={HeaderStyle.navSection}>
          <img src={titleImg} className={HeaderStyle.titleImg} />
        </div>
        <TabList props={{ tabIndex: 0 }} />
      </div>
    );
  }
}
