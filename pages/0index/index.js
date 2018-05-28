// 引入SDK核心类
var util = require('../../utils/util.js')
var QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
//获取应用实例
var app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    damoHeight: '100',//demo高度
    imgUrls: [
      '/image/c0.png',
      '/image/list1.png',
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onPageScroll: function (res) {
    console.log(res.scrollTop);
  },



  onLoad: function () {
    var that = this
    wx.getLocation({
      // type: 'gcj02',
      success: function (res) {
        // var latitude = res.latitude
        // var longitude = res.longitude
        // var speed = res.speed
        // var accuracy = res.accuracy
        // var verticalAccuracy = res.verticalAccuracy

        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.speed)
        console.log(res.accuracy)
        console.log(res.altitude)
        console.log(res.verticalAccuracy)
        console.log(res.horizontalAccuracy)

        // 实例化API核心类
        var demo = new QQMapWX({
          key: 'FGDBZ-K63WG-TTQQQ-IPMD4-A4SBS-VIFY5' // 必填
        });

        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log('-------------- success -------------- ')
            console.log(res);
            console.log(res.result.address_component)
            wx.setStorageSync('zone', res.result)
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log('-------------- complete -------------- ')
            console.log(res);
          }
        });

      }
    })

  },
})