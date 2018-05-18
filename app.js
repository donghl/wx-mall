App({
  onLaunch: function () {
    console.log('App Launch')
    this.Init();
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },

  Init: function (e) {
    console.log('----------------- app Init ----------------- ')
    var that = this;

    wx.login({
      success: function (res) {
        var appid = 'wx34df2486848234c5'; //填写微信小程序appid  
        var secret = 'dfdcc86d8e7fffd9defd94267dd4ce09'; //填写微信小程序secret  
        console.log(res.code);

        if (res.code) {
          var code = res.code;

          wx.request({
            method: 'GET',
            url: 'https://www.donghl.cn/api/v1/wx',
            data: { code, appid, secret },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('----------------- app Init success ----------------- ')
              console.log(res.data) //获取openid  
              wx.setStorageSync('Obj', res.data.data)
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
    hasLogin: false
  }
})

