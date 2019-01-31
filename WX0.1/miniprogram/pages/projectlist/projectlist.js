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
      // console.log(projectList);
      // 格式化财务数据
      for (let index in projectList) {
        projectList[index].outputValue1 = _this.getMoneyFormat(projectList[index].outputValue);
        projectList[index].receivableAmount1 = _this.getMoneyFormat(projectList[index].receivableAmount);
        projectList[index].actualReceivAmount1 = _this.getMoneyFormat(projectList[index].actualReceivAmount);
        projectList[index].totalAmount1 = _this.getMoneyFormat(projectList[index].totalAmount);
        projectList[index].dealMessage = projectList[index].allmessage - projectList[index].notdealmessage;
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

  //进入人员列表
  navManager(event) {
    let type = event.currentTarget.dataset.type;
    let projectID = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/managepersonnel/managepersonnel?typeID=' + type + "&projectID=" + projectID
    })
  },

  //进入安全人员列表
  navSecurity(e) {
    // console.log(e.currentTarget.dataset.type);
    let projectID = e.currentTarget.dataset.index;
    let byTypeTitle = "";
    let fileSign = '';
    let txt = e.currentTarget.dataset.type;
    // 区分人员类型
    switch (txt) {
      case "0":
        // 设置附件上传的页面标题
        byTypeTitle = "上传附件-安全技术交底";
        fileSign = 'disclose';
        break;
      case "1":
        byTypeTitle = "上传附件-三级安全教育";
        fileSign = 'education';
        break;
      case "2":
        byTypeTitle = "上传附件-工伤意外保险";
        fileSign = 'insurance';
    }
    wx.navigateTo({
      url: '/pages/uploadfile/uploadfile?byTypeTitle=' + byTypeTitle +
        '&projectID=' + projectID +
        '&fileSign=' + fileSign,
    })
  },

  //进入总产值
  navConfirmVal(event) {
    let totalAmount = event.currentTarget.dataset.type;
    let projectID = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/confirmvalue/confirmvalue?projectID=' + projectID + "&totalAmount=" + totalAmount,
    })
  },

  //进入已回款
  navReceivble(event) {
    let totalAmount = event.currentTarget.dataset.type;
    let projectID = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/receivable/receivable?projectID=' + projectID + "&totalAmount=" + totalAmount,
    })
  },

  //消息中心
  openMessage(event) {
    let type = event.currentTarget.dataset.type;
    let projectID = event.currentTarget.dataset.index;
    wx.switchTab({
      url: "/pages/message/message"
    })
  }
})