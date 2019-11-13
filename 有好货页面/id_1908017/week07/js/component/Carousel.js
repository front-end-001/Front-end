import { BaseComponent } from "../component";

export class Carousel extends BaseComponent {
  mounted() {
    this.root.innerText = 'Carousel';
  }
}