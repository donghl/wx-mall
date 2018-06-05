var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
var util = require('../../utils/util.js')

Page({
  data: {
    category: [
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei'
  },
  onLoad() {
    console.log('onLoad')
    var self = this;
    // wx.request({
    //   url: api.loginApi.url,
    //   method: "POST",
    //   data: { "username": "aaa", "password": "12345678" },
    //   success(res) {

    //     console.log(res.header)
    //     //保存Cookie到Storage
    //     if (res && res.header && res.header['set-cookie']) {
    //       wx.setStorageSync('cookie', res.header['set-cookie'])
    //     }
    //   }
    // });
  },
  onShow() {
    console.log('onShow')
    let cookie = wx.getStorageSync('cookie') || [];
    let c = wx.getStorageSync('category') || [];
    var self = this;

    self.setData({
      category: c
    })


    // wx.request({
    //   // url: api.categoryApi.url,
    //   url:'https://www.easy-mock.com/mock/5ad6cd85baad39136d1d293d/api/v1/category',
    //   success(res) {
    //     console.log(res)
    //     self.setData({
    //       category: res.data
    //     })
    //   }
    // })
  },

  onReady() {
    console.log('onReady')
    // console.log(this.data)

  },
  switchType(e) {
    console.log('switchTab');
    console.log(e.target.dataset);

  },
  switchTab(e) {
    console.log('###----------------------- switchTab ----------------------- ');
    console.log(e.target.dataset);
    // console.log(this.data)
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  }
})