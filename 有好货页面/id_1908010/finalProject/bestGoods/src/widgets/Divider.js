import Component from '../BaseComponent'
import "./Divider.scss"

export default class Divider extends Component {
    constructor(props) {
        super(props)
        this.root.className = "divider"
    }
}