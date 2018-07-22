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
  onShow: function (e) {
    var myDate = new Date();
    console.log(myDate);
    this.setData({
      date: myDate
    })
    var url = api.goodsUrl;
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
  },
  onLoad: function (options) {
    console.log('goods ------onload -----')
    console.log(options)
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

  tabClick: function (e) {
    console.log(e)
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getRankList(this.data.activeCategoryId);
  },

  getRankList: function (e) {
    var url = api.goodsUrl;
    // var data = { code, appid, secret };
    var header = "application/json";
    var parameter = {
      // search: { name: '1' },
      page: 1,
      size: 10,
      sort: { 'name': -1}
    }

    util.http('GET', url, parameter, (res) => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        this.setData({
          goods: res.data.rows
        })
        console.log(res.data)
      }
    })
  },
  editGoods: function (e) {
    console.log('### ----------------- editGoods -------------------')
    console.log(e)
    wx.navigateTo({
      url: '../goods/edit?obj=' + JSON.stringify(e.currentTarget.dataset.obj),
    })
  }

})