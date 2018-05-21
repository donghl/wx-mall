Page({
    data: {
        category: [
         
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onLoad(){
      console.log('onLoad')
        var self = this;
      wx.request({
        url: 'https://www.donghl.cn/api/v1/login',
        method: "POST",
        data: { "username": "aaa", "password": "12345678" },
        success(res) {
          
          console.log(res.header)
          //保存Cookie到Storage
          if (res && res.header && res.header['set-cookie']) {
            wx.setStorageSync('cookie', res.header['set-cookie']) 
          }
        }
      });
    },
    onShow(){
      console.log('onShow')
      let cookie = wx.getStorageSync('cookie');
      var self = this;
      wx.request({
        url: 'https://www.donghl.cn/api/v1/category',
        success(res) {
          console.log(res)
          self.setData({
            category: res.data.data.rows
          })
        }
      })

      // let cookie = wx.getStorageSync('cookie');
      // console.log(cookie)
      // var self = this;
      // wx.request({
      //   url: 'https://www.donghl.cn/api/v1/acl',
      //   method: "GET",
      //   data: { name: '果味', id: 'guowei',pic:'p1.jpg' },
      //   success(res) {
      //     self.setData({
      //       //detail: res.data.data
      //     })
      //   }
      // });
    },

    onReady(){
      console.log('onReady')
      // console.log(this.data)

    },
    switchType(e){
      console.log('switchTab');
      console.log(e.target.dataset);

    },
    switchTab(e){
      console.log('switchTab');
      console.log(e.target.dataset);
      // console.log(this.data)
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
})