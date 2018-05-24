//全局公共函数
var development = 'development';
var api = require('../config/api.config.js');

const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

var getSystemInfo = text => wx.getSystemInfo({
  success: function (res) {
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)
  }
})

// 显示繁忙提示
var showBusy = text => wx.showToast({
	title: text,
	icon: 'loading',
	duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
	title: text,
	icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
	wx.hideToast();

	wx.showModal({
		title,
		content: JSON.stringify(content),
		showCancel: false
	})
}

// 请求
var http = (method, url, data, fun, header, auth) => {
  console.log('----------------- http -----------------')
  console.log(method);
  console.log(url)
	wx.request({
		method: method,
		// url: api[url][development],
		url: api['officalUrl'] + url,
		data: data,
		header: {
			'content-type': header || 'application/json', // 默认值
			'auth': auth || ''
		},
		success: function (response) {
			console.log(response.errMsg)
			response.statusCode === 200 ? fun(response.data) : fun(response);
		},
		fail: function (response) {
			console.log(response.statusCode, response.errMsg)
		}
	})
}

module.exports = { formatTime, showBusy, showSuccess, showModel, http, getSystemInfo}
