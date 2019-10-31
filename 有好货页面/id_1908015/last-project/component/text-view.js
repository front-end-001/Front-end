import Component from './component'

export default class TextView extends Component {
  constructor(config){
    super();
    this.text = config || "";

    this.create()
  }

  create(){
    this.root = document.createElement('span');
    this.root.style.whiteSpace = "normal";
    this.root.innerText = this.text;
  }
}
