// pages/goods/edit.js
var api = require('../../config/api.config.js');
var util = require('../../utils/util.js')
import {
  promisify
} from '../../utils/promise.util'
import {
  $init,
  $digest
} from '../../utils/common.util'
import {
  createQuestion
} from '../../services/question.service'
import cfg from '../../config/config'

const wxUploadFile = promisify(wx.uploadFile)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    $init(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },


  submitForm(e) {
    console.log(e)

    const title = this.data.title
    const content = this.data.content
    var cookie = wx.getStorageSync('cookie') || []

    if (title && content) {
      const arr = []
      
      for (let path of this.data.images) {
        arr.push(wxUploadFile({
          // url: config.urls.question + '/image/upload',
          url: api.singleUploadUrl,
          filePath: path,

          name: 'myfile',
          formData: {
            'subpath': 'guide',
            'collection': 'guide',
            'openid': cookie.openid,
            'arr': 'theme',
            'key': 'key'
          },
        }))
      }

      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      Promise.all(arr).then(res => {
        console.log(res);
        return res.map(item => JSON.parse(item.data).url)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        console.log(urls)
        // return createQuestion({
        //   title: title,
        //   content: content,
        //   images: urls
        // })
      }).then(res => {
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        const prevPage = pages[pages.length - 2];

        // prevPage.data.questions.unshift(res)
        // $digest(prevPage)

        wx.navigateBack()
      }).catch(err => {
        console.log(">>>> create question error:", err)
      }).then(() => {
        wx.hideLoading()
      })
    }
  }


})