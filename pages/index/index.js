// 引入SDK核心类
var util = require('../../utils/util.js')

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

  onShow:function(){
    console.log('index-------------- onShow  -------------- ')
    var userinfo = util.getUserInfo();
    console.log(userinfo);
    util.getLocation();

  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        imageWidth: app.globalData.screenWidth,
        imageHeight: app.globalData.screenHightScale * 650,
        inputViewWidth: app.globalData.screenWidth,
        inputViewHeight: app.globalData.screenHightScale * 88,
        inputWidth: app.globalData.screenWidth,
        inputHeight: app.globalData.screenHightScale * 177
      })
    })

   

  },
  goList(e){
    console.log(e);
    wx.navigateTo({
      url: '../../pages/list/list?type=' + e.currentTarget.dataset.type + '&category=' + e.currentTarget.dataset.category,
    })
  }
})