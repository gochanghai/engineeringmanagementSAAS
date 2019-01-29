// pages/confirmvalue/confirmvalue.js
const progressJS = require('../../action/progress.js');
Page({
  data: {

  },

  onLoad: function(options) {

    // 获取项目ID
    this.setData({
      projectID: options.projectID,
      totalAmount: this.getMoneyFormat(options.totalAmount),
    });

    // 获取产值数据
    this.getOutValueDatas();
  },

  // 获取产值函数
  getOutValueDatas() {
    let _this = this
    let projectID = this.data.projectID;
    progressJS.getConfirmValueList(projectID, function(res) {
      console.log(res);
      // 格式化数据      
      for (let index in res) {        
        res[index].confirmAt = _this.dateFormat2(res[index].confirmAt);
        res[index].outputValue2 = _this.getMoneyFormat(res[index].outputValue);
        res[index].receivableAmount2 = _this.getMoneyFormat(res[index].receivableAmount);
      }
      _this.setData({
        list: res,
      });
    })
  },

  // 跳转到登记产值
  confirmRegistration(e) {
    let projectID = this.data.projectID;
    let item = e.currentTarget.dataset.index
    let receivableAmount = item.receivableAmount;
    let outputValue = item.outputValue;
    let valueUploadAt = this.dateFormat2(item.valueUploadAt);
    let confirmAt = item.confirmAt;
    let formId = item.formId;
    let progressNodeID = item.progressNodeID;
    let ownerPayTime = item.ownerPayTime;
    let objectId = item.objectId;
    wx.navigateTo({
      url: '/pages/outputvalregister/outputvalregister?projectID=' + projectID +
        "&receivableAmount=" + receivableAmount +
        "&outputValue=" + outputValue +
        "&valueUploadAt=" + valueUploadAt +
        "&formId=" + formId +
        "&confirmAt=" + confirmAt +
        "&progressNodeID=" + progressNodeID +
        "&ownerPayTime=" + ownerPayTime +
        "&objectId=" + objectId,
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