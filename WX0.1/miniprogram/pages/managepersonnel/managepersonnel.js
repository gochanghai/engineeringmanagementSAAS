// pages/managepersonnel/managepersonnel.js
const personnelJS = require('../../action/personnel.js');
Page({
  data: {
    swiperIndex: '0',
    WinHeight: '',
    WinHeightCon: '',
    activeTabs: 'line',
    managerList: [],
    groupList: [],
    constructionList: []
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.onShow();
  },

  onLoad: function(options) {
    // console.log(options.typeID);
    // console.log("typeID: " + options.typeID);
    // console.log("projectID" + options.projectID);
    let typeID = options.typeID;
    var _this = this;
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 90 + 'px',
      WinHeightCon: wx.getSystemInfoSync().windowHeight - 136 + 'px',
      swiperIndex: options.typeID,
      projectID: options.projectID,
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad();
    this.getDataList();
  },
  getDataList(){
    var _this = this;
    // 获取项目ID
    let projectID = this.data.projectID;
    // 获取管理人员数据
    let managerList;
    personnelJS.getManagerList(projectID, function (res) {
      managerList = res;
      // 格式化数据
      for (let index in managerList) {
        managerList[index].telphoneNo = _this.isNullReturnNnknown(managerList[index].telphoneNo);
      }
      _this.setData({
        managerList: managerList,
        projectID: projectID
      })
    });
    // 获取施工班组数据
    let groupList;
    personnelJS.getGroupList(projectID, function (res) {
      groupList = res;
      // console.log(groupList);
      _this.setData({
        groupList: groupList,
      })
    });
    // 获取施工人员数据
    let constructionList;
    personnelJS.getConstructionList(projectID, function (res) {
      constructionList = res;
      // console.log(constructionList);
      // 格式化数据
      for (let index in constructionList) {
        constructionList[index].admissionDate = _this.dateFormat2(constructionList[index].admissionAt);
        constructionList[index].telNo = _this.isNullReturnNnknown(constructionList[index].telNo);
        constructionList[index].repay = _this.isNullReturnNnknown(constructionList[index].repay);
      }
      _this.setData({
        constructionList: constructionList,
      })
    });
  },


  currentFun(event) {
    this.setData({
      swiperIndex: event.detail.current
    })
  },

  changTabs(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      swiperIndex: index
    })
  },

  //新增施工人员
  addWorkPersonnel() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/addworkpersonnel/addworkpersonnel?projectID=' + projectID,
    })
  },

  //新增班组
  addGroup() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/addgroup/addgroup?projectID=' + projectID,
    })
  },

  //新增管理人员
  addManager() {
    let projectID = this.data.projectID;
    wx.navigateTo({
      url: '/pages/addmanager/addmanager?projectID=' + projectID,
    })
  },

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null || val === '') {
      return "未知";
    }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  },
  // 判断是否为 null
  isNullReturnNnknown(val) {
    if (val === null || val === '') {
      return "未知";
    }
    return val;
  }
})