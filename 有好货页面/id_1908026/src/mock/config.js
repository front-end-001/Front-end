const api = require('../api/api-map.json');
const getRecommend = require('./data/getRecommend.js');

const config = [
  {
    method: 'get',
    url: api.getRecommend,
    data: getRecommend,
  },
];
module.exports = config;
