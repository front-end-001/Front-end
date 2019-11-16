import { h, Component } from "../base";
import ListItem from "./list-item";

export default class ListView extends Component {
  constructor(props) {
    super(props);
    console.log("子组件", this.props.children);
  }

  mounted() {
    console.log("ListView mounted");
  }

  render() {
    return (
      <div class="aaaaa">
        <p>这是列表的头部</p>
        {this.props.children}
        {this.props.children}

        {this.props.data.map(child => {
          return <ListItem>{this.props.children}</ListItem>;
        })}
      </div>
    );
  }
}
