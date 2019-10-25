import Component from './Component'

export default class Tab extends Component {
  constructor(config) {
    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];
  }
  appendTo(element){
    element.appendChild(this.root);
    this.mounted();
  }
  created(){
    this.root = document.createElement("div");
    this.headerContainer = document.createElement("div");
    this.contentContainer = document.createElement("div");
  }
}