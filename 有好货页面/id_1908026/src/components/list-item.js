import { h, Component } from "../base";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  mounted() {
    console.log("ListItem mounted");
  }

  render() {
    return (
      <div class="listitem">
        <h1>{this.props.children}</h1>
        <p>this is Listitem</p>
      </div>
    );
  }
}
