// pages/temp/test1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "red"
  },
  clickRed: function () {
    this.setData({
      color: "red"
    })
  },
  clickgreen: function () {
    this.setData({
      color: "green"
    })
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

  //确认发布 
  goDetail: function (e) {
    setTimeout(() => {
      var subValue = e.detail.value.textarea
      console.log(subValue)
      if (subValue == null || subValue == "") {
        console.log("不能为空")
        this.setData(
          { popErrorMsg: "发布的留言内容不能为空" }
        );
        this.ohShitfadeOut();
        return;
      }

    }, 100)

  },

  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})