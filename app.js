var config = require('./config/config.js')
var api = require('./config/api.config.js')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    console.log('--------------- App Launch----------------')
    console.log(api);

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.screenWidth = res.windowWidth;
        that.globalData.screenHight = res.windowHeight;
        that.globalData.screenWidthScale = res.windowWidth / 750;
        that.globalData.screenHightScale = res.windowHeight / 1334;
      }
    })

    // 登录
    wx.login({
      success: function (res) {
        console.log('--------------- wx.login ----------------success')
        var appid = config.appid;//''; //填写微信小程序appid  
        var secret = config.secret; //''; //填写微信小程序secret

        console.log(res.code);

        if (res.code) {
          var code = res.code;

          var url = '/api/v1/wx';
          var data = { code, appid, secret };
          var header = "application/json";

          util.http('GET', url, data, (res) => {
            
            if (res.errMsg) {
              util.showModel(res.errMsg);
            } else {
              console.log('--------------- openid ----------------success')
              wx.setStorageSync('cookie', res.data)
              console.log(res.data)
            }
          })
        }
      },
      fail: function (res) {
        console.log('-----------------  wx.login fail ----------------- ')
        console.log(res)
      }
    });
    this.Init();
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  
  Init: function (e) {
    console.log('----------------- app Init ----------------- ')
    var that = this;
    util.getCategory();
  },

  globalData: {
    userInfo: null,
    screenWidthScale: 0.0,
    screenHightScale: 0.0,
    screenWidth: 0,
    screenHight: 0,
    hasLogin: false,
    cardList: [],               // 购物车列表
  }
})

