// pages/temp/index.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcList:[],
    imagewidth: 0,//缩放后的宽  
    imageheight: 0,//缩放后的高  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  input:function(e){
    let self = this;
    console.log(e);


    //判断用户输入的是否为小写字母  
    var regLowerCase = new RegExp('[a-z]', 'g');
    //判断用户输入的是否为大写字母  
    var regCapitalLetter = new RegExp('[A-Z]', 'g');
    //判断用户输入的是否为数字  
    var regNum = new RegExp('[0-9]', 'g');


    //测试数据，不为小写字母则返回null  
    var rsLowerCase = regLowerCase.exec(e.detail.value);
    //测试数据，不为大写字母则返回null  
    var rsCapitalLetter = regCapitalLetter.exec(e.detail.value);
    //测试数据，不为数字则返回null  
    var rsNum = regNum.exec(e.detail.value); 
    if (rsNum){
      self.setData({
        result:'是数字'
      })
    }
  },
  imageLoad: function (e) {
    console.log(e)
    var imageSize = util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  gotoShow: function () {
    var slef = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        slef.setData({
          srcList: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        console.log(slef.data.srcList)
      }
    })
  }


})