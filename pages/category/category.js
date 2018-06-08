var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
var util = require('../../utils/util.js')

Page({
  data: {
    category: [
    ],
    detail: [],
    curIndex: null,
    isScroll: false,
    toView: null
  },
  onLoad() {
    console.log('onLoad')
    var self = this;
    
  },
  onShow() {
    console.log('onShow');
    util.getCategory();
    let cookie = wx.getStorageSync('cookie') || [];
    let c = wx.getStorageSync('category') || [];
    var self = this;

    self.setData({
      category: c
    })
    var self = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ad6cd85baad39136d1d293d/api/wx/cate-detail',
      success(res) {
        console.log(res.data)
        self.setData({
          detail: res.data
        })
      }
    });
  },

  onReady() {
    console.log('onReady')
  },


  switchTab(e) {
    console.log('###----------------------- switchTab ----------------------- ');
    console.log(e.target.dataset);
    console.log(this.data)
    const self = this;
    self.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 2)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 5)
  }
})