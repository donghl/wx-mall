// page/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    zheng: null,
    fan: null,

    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    array: ['北美', '欧洲', '东南亚', '日韩', '港澳台', '大陆'],//下拉列表的数据
    zone: 0,//选择的下拉列表下标
    name: null,
    card: null,

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zone: e.detail.value
    })
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let zone = e.currentTarget.dataset.zone;//获取点击的下拉列表的下标
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
    var Obj = wx.getStorageSync('Obj') || []
    var name = wx.getStorageSync('name') || []
    var card = wx.getStorageSync('card') || []

    console.log(Obj)
    this.setData({
      obj: Obj,
      openid: Obj.openid,
      name:name,
      card:card,
      zone: wx.getStorageSync('zone') || []
    })


    /**
  * 发起请求获取订单列表信息
  */
    var openid = Obj.openid;

    wx.request({
      method: 'GET',
      url: 'https://www.donghl.cn/api/v1/apply',
      data: { openid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data) //获取openid  
        console.log(res.data.data.rows[0].zheng)
        that.setData({
          zheng: res.data.data.rows[0].zheng,
          fan: res.data.data.rows[0].fan,
          he: res.data.data.rows[0].he
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

  tapName: function (event) {
    console.log(event)
  },


  chooseImage: function (e) {
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
            url: 'https://www.donghl.cn/upload-single', //图片插入接口，此处为单个文件处理，多个文件则用循环处理 
            filePath: tempFilePaths[i],
            name: 'myfile',
            formData: {
              'subpath': 'apply',
              'collection': 'apply',
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

  submitForm: function (e) {
    var that = this;
    console.log(e.detail)

    let name, card,zone;
    that.setData({
      name: e.detail.value.name,
      card: e.detail.value.card,
      zone:e.detail.value.picker
    })


    wx.setStorageSync('name', that.data.name)
    wx.setStorageSync('card', that.data.card)
    wx.setStorageSync('zone', that.data.zone)

    wx.request({
      url: 'https://www.donghl.cn/api/v1/apply',
      method: "PUT",
      data: { key:{ 'openid':that.data.openid},
              value:{"name": that.data.name, "card": that.data.card, 'status':1} },
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