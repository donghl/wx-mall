var uuid = require('../../lib/uuid/we-uuidv4');
var util = require('../../utils/util.js')
var api = require('../../config/api.config.js')
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { createQuestion } from '../../services/question.service'
import cfg from '../../config/config'

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickname: '',
    orders: [],
    hasAddress: false,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    /**
   * 发起请求获取订单列表信息
   */
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ad6cd85baad39136d1d293d/api/v1/order',
      success(res) {
        console.log(res)
        self.setData({
          orders: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  

  requestPayment: function (e) {
    console.log(e.currentTarget.dataset.order);
    
    var self = this

    self.setData({
      loading: true
    })

    console.log('==================================')
    console.log(api.paymentUrl)
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: cfg.paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
  },


  // wxPay: function (e) {
  //   console.log(e)
  //   var cookie = wx.getStorageSync('cookie') || [];

  //   //发送请求到后台，获取prepay_id
  //   console.log(cookie)
  //   console.log("&&&&&", cookie.openid);
  //   wx.request({
  //     url: api.getPrepayId.url,
  //     method: 'GET',
  //     data: { openId: cookie.openid ,order:e.currentTarget.dataset.order},
  //     header: { 'content-type': 'application/json' },
  //     success: function (res) {
  //       console.log("payment:", res);
  //       if (res.data.status == 100) {
  //         var payModel = res.data;
  //         wx.requestPayment({
  //           'timeStamp': payModel.timestamp,
  //           'nonceStr': payModel.nonceStr,
  //           'package': payModel.package,
  //           'signType': 'MD5',
  //           'paySign': payModel.paySign,
  //           success: function (res) {
  //             console.log("success+++", res);
  //             wx.showToast({
  //               title: '支付成功',
  //               icon: 'success',
  //               duration: 2000
  //             })
  //           },
  //           fail: function (res) {
  //             console.log("fail+++", res);
  //           }
  //         })
  //       }
  //     }
  //   })

  // }
})