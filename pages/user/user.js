// pages/new-pages/user/user.js
var util = require('../../utils/util.js')
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
//获取应用实例
const app = getApp()

Page({
  data: {

    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var self = this;
    console.log('----------------------onShow------------------------------')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('--------------- getSetting  ---------------- success')
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('---------------  getUserInfo  success--------------- ')
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              self.setData({
                userInfo: res.userInfo
              })
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log('---------------  getUserInfo  fail --------------- ')
              console.log(res)
            }
          })
        } else {

        }

      },
      fail:res=>{
        console.log('--------------- getSetting  ---------------- fail')
        console.log(res)
      }

    })
  },

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    console.log('----------------------onReady------------------------------')
    console.log(this.data.canIUse)
    console.log(this.data.userInfo)
  },


  onLoad() {

    console.log('-----------------  onLoad success ----------------- ');
    var self = this;
    var user = wx.getStorageSync('user') || []
    console.log(user.openid);
    var openid = user.openid;



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
        console.log(res)
        // self.setData({
        //   // orders: res.data
        // })
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
    console.log('----------------------getUserInfo------------------------------')
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getSystemInfo: function (e) {
    console.log('----------------------getSystemInfo------------------------------')
    wx.getSystemInfo({
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindGetUserInfo: function (e) {
    console.log('----------------------bindGetUserInfo------------------------------')
    console.log(e.detail.userInfo)
  }
})