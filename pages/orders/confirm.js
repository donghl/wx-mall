// pages/orders/orders.js
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: [{
        id: 1,
        title: '新鲜芹菜 半斤',
        image: '/image/s5.png',
        num: 4,
        price: 0.01
      },
      {
        id: 2,
        title: '素米 500g',
        image: '/image/s6.png',
        num: 1,
        price: 0.03
      }
    ]
  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function() {
    const self = this;

    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: wx.getStorageSync('address'),
          hasAddress: true
        })
      }
    })
  },
  getAddress: function () {
    let self = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        self.setData({
          address: res
        })
        wx.setStorageSync('address', res)
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text: 'center',
      complete() {
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  }
})