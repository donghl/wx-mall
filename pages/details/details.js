// pages/details/details.js   
/**
 * 物品的详细信息
 */
Page({
  data:{
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '',
      price: 0.01,
      stock: '有货', 
      detail: '这里是详情。',
      parameter: '125g/个',  //规格参数
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    
    this.setData({
      curIndex: index
    })
  }
})