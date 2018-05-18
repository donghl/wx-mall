// page/new-pages/user/user.js
Page({
  data:{
    thumb:'',
    nickname:'',
    status:0,
    orders:[],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    var self = this;
    var Obj = wx.getStorageSync('Obj') || []
    console.log(Obj.openid);
    var openid = Obj.openid;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    }),

    

    wx.request({
      method: 'GET',
      url: 'https://www.donghl.cn/api/v1/apply',
      data: {openid},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('----------------------------------------------------')
        console.log(res.data) //获取openid  
        self.setData({
          status:res.data.data.rows[0].status
        })
      }
    })

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: 'https://www.donghl.cn/api/v1/order',
      success(res){
        self.setData({
          // orders: res.data
        })
      }
    })
  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })

    console.log(this.data)
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  },
  swichNav(){

  }

})