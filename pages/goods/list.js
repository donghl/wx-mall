// pages/list/list.js
var util = require('../../utils/util.js')
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')

Page({
  data: {
    goodslist: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.getList(options.type,'1',false)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }, 
  goDetail(e) {
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  getList(type, page, flag) {
    var that = this;
    var url = '/api/v1/goods';
    var data = {
      type: type,
      page: page,
      pageSize: 10
    };
    util.http('GET', url, data, (response) => {
      if (response.errMsg) {
        util.showModel(response.errMsg);
      } else {
        console.log(flag)
        if (flag) {
          that.setData({
            goodslist: that.data.list.concat(response.list)
          })
        } else {
          that.setData({
            goodslist: response.list
          })
        }
      }
    })
  },
})