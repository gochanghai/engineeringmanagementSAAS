// pages/receivable/receivable.js
const progressJS = require('../../action/progress.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(options) {

    let totalAmount = this.getMoneyFormat(options.totalAmount)
    // 获取项目ID
    this.setData({
      projectID: options.projectID,
      totalAmount: totalAmount
    });
    this.getRecievedPayDatas();
  },

  // 回款列表
  getRecievedPayDatas() {
    let _this = this
    let projectID = this.data.projectID;
    progressJS.getRecievedPayList(projectID, function(res) {
      // 格式化数据
      for (let index in res) {
        res[index].actualReceivAmount2 = _this.getMoneyFormat(res[index].actualReceivAmount);
        res[index].actualReceivDate = _this.dateFormat2(res[index].actualReceivAt);
        res[index].planReceivDate = _this.dateFormat2(res[index].planReceivAt);
      }
      _this.setData({
        list: res,
      })
    })
  },

  // 跳转到登记回款
  receivableRegistration(e) {
    let projectID = this.data.projectID;
    let item = e.currentTarget.dataset.index
    let formId = item.formId;
    let actualReceivAmount = item.actualReceivAmount;
    let planReceivDate = item.planReceivDate;
    let theoryReceivAmount = item.theoryReceivAmount;
    wx.navigateTo({
      url: '/pages/receivableregistration/receivableregistration?projectID=' + projectID +
        "&formId=" + formId +
        "&actualReceivAmount=" + actualReceivAmount +
        "&theoryReceivAmount=" + theoryReceivAmount +
        "&planReceivDate=" + planReceivDate,
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