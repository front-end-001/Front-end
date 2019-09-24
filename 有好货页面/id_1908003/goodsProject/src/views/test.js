import Carousel from '../components/Carousel'
// 轮播用例
(function () {
  const imgList = [{
    src: '../carousel-vue/public/imgs/cat1.jpg',
    title: '1-MDN',
    action: {
      type: 'link',
      value: 'https://developer.mozilla.org/en-US/',
    },
  }, {
    src: '../carousel-vue/public/imgs/cat2.jpg',
    title: '2-google',
    action: {
      type: 'link',
      value: 'https://developers.google.com/web/fundamentals/',
    },
  }, {
    src: '../carousel-vue/public/imgs/cat3.jpg',
    title: '3-github',
    action: {
      type: 'link',
      value: 'https://github.com/',
    },
  }, {
    src: '../carousel-vue/public/imgs/cat4.jpg',
    title: '4-stackoverflow',
    action: {
      type: 'link',
      value: 'https://stackoverflow.com/',
    },
  }];



  const carouselEle = document.getElementById('carousel')
  const carousel = new Carousel(carouselEle, imgList);
  carousel.init();

  window.carousel = carousel;

}());

// 动画用例
(function () {
  const ballEle = document.getElementById('ball');
  const tl = new anime.timeline({});

  tl.add({
    element: ballEle,
    property: 'left',
    startTime: 0,
    endTime: 500,
    startValue: 0,
    endValue: 100,
  }).add({
    element: ballEle,
    property: 'top',
    startTime: 500,
    endTime: 1000,
    startValue: 0,
    endValue: 100,
  }).add({
    element: ballEle,
    property: 'left',
    startTime: 1000,
    endTime: 1500,
    startValue: 100,
    endValue: 0,
  }).add({
    element: ballEle,
    property: 'top',
    startTime: 1500,
    endTime: 2000,
    startValue: 100,
    endValue: 0,
  });

  // 默认先运行一次动画
  tl.play();

  // 开始
  document.getElementById('btn-play').onclick = () => {
    tl.play();
  };
  // 暂停
  document.getElementById('btn-pause').onclick = () => {
    tl.pause();
  };
  // 重新开始
  document.getElementById('btn-restart').onclick = () => {
    tl.restart();
  };
  // 反向
  document.getElementById('btn-reverse').onclick = () => {
    tl.reverse();
  };
  // 2倍速
  document.getElementById('btn-acc').onclick = () => {
    tl.rate = 2;
  };
  // 1倍速
  document.getElementById('btn-dcc').onclick = () => {
    tl.rate = 1;
  };

}());


// 手势用例
(function () {
  const main = document.getElementById('gesture');

  let x = 0;
  let y = 0;

  gesture.enableGesture(main);


  main.addEventListener('press', (event) => {
    console.log('gesture press', event);
  });

  main.addEventListener('pressend', (event) => {
    console.log('gesture pressend', event);
  });

  main.addEventListener('presscancel', (event) => {
    console.log('gesture presscancel', event);
  });

  main.addEventListener('tap', (event) => {
    console.log('gesture tap', event);
  });

  main.addEventListener('panstart', (event) => {
    console.log('gesture panstart', event);
  });

  main.addEventListener('pan', (event) => {
    main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
  });

  main.addEventListener('panend', (event) => {
    console.log('gesture panend', event);
    main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
    x = event.dx + x;
    y = event.dy + y;
  });

  main.addEventListener('flick', (event) => {
    console.log('gesture flick', event);
    main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
    x = event.dx + x;
    y = event.dy + y;
  });
}());
