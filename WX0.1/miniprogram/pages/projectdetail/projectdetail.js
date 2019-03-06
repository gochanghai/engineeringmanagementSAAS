// pages/projectdetail/projectdetail.js
const projectSaaSAction = require('../../backend/saasAction/projectAction.js');
Page({
  data: {
    modalDialog: false,
    projectIntroduce: {},
    projectModule: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      projectID: options.id,
      projectNO: options.no,
      projectAName: options.name,
      usablemoney: this.getMoneyFormat(this.data.usablemoney),
      projectmargin: this.getMoneyFormat(this.data.projectmargin)
    })
    this.getCurrentProject(options.id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCurrentProject(this.data.projectID);
  },

  //获取单个项目详情的数据
  getCurrentProject(projectID) {
    var _than = this;
    // (顶部弹框)
    projectSaaSAction.getProjectInfo(projectID, function(res) {
      console.log(res);
      let amount = _than.getMoneyFormat(res.contractamount);          
      console.log('getProjectInfoRes');      
      _than.setData({
        projectIntroduce: res,
        'projectIntroduce.contractamount': amount
      })
    });

    projectSaaSAction.getModuleInfo(projectID, function(res) {
      console.log('getModuleInfoRes');
      console.log(res);
      // 金额转财务数据
      res.usablemoney = _than.getMoneyFormat(res.usablemoney);
      res.marginmoney = _than.getMoneyFormat(res.marginmoney);
      res.confirmvalueratio = _than.getMunberToRatio(res.confirmvalueratio);
      res.receivableamountratio = _than.getMunberToRatio(res.receivableamountratio);
      res.receivedpayratio = _than.getMunberToRatio(res.receivedpayratio);
      _than.setData({
        projectModule: res
      })
    })
  },

  //未交底/未教育/未参保页
  personnerFile(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/uploadfile/uploadfile?fileSign=' + type + '&projectID=' + this.data.projectID,
    })
  },

  //已交底/已教育/已参保页
  personnerAlready(e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: "/pages/confirmpersonnel/confirmpersonnel?fileSign=" + type + '&projectID=' + this.data.projectID,
    })
  },

  //产值页
  confirmValue() {
    wx.navigateTo({
      url: '/pages/confirmvalue/confirmvalue?projectID=' + this.data.projectID + '&contractamount=' + this.data.projectIntroduce.contractamount,
    })
  },

  //回款页
  receivable() {
    wx.navigateTo({
      url: '/pages/receivable/receivable?projectID=' + this.data.projectID + '&contractamount=' + this.data.projectIntroduce.contractamount,
    })
  },

  //人员/班组页
  navPersonnel(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/managepersonnel/managepersonnel?typeID=' + type + '&projectID=' + this.data.projectID,
    })
  },

  //消息页
  messageCenter() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },

  //项目设置页
  projectSet() {
    let projectID = this.data.projectID;
    let contractInfo = {
      contractNo: this.data.projectIntroduce.code,
      startDate: this.data.projectIntroduce.startdate,
      endDate: this.data.projectIntroduce.enddate,
      contractAmount: this.data.projectIntroduce.contractamount,
    };
    wx.navigateTo({
      url: '/pages/projectsetting/projectsetting?projectID=' + projectID + '&contractInfo=' + JSON.stringify(contractInfo),
    })
  },

  //项目节点页
  projectNode() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/projectnode/projectnode?projectID=' + projectID,
    })
  },

  //申报时间页
  declareTime() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/declaretime/declaretime?projectID=' + projectID,
    })
  },

  //关闭窗口模态框
  closeFun() {
    this.setData({
      modalDialog: false
    })
  },

  //打开窗口模态框
  detailsFun() {
    this.setData({
      modalDialog: true
    })
  },

  //财务金额格式化
  getMoneyFormat(val) {
    var str = parseInt(val).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf("."));
    var ret = intSum + dot;
    return ret;
  },
  // 获取数值百分比
  getMunberToRatio(val) {
    if (val > 0) {      
      return (val * 100).toFixed(2);
    }
    return 0.00;
  },

})