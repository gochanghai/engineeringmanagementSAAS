// pages/confirmvalue/confirmvalue.js
const confirmvalueAction = require('../../backend/manageAction/confirmvalueAction.js');
Page({
  data: {

  },

  onLoad: function(options) {

    // 获取项目ID
    this.setData({
      projectID: options.projectID,
      totalAmount: options.contractamount,
    });
    // 获取产值数据
    this.getOutputValueList(this.data.projectID);
  },
  onShow: function() {
    this.getOutputValueList(this.data.projectID);
  },

  // 获取产值列表数据
  getOutputValueList(projectID) {
    let _than = this;
    // 打开加载框
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    // 调用函数接口获取数据
    confirmvalueAction.getConfirmvalueList(projectID, function(res) {
      console.log(res);
      let list = [];
      for (let index in res) {
        let item = {
          id: res[index].formid,
          uploadDate: _than.dateFormat2(res[index].valueuploadat),
          outputValue: _than.getMoneyFormat(res[index].outputvalue),
          receivableAmount: _than.getMoneyFormat(res[index].receivableamount),
        };
        list.push(item);
      }
      _than.setData({
        list: list,
      });
      // 关闭加载框
      wx.hideToast({});
    });
  },

  // 跳转到登记产值
  confirmRegistration(event) {
    let projectID = this.data.projectID;
    let formID = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/outputvalregister/outputvalregister?projectID=' + projectID + "&formID=" + formID
    })
  },

  //新增产值
  addConfirmValue() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/outputvalregister/outputvalregister?title=新增产值&projectID=' + projectID,
    })
  },

  uploadFile() {
    wx.navigateTo({
      url: '/pages/uploadfile/uploadfile',
    })
  },

  // 财务金额格式化
  getMoneyFormat(val) {
    if (val === null) {
      return "0.00";
    }
    var str = parseInt(val).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf("."));
    var ret = intSum + dot;
    return ret;
  },
  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    return date;
  },
})