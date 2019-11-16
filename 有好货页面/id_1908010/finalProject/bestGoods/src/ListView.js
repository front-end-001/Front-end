import Component from './BaseComponent.js'
import "./ListView.scss"
import {create} from '../lib/create'
import Div from './Div.js'

export default class ListView extends Component {
    constructor(config) {
        super(config)
        this.property.children = []
        this.didCreate()
    }

    didCreate() {
        let content = (
            <Div>
                <Div>
                    <img style={"width: 100px;height: 100px; background: blue;"}></img>
                    text</Div>
            </Div>
        )
        content.appendTo(this.root)
    }
}