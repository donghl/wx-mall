// pages/user/wx.js
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
var uuid = require('../../lib/uuid/we-uuidv4');
var util = require('../../utils/util.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('cookie') || []
    this.setData({
      user: user,
      openid: user.openid,
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
  this.setData({
    wx:user.wx
  })
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

  submitForm: function (e) {
    var that = this;
    console.log(e.detail)

    let name, card, zone;
    that.setData({
      wx: e.detail.value.wx
      // zone:e.detail.value.picker
    })

    wx.setStorageSync('wx', that.data.wx)

    wx.request({
      url: api.applyUrl, //
      method: "PUT",
      data: {
        key: {
          'openid': that.data.openid
        },
        value: {
          "wx": that.data.wx,
        }
      },
      success(res) {
        console.log(res.header)
      }
    });

  }
})