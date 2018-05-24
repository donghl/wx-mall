var config=require('./config/config.js')
var api =require('./config/api.config.js')

App({
  onLaunch: function () {
    console.log('--------------- App Launch----------------')
    console.log(api);


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('--------------- App Launch----------------111')
        console.log(res);
      },
      fail:res=>{
        console.log(res);
        console.log('--------------- App Launch----------------222')
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    this.Init();
  },

  Init: function (e) {
    console.log('----------------- app Init ----------------- ')
    var that = this;

    wx.login({
      success: function (res) {
        var appid = config.appid;//''; //填写微信小程序appid  
        var secret = config.secret; //''; //填写微信小程序secret

        console.log(res.code);

        if (res.code) {
          var code = res.code;

          wx.request({
            method: 'GET',
            url: api.wxApi.url,//'https://www.donghl.cn/api/v1/wx',
            data: { code, appid, secret },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('----------------- app Init success ----------------- ')
              console.log(res.data) //获取openid  
              wx.setStorageSync('user', res.data.data)
            },
            fail: function (res) {
              console.log('----------------- app Init fail ----------------- ')
            }
          })
        }
      }
    });
  },
  globalData: {
    hasLogin: false,
    userInfo: null
  }
})

