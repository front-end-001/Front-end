/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const Mock = require('mockjs');
const config = require('./config.js');

const app = express();
const multipartMiddleware = multipart();

const mock = (data, params) => {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return Mock.mock(data);
  }
  if (typeof data === 'function') {
    return Mock.mock(data(params));
  }
  return 'error: data shold be an object or a function.';
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

config.forEach(({ method, url, data }) => {
  if (method === 'get') {
    app.get(url, (req, res) => {
      res.json(mock(data, req.query));
    });
  } else if (method === 'post') {
    app.post(url, multipartMiddleware, (req, res) => {
      res.json(mock(data, req.body));
    });
  } else if (method === 'jsonp') {
    app.get(url, (req, res) => {
      const { query } = req;

      const mockData = JSON.stringify(mock(data, req.query));

      const callback = `typeof ${query.callback} === "function" && ${query.callback}(${mockData})`;

      res.send(callback);
    });
  }
});

let port = 8888;
process.argv.forEach((arg, index, arr) => {
  if (arg === '--port') {
    port = arr[index + 1] || 8888;
  }
});

module.exports = app.listen(port, () => {
  console.log(`Mock Server listening on http://localhost:${port}`);
});
