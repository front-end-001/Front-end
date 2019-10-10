const data = {
  carousels: [{
    imageUrl: './static/banner-1.png'
  }, {
    imageUrl: './static/banner-2.png'
  }, {
    imageUrl: './static/banner-3.png'
  }],
  recommand: {
    favorites: [{
      title: '极客时间旗舰店',
      logo: './static/geektime-logo.png',
      tag: '天猫',
      img01: './static/recommend/toy01.png',
      img02: './static/recommend/toy02.png',
    }, {
      title: '乔丹旗舰店',
      logo: './static/jordon-logo.png',
      tag: '天猫',
      img01: './static/recommend/jordon-jackets.png',
      img02: './static/recommend/jordon-shoe.png',
    }],
    list: [{
      title: '极客时间旗舰店',
      logo: './static/geektime-logo.png',
      tag: '天猫',
      count: 13000,
      img01: './static/recommend/geektime-big.png',
      img02: './static/recommend/geektime-small01.png',
      img03: './static/recommend/geektime-small02.png',
      link: 'javascript:void(0);'
    }, {
      title: '极客大学天猫店',
      logo: './static/geekcollege-logo.png',
      tag: '天猫',
      count: 8000,
      img01: './static/recommend/geekcollege-big.png',
      img02: './static/recommend/geekcollege-small01.png',
      img03: './static/recommend/geekcollege-small02.png',
      link: 'javascript:void(0);'
    }, {
      title: 'InfoQ官方旗舰店',
      logo: './static/infoq-logo.png',
      tag: '天猫',
      count: 23000,
      img01: './static/recommend/infoq-big.png',
      img02: './static/recommend/infoq-small01.png',
      img03: './static/recommend/infoq-small02.png',
      link: 'javascript:void(0);'
    }]
  }
};

const fs = require('fs');

fs.writeFile('./data.json', JSON.stringify(data), (err) => {
  if (err) {
    console.error('写入文件失败', err);
  } else {
    console.log('写入文件成功');
  }
});