// pages/projectview/projectview.js
const projectlistJS = require('../../action/projectlist.js');
const messageCenterJS = require('../../action/messageCenter.js');
Page({
  data: {
    scrollLeft: "0",
    scrollY: false,
    itemWidth: '10000px',
    progressRadius: '40',
    swiperIndex: 0,
    projectList: [{
      id: 0,
      projectName: '腾讯大厦',
    }, {
      id: 1,
      projectName: '汉京大厦',
    }, {
      id: 2,
      projectName: '达实二扩',
    }],

    activeList: {
      imagesel: '/images/building_sel.png',
      image: '/images/building_nor.png',
      color: '#fff',
      fontSize: '27rpx'
    },
    banMove: 'ban-move'
  },

  //下拉刷新
  onPullDownRefresh: function() {
    // 获取项目列表数据
    // this.getProjectList();
  },

  onLoad: function(options) {
    var _this = this;

    // 获取项目列表数据
    this.getProjectList();
  },

  // 获取项目列表数据
  getProjectList() {
    var _this = this;
    projectlistJS.getProjectList(function(res) {
      var projectList = res;
      console.log(projectList);
      console.log(projectList.length);
      console.log("projectPageList" + projectList);
      _this.setData({
        projectList: projectList,
        itemWidth: (260 * projectList.length + 'rpx').toString()
      });

      // 获取选中的项目信息
      let projectInfo = _this.data.projectList[_this.data.swiperIndex];
      _this.setData({
        projectInfo: projectInfo
      });
    })
  },

  selProject(event) {
    let index = event.currentTarget.dataset.index;
    if (index >= 2) {
      this.setData({
        scrollLeft: 98 + (index - 2) * 110
      })
    }
    let projectInfo = this.data.projectList[index];
    this.setData({
      swiperIndex: index,
      projectInfo: projectInfo
    })
  },

  currentFun(event) {
    this.setData({
      swiperIndex: event.detail.current,
      scrollLeft: 98 + (event.detail.current - 2) * 110
    })
  },

  navPersonnel(event) {
    let mtype = event.currentTarget.dataset.type;
    // 获取选择的项目ID
    let projectID = this.data.projectList[this.data.swiperIndex].projectID;
    console.log("projectID" + projectID);
    wx.navigateTo({
      url: '/pages/managepersonnel/managepersonnel?typeID=' + mtype + "&projectID=" + projectID
    })
  },

  catchTouchMove(res) {
    return false
  },

  addProject() {
    wx.navigateTo({
      url: '/pages/addproject/addproject',
    })
  },

  // 跳转到项目设置
  projectSet() {
    // 获取选择的项目ID
    let projectID = this.data.projectList[this.data.swiperIndex].projectID;
    wx.navigateTo({
      url: '/pages/projectsetting/projectsetting?projectID=' + projectID,
    })
  },

  // 跳转到工程节点设置
  projectNode() {
    // 获取选择的项目ID
    let projectID = this.data.projectList[this.data.swiperIndex].projectID;
    wx.navigateTo({
      url: '/pages/projectnode/projectnode?projectID=' + projectID,
    })
  },

  // 跳转到申报时间设置
  declareTime() {
    // 获取选择的项目ID
    let projectID = this.data.projectList[this.data.swiperIndex].projectID;
    wx.navigateTo({
      url: '/pages/declaretime/declaretime?projectID=' + projectID,
    })
  },

  // 查看产值明细
  confirmValue(event) {
    let projectID = event.currentTarget.dataset.index;
    let totalAmount = event.currentTarget.dataset.type;
    console.log(projectID);
    wx.navigateTo({
      url: '/pages/confirmvalue/confirmvalue?projectID=' + projectID + "&totalAmount=" + totalAmount,
    })
  },
  // 查看回款明细
  receivable(event) {
    let projectID = event.currentTarget.dataset.index;
    let totalAmount = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/receivable/receivable?projectID=' + projectID + "&totalAmount=" + totalAmount,
    })
  },

  messageCenter() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },

  // 跳转到附件上传页面
  personnerFile(e) {
    console.log(e.currentTarget.dataset.type);
    let projectID = e.currentTarget.dataset.index;
    let byTypeTitle = "";
    let fileSign = '';
    let txt = e.currentTarget.dataset.type;
    switch (txt) {
      case "0":
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
  }
})