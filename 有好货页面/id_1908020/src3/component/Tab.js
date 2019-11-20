import Jreact from '../jreact/jreact.js'

export default class App extends Jreact.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['推荐', '有趣的店', '品牌新店', '发现']
    }
  }

  render() {
    return (
      <div>
        {this.state.list.map(item => (
          <div>{item}</div>
        ))}
      </div>
    )
  }
}