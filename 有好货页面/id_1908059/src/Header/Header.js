import MyCreate, {Component} from "MyCreate";
import titleImg from './title.png'

import './Header.css'

export default class Header extends Component {
  render() {
    return <div className="Header">
      <div className="Header-navSection">
        <img src={titleImg} className="Header-titleImg" />
      </div>
    </div>
  }
}
