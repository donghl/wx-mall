// pages/goods/goods.js
var util = require('../../utils/util.js')
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    console.log('goods ------onload -----')
    var myDate = new Date();
    console.log(myDate);
    this.setData({
    })


    var url = '/api/v1/goods';
    // var data = { code, appid, secret };
    var header = "application/json";

    util.http('GET', url, {}, (res) => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        this.setData({
          goods: res.data.rows
        })
        console.log(res.data)
      }
    })


    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5a275d908ef919728f8cc970/groupList/groupList",
    //   success: (res) => {
    //     console.log(res.data.data.goods);
    //     this.setData({
    //       goods: res.data.data.goods
    //     })
    //   }
    // })
  },

  
})