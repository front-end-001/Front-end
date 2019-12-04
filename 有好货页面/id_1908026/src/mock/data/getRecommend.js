// eslint-disable-next-line import/no-extraneous-dependencies
const { Random } = require('mockjs');
const Mock = require('mockjs');

module.exports = {
  code: 0,
  message: 'success',
  data: {
    slider: [
      {
        id: 1,
        picUrl:
          'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
      },
      {
        id: 2,
        picUrl:
          'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
      },
    ],
    'shopList|10-30': [
      {
        title: Random.ctitle(),
        logo: Random.image('36x36'),
        star:
          'http://gw.alicdn.com/tps/i2/TB1fMgKFpXXXXXKbXXXHpVt.VXX-132-24.png_110x10000.jpg_.webp',
        'follow|10000-50000': 10000,
        img1: Random.image('217x217'),
        img2: Random.image('107x107'),
        img3: Random.image('107x107'),
      },
    ],
  },
};
