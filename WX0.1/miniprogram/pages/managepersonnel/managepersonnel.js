// pages/managepersonnel/managepersonnel.js
const personnelAction = require('../../backend/manageAction/personnelAction.js');
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
  onPullDownRefresh: function() {
    this.onShow();
  },

  onLoad: function(options) {
    console.log("projectID" + options.projectID);
    let typeID = options.typeID;
    var _this = this;
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 90 + 'px',
      WinHeightCon: wx.getSystemInfoSync().windowHeight - 136 + 'px',
      swiperIndex: options.typeID,
      projectID: options.projectID,
    });
    this.getManagerList();
    this.getConstructionList();
    this.getGroupList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let projectID = this.data.projectID;
    this.getManagerList();
    this.getConstructionList();
    this.getGroupList();
  },

  // 获取管理人员列表
  getManagerList() {
    let _than = this;
    let projectID = this.data.projectID;
    personnelAction.getManagerList(projectID, function(res) {
      console.log(res);
      console.log("managerlist");
      let list = [];
      for (let index in res) {
        let item = {
          id: index,
          name: res[index].managername,
          position: res[index].managertype,
          telePhone: _than.phoneFormat(res[index].telphoneno),
        }
        list.push(item);
      }
      _than.setData({
        managerList: list
      })
    })

  },
  // 获取施工人员列表
  getConstructionList() {
    let _than = this;
    let projectID = this.data.projectID;
    personnelAction.getConstructionList(projectID, function(res) {
      console.log('getConstructionList');
      console.log(res);
      let list = [];
      for (let index in res) {
        let item = {
          id: index,
          name: res[index].name,
          groupName: _than.isNullReturnNnknown(res[index].groupname),
          enterDate: _than.dateFormat2(res[index].admissionat),
          telePhone: _than.phoneFormat(res[index].telno),
          repay: res[index].repay,
          age: res[index].age,
        }
        list.push(item);
      }
      _than.setData({
        constructionList: list,
      })
    })

  },
  // 获取班组列表
  getGroupList() {
    let _than = this;
    let projectID = this.data.projectID;
    personnelAction.getGroupList(projectID, function(res) {
      console.log('getGroupList');
      console.log(res);
      let list = [];
      for (let index in res) {
        let item = {
          id: res[index].formid,
          groupName: res[index].groupname,
          totalNumber: res[index].totalnumber,
          insuranceFileSign: res[index].insurancefilesign,
          educationFileSign: res[index].educationfilesign,
          discloseFileSign: res[index].disclosefilesign,
        }
        list.push(item);
      }
      _than.setData({
        groupList: list
      })
    })
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
  },

  // 手机号码格式化 134-4444-5555
  phoneFormat: function (val) {
    if (val === null) {
      return "未知";
    }
    if (val.length === 11) {
      let a1 = val.substring(0, 3);
      let a2 = val.substring(3, 7);
      let a3 = val.substring(7, 11);
      // console.log(date);
      return a1 + '-' + a2 + '-' + a3;
    }
    return val;
  },
})