// pages/apply/apply.js
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
var uuid = require('../../lib/uuid/we-uuidv4');
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let zone = e.currentTarget.dataset.zone; //获取点击的下拉列表的下标
    this.setData({
      zone: zone,
      show: !this.data.show
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cookie = wx.getStorageSync('cookie') || []

    console.log(cookie)
    this.setData({
      cookie: cookie,
      openid: cookie.openid,
      zone: wx.getStorageSync('zone') || []
    })

    console.log(cookie.openid);
    var openid = cookie.openid;

    var url = api.applyUrl
    var data = { search: { 'openid': openid } }

    util.http('GET', url, data, (res) => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('### apply.js  --------------- applyUrl ----------------success')
        console.log(res.data)
        // console.log(res.data.rows[0])
        that.setData({
          user: res.data.rows[0]

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
    var that = this;
    var url = api.applyUrl;
    var data = { search: { 'openid': that.data.openid } };
    var header = "application/json";

    util.http('GET', url, data, (res) => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        // this.setData({
        //   goods: res.data.rows
        // })
        console.log(res.data)
      }
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

  tapName: function (event) {
    console.log(event)
  },


  chooseImage: function (e) {
    console.log('### apply.js  --------------- chooseImage ----------------enter')
    var that = this;
    console.log(e.target.dataset.name)
    that.setData({
      progress: 0
    })

    var user = wx.getStorageSync('cookie') || []
    console.log(user)

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
          console.log('### apply.js  --------------- chooseImage ----------------1')
          const uploadTask = wx.uploadFile({
            url: api.singleUploadUrl, //'https://www.donghl.cn/api/v1/upload', //图片插入接口，此处为单个文件处理，多个文件则用循环处理 
            filePath: tempFilePaths[i],
            name: 'myfile',
            formData: {
              'subpath': 'apply',
              'collection': 'apply',
              'openid': user.openid,
              'arr': 'pics',
              'key': e.target.dataset.name //图片在数组里面的索引
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log('### apply.js  --------------- chooseImage ----------------success')
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
                  success: function (res) { }
                })
              }
            },
            fail:function(res){
              console.log('### apply.js  --------------- chooseImage ----------------error')
              console.log(res)
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

  submitForm: function (e) {
    var that = this;
    console.log(e.detail)

    let name, card, zone;
    // that.setData({
    //   name: e.detail.value.name,
    //   card: e.detail.value.card,
    //   // zone:e.detail.value.picker
    // })


    wx.setStorageSync('name', e.detail.value.name)
    wx.setStorageSync('card', e.detail.value.card)

    wx.request({
      url: api.applyUrl, //
      method: "PUT",
      data: {
        key: {
          'openid': that.data.openid
        },
        value: {
          "name": e.detail.value.name,
          "card": e.detail.value.card,
          'zone': wx.getStorageSync('zone'),
          'status': 1
        }
      },
      success(res) {

        console.log(res.header)
        //保存Cookie到Storage
        if (res && res.header && res.header['set-cookie']) {
          wx.setStorageSync('cookie', res.header['set-cookie'])
        }
      }
    });

  }
})