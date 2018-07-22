// pages/goods/edit.js
var uuid = require('../../lib/uuid/we-uuidv4');
var util = require('../../utils/util.js')
var api = require('../../config/api.config.js')

import {
  promisify
} from '../../utils/promise.util'
import {
  $init,
  $digest
} from '../../utils/common.util'
import {
  createQuestion
} from '../../services/question.service'
import cfg from '../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Obj: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('### edit.js ----------------- onLoad -------------------')
    console.log(options)
    this.setData({
      Obj: JSON.parse(options.obj)
    })
    var myDate = new Date();
    console.log(myDate);
    var category = wx.getStorageSync('category');
    console.log(category);
    var arr = [
      [],
      []
    ];
    for (var i = 0; i < category.length; i++) {
      arr[0][i] = category[i];
    }
    for (var i = 0; i < category[0].sub.length; i++) {
      arr[1][i] = category[0].sub[i]
    }
    console.log('onLoad-------------- arr  -------------- ')
    console.log(arr);

    this.setData({
      category: wx.getStorageSync('category'),
      uuid: uuid(),
      multiArray: arr,
      date: myDate
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

  bindMultiPickerChange: function (e) {
    console.log('-------------bindMultiPickerChange-----------------------')

    console.log('bindMultiPickerChange 发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    let self = this;
    console.log('----------------bindMultiPickerColumnChange--------------------1')
    console.log('bindMultiPickerColumnChange 修改的列为', e.detail.column, '，值为', e.detail.value);

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log('----------------bindMultiPickerColumnChange--------------------2')
    console.log(e.detail.column)
    switch (e.detail.column) {
      case 0:
        console.log('----------------bindMultiPickerColumnChange--------------------3')
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
        console.log('----------------bindMultiPickerColumnChange--------------------4')
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
    console.log('----------------bindMultiPickerColumnChange--------------------5')
    this.setData(data);
    console.log(this.data)
  },

  submitForm: function (e) {
    var that = this;
    var user = wx.getStorageSync('cookie') || [];
    var key = {
      '_id': this.data.Obj._id
    };
    var zone = wx.getStorageSync('zone') || [];
    console.log(e)
    var cc = e.detail.value.type;

    console.log(cc);

    var value = Object.assign(e.detail.value,
      zone, {
        status: 0
      }); // key.extend(e.detail.value)
    that.setData({
      v1: that.data.category[cc[0]].name,
      v2: that.data.category[cc[0]].sub[cc[1]].name
    })
    var v1 = that.data.category[cc[0]].name;
    var v2 = that.data.category[cc[0]].sub[cc[1]].name;
    value.type[0] = v1
    value.type[1] = v2

    var data = {
      key: null,
      value: null
    };
    data.key = key;
    data.value = value;
    // wx.setStorageSync('zone', that.data.zone)
    var url = '/api/v1/goods';

    util.http('PUT', url, data, (res) => {
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
    //   url: api.goodsUrl,
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

  },
  formSubmit: function (e) {
    let formId = e.detail.formId;
    this.dealFormIds(formId); //处理保存推送码
    let type = e.detail.target.dataset.type;
    //根据type的值来执行相应的点击事件
    //...
  },
  dealFormIds: function (formId) {
    let formIds = app.gData.gloabalFomIds; //获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];
    let data = {
      formId: formId,
      expire: parseInt(new Date().getTime() / 1000) + 604800 //计算7天后的过期时间时间戳
    }
    formIds.push(data); //将data添加到数组的末尾
    app.gData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
  },

  saveFormIds: function () {
    var formIds = app.gData.gloabalFomIds; // 获取gloabalFomIds
    if (formIds.length) { //gloabalFomIds存在的情况下 将数组转换为JSON字符串
      formIds = JSON.stringify(formIds);
      app.gData.gloabalFomIds = '';
    }
    wx.request({ //通过网络请求发送openId和formIds到服务器
      url: 'https://www.x.com',
      method: 'GET',
      data: {
        openId: 'openId',
        formIds: formIds
      },
      success: function (res) { }
    });
  },

})