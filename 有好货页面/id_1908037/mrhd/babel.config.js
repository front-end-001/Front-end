/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 18:29:40
 * @LastEditTime: 2019-09-07 18:29:48
 * @LastEditors: Please set LastEditors
 */
const presets = [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
        },
        useBuiltIns: "usage",
      },
    ],
  ];
  
  module.exports = { presets };