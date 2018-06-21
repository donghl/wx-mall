var cfg = require('./config/config.js')
var api = require('./config/api.config.js')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    console.log('### app.js --------------- App Launch----------------')
    console.log(api);
   

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.gData.screenWidth = res.windowWidth;
        that.gData.screenHight = res.windowHeight;
        that.gData.screenWidthScale = res.windowWidth / 750;
        that.gData.screenHightScale = res.windowHeight / 1334;
      }
    })

    // 登录
    wx.login({
      success: function (res) {
        console.log('### app.js --------------- wx.login ----------------success')
        var appid = cfg.appid;//''; //填写微信小程序appid  
        var secret = cfg.secret; //''; //填写微信小程序secret

        console.log(res.code);

        if (res.code) {
          var code = res.code;

          var url = api.wxUrl;
          var data = { code, appid, secret };
          var header = "application/json";

          util.http('GET', url, data, (res) => {

            if (res.errMsg) {
              util.showModel(res.errMsg);
            } else {
              console.log('### app.js  --------------- openid ----------------success')
              wx.setStorageSync('cookie', res.data)
              console.log(res.data)
            }
          })
        }
      },
      fail: function (res) {
        console.log('### app.js -----------------  wx.login fail ----------------- ')
        console.log(res)
      }
    });
    this.Init();
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.gData.userInfo) {
      typeof cb == "function" && cb(this.gData.userInfo)
    } else {

      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log('### app.js -----------------  getUserInfo  ----------------- 1')
              console.log(res.userInfo)
              console.log('### app.js -----------------  getUserInfo  ----------------- 2')
              wx.setStorageSync('user', res.userInfo)
              that.gData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.gData.userInfo)
              var userInfo = res.userInfo; 
            //------------------------------------------------------------------------------------------------
            }
          })
        }
      })
    }
  },

  Init: function (e) {
    console.log('### app.js ----------------- app Init ----------------- ')
    var that = this;
    util.getCategory();
  },

  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.gData.openid) {
      callback(null, self.gData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: api.openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.gData.openid = res.data.openid
              callback(null, self.gData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  gData: {  //全局变量
    openid: null,
    serverUrl:'',   //服务器域名信息
    userInfo: null, //用户信息
    screenWidthScale: 0.0,
    screenHightScale: 0.0,
    screenWidth: 0,
    screenHight: 0,
    hasLogin: false,
    cartList: [],               // 购物车列表
  }
})

