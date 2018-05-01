Page({
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    console.log(e.target.dataset)
    var _datasetId = e.target.dataset.id;
    console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onLoad: function (options) {
    console.log("---onLoad---");
    console.log(options)
  }
});  