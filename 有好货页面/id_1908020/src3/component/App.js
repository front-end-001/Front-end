import Jreact from '../jreact/jreact.js'
import Tab from './Tab'

export default class App extends Jreact.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '小讲堂',
      courses: ['数学', '语文', '英语'],
      styleObj: {
        color: 'red',
        fontWeight: 'bold'
      }
    }
  }

  render() {
    return (
      <Tab/>
    )
  }

  modifyName() {
    let newName = window.prompt('输入标题','小讲堂')
    this.setState({name: newName})
  }

  setStyle() {
    this.setState({
      styleObj: {
        color: 'blue'
      }
    })
  }
}