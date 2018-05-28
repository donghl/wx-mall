var config = require('./config/config.js')
var api = require('./config/api.config.js')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    console.log('--------------- App Launch----------------')
    console.log(api);

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
              
              wx.setStorageSync('user', res.data)
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

  Init: function (e) {
    console.log('----------------- app Init ----------------- ')
    var that = this;
  },

  globalData: {
    hasLogin: false,
    cardList: [],               // 购物车列表
  }
})

