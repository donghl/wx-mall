// var QQMapWX = require('../../image/button/11.png');

// page/goods/add.js
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

  uploadImages: function (e) {
    var that = this;
    console.log(e.target.dataset.name)
    that.setData({
      progress: 0
    })

    var Obj = wx.getStorageSync('Obj') || []
    console.log(Obj)

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)

        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        // console.log(that.data.openid);

        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          const uploadTask = wx.uploadFile({
            url: 'https://www.donghl.cn/upload-multi', //图片插入接口，此处为单个文件处理，多个文件则用循环处理 
            filePath: tempFilePaths[i],
            name: 'myfile',
            formData: {
              'subpath': 'goods',
              'collection': 'goods',
              'openid': Obj.openid,
              'arr': 'pics',
              'key': e.target.dataset.name   //图片在数组里面的索引
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              uploadImgCount++;
              var data = res.data
              //do something
              console.log(data)
              console.log(res.statusCode)
              if (res.statusCode != 200) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) {
                  }
                })
              }
            }
          })

          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度', res.progress),
              that.setData({
                progress: res.progress
              })
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          })

        }
      }
    })
  },
})