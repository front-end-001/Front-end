import MyCreate, { Component } from "MyCreate";

import "./ListItem.css";

export default class ListItem extends Component {
  render() {
    const { title, logo, content } = this.getAttribute("item");
    return (
      <div className="ListItem">
        <div className="ListItem-titleLine">
          <div className="ListItem-titleLineLeft">
            <img src={logo} alt="" className="ListItem-titleLineImg" />
            <div className="ListItem-titleLineText">
              {title}
              <span className="ListItem-titleLineTextDecorator">天猫</span>
            </div>
          </div>
          <div className="ListItem-titleLineEntry">进店</div>
        </div>
        <div className="ListItem-imgArea">
          <div
            className="ListItem-imgAreaLarge"
            style={`background-image: url(${content[0].img})`}
          />
          <div className="ListItem-imgAreaSmallArea">
            <div
              className="ListItem-imgAreaSmall"
              style={`background-image: url(${content[1].img})`}
            />
            <div
              className="ListItem-imgAreaSmall"
              style={`background-image: url(${content[2].img})`}
            />
          </div>
        </div>
      </div>
    );
  }
}
