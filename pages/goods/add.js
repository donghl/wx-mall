// var uuid = require('../../lib/node-uuid/uuid.modified.js');
var uuid = require('../../lib/uuid/we-uuidv4');
var util = require('../../utils/util.js')
// var config = require('../../config/config.js')
var api = require('../../config/api.config.js')
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { createQuestion } from '../../services/question.service'
import config from '../../config/config'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    // category: wx.getStorageSync('category'),
    multiIndex: [0, 0],
    multiArray: [[], []],
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
    var category = wx.getStorageSync('category');
    console.log(category);
    var arr = [[], []];
    for (var i = 0; i < category.length; i++) {
      arr[0][i] = category[i].name;
    }
    for (var i = 0; i < category[0].sub.length; i++) {
      arr[1][i] = category[0].sub[i]
    }
    console.log('onLoad-------------- arr  -------------- ')
    console.log(arr);

    this.setData({
      category: wx.getStorageSync('category'),
      uuid: uuid(),
      multiArray:arr,
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
    let self = this;
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
            data.multiArray[1] = self.data.category[0].sub;
            break;
          case 1:
            data.multiArray[1] = self.data.category[1].sub;
            break;
          case 2:
            data.multiArray[1] = self.data.category[2].sub;
            break;
          case 3:
            data.multiArray[1] = self.data.category[3].sub;
            break;
          case 4:
            data.multiArray[1] = self.data.category[4].sub;
            break;
        }
        // data.multiIndex[1] = 0;
        // data.multiIndex[2] = 0;
        break;
      case 1:
        // switch (data.multiIndex[1]) {
        //   case 0:
        //     data.multiArray[2] = ['鲫鱼', '带鱼'];
        //     break;
        //   case 1:
        //     data.multiArray[2] = ['青蛙', '娃娃鱼'];
        //     break;
        //   case 2:
        //     data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
        //     break;
        // }
        // data.multiIndex[1] = 0;
        break;
    }
 
    this.setData(data);
    console.log(this.data)
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
  bindTextAreaBlur: function (e) {
    console.log(e)
  },
  bindP1Blur: function (e) {
    console.log(e)
  },
  chooseImage(e){
    console.log('==================chooseImage===========================')
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },
  uploadImages: function (e) {
    console.log('==================uploadImages===========================')
    var that = this;
    console.log(e.target.dataset.name)
    var arr = e.target.dataset.name;
    that.setData({
      progress: 0
    })

    var cookie = wx.getStorageSync('cookie') || []
    console.log(cookie)
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
            url: api.multiUpload.url,// , //图片插入接口，此处为单个文件处理，多个文件则用循环处理 
            filePath: tempFilePaths[i],
            name: 'myfile',
            formData: {
              'subpath': 'goods',
              'collection': 'goods',
              'uuid': that.data.uuid,
              'openid': cookie.openid,
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
    var user = wx.getStorageSync('cookie') || [];

    var key = { 'openid': user.openid };
    var zone = wx.getStorageSync('zone') || [];
    console.log(e)
    var data = Object.assign(key, e.detail.value, zone,{status:0});// key.extend(e.detail.value)
    console.log(data)

    // wx.setStorageSync('zone', that.data.zone)
    var url = '/api/v1/goods';

    util.http('POST', url, data, (res) => {
      console.log(res)
      if (res.result != 0) {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        })
      }
    })

    // wx.request({
    //   url: api.goodsApi.url,
    //   method: "PUT",
    //   data: {
    //     key: { 'uuid': that.data.uuid },
    //     value: { "name": that.data.name, 
    //     'openid':user.openid,
    //     'zone': wx.getStorageSync('zone'), 
    //     'status': 0 }
    //   },
    //   success(res) {
    //     console.log(res.header)
    //     //保存Cookie到Storage
    //     if (res && res.header && res.header['set-cookie']) {
    //       wx.setStorageSync('cookie', res.header['set-cookie'])
    //     }
    //   }
    // });

  }

})