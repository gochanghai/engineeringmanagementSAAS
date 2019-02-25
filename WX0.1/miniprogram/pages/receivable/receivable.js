// pages/receivable/receivable.js
const receivepaylinesSaaSAction = require('../../backend/saasAction/receivepaylinesAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(options) {
    // 获取项目ID
    this.setData({
      projectID: options.projectID,
      totalAmount: options.contractamount,
    });
    this.getDateList(this.data.projectID);
  },

  // 回款列表
  getDateList(projectID){
    let _than = this;
    receivepaylinesSaaSAction.getLinesList(projectID, function (res) {
      console.log(res);
      let list = [];
      for (let index in res) {
        let item = {
          returnDate: _than.dateFormat2(res[index].date),
          returnAmount: _than.getMoneyFormat(res[index].amount),
          id: res[index].id,
        };
        list.push(item);
      }
      _than.setData({
        list: list,
      });
    })
    
  },

  // 跳转到登记回款
  receivableRegistration(e) {
    let projectID = this.data.projectID;
    let formId = item.formId;
    wx.navigateTo({
      url: '/pages/receivableregistration/receivableregistration?projectID=' + projectID +
        "&formId=" + formId,
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