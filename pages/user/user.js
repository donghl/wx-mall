// pages/new-pages/user/user.js
var util = require('../../utils/util.js')
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad() {

    console.log('-----------------  onLoad success ----------------- ');
    var self = this;
    var Obj = wx.getStorageSync('Obj') || []
    console.log(Obj.openid);
    var openid = Obj.openid;

    wx.request({
      method: 'GET',
      url: api.applyApi.url, 
      data: { openid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('----------------------------------------------------')
        console.log(res.data) //获取openid  
        self.setData({
          status: res.data.data.rows[0].status
        })
      }
    })

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: api.orderApi.url,
      success(res) {
        self.setData({
          // orders: res.data
        })
      }
    })
  },
  onShow() {
    var self = this;
    console.log(this.data)
  },
  /**
   * 发起支付请求
   */
  payOrders() {
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        wx.showModal({
          title: '支付提示',
          content: '<text>',
          showCancel: false
        })
      }
    })
  },
  swichNav() {

  },

  getAddress: function () {
    let self = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        self.setData({
          address: res
        })
        wx.setStorageSync('address', res)
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getSystemInfo: function (e) {
    wx.getSystemInfo({
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})