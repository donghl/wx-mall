// var uuid = require('../../lib/node-uuid/uuid.modified.js');
var uuid = require('../../lib/uuid/we-uuidv4');
var config = require('../../config/config.js')
var api = require('../../config/api.config.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0],
    multiArray: [['美妆/洗护', '手表/饰品', '服装', '箱包', '鞋子'], ['尿裤湿巾', '喂养用品', '洗护用品', '玩具乐器', '服饰']],
    uuid: null,
    date: null
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    console.log('add ------onload -----')
    var myDate = new Date();
    console.log(myDate);
    this.setData({
      uuid: uuid(),
      date: myDate
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('add ------onReady -----')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('add ------onShow -----')
    // // v1 是基于时间戳生成uuid 
    // console.log(uuid.v1());
    // // v4 是随机生成uuid 
    // console.log(uuid.v4());  
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


  bindMultiPickerChange: function (e) {
    console.log('-------------bindMultiPickerChange-----------------------')
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('----------------bindMultiPickerColumnChange--------------------1')
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log('----------------bindMultiPickerColumnChange--------------------2')
    console.log(e.detail.column)
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['尿裤湿巾', '喂养用品', '洗护用品', '玩具乐器', '服饰'];
            // data.multiArray[2] = ['纸尿裤', '拉拉裤', '婴儿湿巾'];
            break;
          case 1:
            data.multiArray[1] = ['欧美表', '日韩表', '时尚表', '饰品'];
            // data.multiArray[2] = ['雷朋', '古驰'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
        // case 1:
        //   switch (data.multiIndex[0]) {
        //     case 0:
        //       switch (data.multiIndex[1]) {
        //         case 0:
        //           data.multiArray[2] = ['纸尿裤', '拉拉裤', '婴儿湿巾'];
        //           break;
        //         case 1:
        //           data.multiArray[2] = ['蛔虫'];
        //           break;
        //         case 2:
        //           data.multiArray[2] = ['蚂蚁', '蚂蟥'];
        //           break;
        //         case 3:
        //           data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
        //           break;
        //         case 4:
        //           data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
        //           break;
        //       }
        //       break;
        //     case 1:
        //       switch (data.multiIndex[1]) {
        //         case 0:
        //           data.multiArray[2] = ['鲫鱼', '带鱼'];
        //           break;
        //         case 1:
        //           data.multiArray[2] = ['青蛙', '娃娃鱼'];
        //           break;
        //         case 2:
        //           data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
        //           break;
        //       }
        //       break;
        //   }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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
    console.log('==================uploadImages===========================')
    var that = this;
    console.log(e.target.dataset.name)
    var arr = e.target.dataset.name;
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
        console.log('==================chooseImage===========================')
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
              'uuid': that.data.uuid,
              'openid': Obj.openid,
              'arr': arr,
              'key': i   //图片在数组里面的索引
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

    let name, card, zone;

    var Obj = wx.getStorageSync('Obj');

    // wx.setStorageSync('zone', that.data.zone)

    wx.request({
      url: 'https://www.donghl.cn/api/v1/goods',
      method: "PUT",
      data: {
        key: { 'uuid': that.data.uuid },
        value: { "name": that.data.name, 
        'openid':Obj.openid,
        'zone': wx.getStorageSync('zone'), 
        'status': 0 }
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