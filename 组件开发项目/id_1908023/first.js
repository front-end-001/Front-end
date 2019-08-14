let data = [
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW70tKnB.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW78nMR-.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqKnD.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqL7D.jpg",
];

class Carousel {
  constructor(container, data) {
    this._container = container;
    this._container.classList.add('container');
    this.data = data;
  }

  render() {
    for (let d of data) {
      let img = document.createElement('img');
      img.src = d;
      this._container.appendChild(img);
    }
  }
}

new Carousel(document.getElementById('container'), data).render();
