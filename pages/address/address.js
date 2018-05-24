// pages/new-pages/user/address/address.js
Page({
  data: {
    address: {
    }
  },
  onShow() {

  },
  onLoad() {
    var self = this;
    self.setData({
      address: wx.getStorageSync('address') || []
    })
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     console.log('1111111111111111111')
    //     console.log(res)
    //     self.setData({
    //       address : res.data
    //     })
    //     console.log(address)
    //   }
    // })
  },
  formSubmit(e) {
    const value = e.detail.value;
    if (value.userName && value.telNumber && value.detail) {
      wx.setStorage({
        key: 'address',
        data: value,
        success() {
          wx.navigateBack();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
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
      }
    })
  }
})