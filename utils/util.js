//全局公共函数
var development = 'development';
var api = require('../config/api.config.js');
var QQMapWX = require('../lib/qqmap/qqmap-wx-jssdk.js');
//获取应用实例
const app = getApp()


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var getSystemInfo = text => wx.getSystemInfo({
  success: function (res) {
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)
  }
})

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

// 请求
var http = (method, url, data, fun, header, auth) => {
  console.log('======================util.http==================================')
  console.log(method);
  console.log(url)
  console.log(data);
  console.log(url.indexOf('http'));

  wx.request({
    method: method,
    // url: api[url][development],
    url: url.indexOf('http') >= 0 ? url : api['officalUrl'] + url,
    data: data,
    header: {
      'content-type': header || 'application/json', // 默认值
      'auth': auth || ''
    },
    success: function (response) {
      console.log(response.errMsg)
      response.statusCode === 200 ? fun(response.data) : fun(response);
    },
    fail: function (response) {
      console.log(response.statusCode, response.errMsg)
    }
  })
}


function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight / originalWidth;//图片高宽比  
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比  
      console.log('windowWidth: ' + windowWidth)
      console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
        //图片缩放后的宽为屏幕宽  
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比  
        //图片缩放后的高为屏幕高  
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

function getLocation(e) {
  console.log('util -------------- getLoaction -------------- ')
  wx.getLocation({
    // type: 'gcj02',
    success: function (res) {

      console.log(res.latitude)
      console.log(res.longitude)
      // 实例化API核心类
      var demo = new QQMapWX({
        key: 'FGDBZ-K63WG-TTQQQ-IPMD4-A4SBS-VIFY5' // 必填
      });

      // 调用接口
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          console.log('getLoaction -------------- success -------------- ')
          console.log(res.result.address_component)
          wx.setStorageSync('zone', res.result)
        },
        fail: function (res) {
          console.log('getLoaction -------------- fail -------------- ')
          console.log(res);
        },
        complete: function (res) {
          console.log('-------------- complete -------------- ')
          console.log(res);
        }
      });

    }
  })
}
function getCategory() {
  console.log(' util --------------- getCategory  ---------------- ')
  let cc = wx.getStorageSync('category')

  console.log(cc);
  // if (cc == '') {
  var url = api.categoryApi.url;
  var data = {};
  data.enable = true;

  console.log(url);
  console.log(data);

  var header = "text/javascript";

  http('GET', url, data, (res) => {
    if (res.errMsg) {
      util.showModel(res.errMsg);
      return null;

    } else {
      console.log(res)
      wx.setStorageSync('category', res);
      // self.setData({
      //   category: res
      // })
    }
  }, header)
  // } 
}
function getUserInfo() {
  console.log('util --------------- getUserInfo  ---------------- ')
  let self = this;
  // 获取用户信息
  wx.getSetting({
    success: res => {
      console.log('--------------- getSetting  ---------------- success')

      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            console.log('---------------  getUserInfo  success--------------- ')
            console.log(res)
            wx.setStorageSync('user', res.userInfo)
            return res.userInfo;
            // app.globalData.userInfo = res.userInfo

            // //写入缓存
            // wx.setStorage({
            //   key: 'userInfo',
            //   data: app.globalData.userInfo,
            //   success: function (res) {
            //     console.log("insert success")
            //   },
            //   fail: function () {
            //     // fail
            //   },
            //   complete: function () {
            //     // complete
            //   }
            // })
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          },
          fail: res => {
            console.log('---------------  getUserInfo  fail --------------- ')
            console.log(res)
          }
        })
      } else {
        console.log(res)
      }

    },
    fail: res => {
      console.log('--------------- getSetting  ---------------- fail')
      console.log(res)
    }

  })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, http, getSystemInfo, getUserInfo, getLocation, imageUtil, getCategory }
