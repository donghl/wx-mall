// pages/goods/goods.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    console.log('goods ------onload -----')
    var myDate = new Date();
    console.log(myDate);
    this.setData({
    })

    wx.request({
      url: "https://www.easy-mock.com/mock/5a275d908ef919728f8cc970/groupList/groupList",
      success: (res) => {
        console.log(res.data.data.goods);
        this.setData({
          goods: res.data.data.goods
        })
      }
    })
  },

  
})