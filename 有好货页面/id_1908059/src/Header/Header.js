import MyCreate, { Component } from "MyCreate";
import TabList from "~/TabContainer/TabList";
import titleImg from "./title.png";

import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-navSection">
          <img src={titleImg} className="Header-titleImg" />
        </div>
        <TabList props={{ tabIndex: 0 }} />
      </div>
    );
  }
}
