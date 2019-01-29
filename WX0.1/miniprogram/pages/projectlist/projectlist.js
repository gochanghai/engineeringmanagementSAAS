// pages/projectlist/projectlist.js
const projectlistJS = require('../../action/projectlist.js');
Page({

  data: {
    WinHeight: null
  },

  onLoad: function(options) {
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight + 'px',
    });
    // 获取项目列表数据
    this.getProjectList();
  },

  // 获取项目列表数据
  getProjectList() {
    var _this = this;
    projectlistJS.getProjectList(function(res) {
      var projectList = res;
      console.log(projectList);
      // 格式化财务数据
      for (let index in projectList) {
        projectList[index].outputValue = _this.getMoneyFormat(projectList[index].outputValue);
        projectList[index].receivableAmount = _this.getMoneyFormat(projectList[index].receivableAmount);
        projectList[index].actualReceivAmount = _this.getMoneyFormat(projectList[index].actualReceivAmount);
        projectList[index].totalAmount = _this.getMoneyFormat(projectList[index].totalAmount);
      }
      _this.setData({
        projectList: projectList,
      });
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

  //消息中心
  openMessage() {
    wx.switchTab({
      url: "/pages/message/message"
    })
  }
})