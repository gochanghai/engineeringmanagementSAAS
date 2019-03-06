// pages/addtask/addtask.js
const addtaskAction = require('../../backend/manageAction/addtaskAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex1: 0,
    activeIndex2: 0,
    activeIndex3: 0,
    AskList: ["请立即处理", "三天内处理", "一周内处理"],
    messageTypeList: [
      // {
      //   type: 'confirmvalue',
      //   name: '产值'
      // },
      {
        type: 'progress',
        name: '进度'
      },
      // {
      //   type: 'recievedpay',
      //   name: '回款'
      // },
      {
        type: 'security',
        name: '安全'
      },
      // {
      //   type: 'insurance',
      //   name: '保险'
      // },
      // {
      //   type: 'education',
      //   name: '安全教育'
      // },
      // {
      //   type: 'disclose',
      //   name: '安全交底'
      // },
    ],
    assignUserList: [],
    selName: '',
    messageModule: 'confirmvalue',
    messageDemand: '请立即处理',
    taskContent: '',
    selUser: "",
    pointToAccount: '',
  },

  onLoad: function(options) {
    let _than = this;
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: options.projectID,
      selName: options.projectAbbreviation,
    });
    // 获取项目管理人员
    addtaskAction.getAssignUser(projectID, function(bassignUser) {
      console.log('bassignUser');
      console.log(bassignUser);
      _than.setData({
        assignUserList: bassignUser,
        pointToAccount: bassignUser[0].manageraccount,
      })
    })
  },

  //取消/返回
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  //任务板块
  selType: function(e) {
    var index = e.detail.value;
    this.setData({
      messageModuleName: this.data.messageTypeList[index].name,
      messageModule: this.data.messageTypeList[index].type,
      activeIndex1: index
    })
  },

  // 任务内容输入
  inputTaskContent: function(e) {
    this.setData({
      taskContent: e.detail.value,
    })
  },

  // 任务要求
  selAsk: function(e) {
    var index = e.detail.value;
    this.setData({
      messageDemand: this.data.AskList[index],
      activeIndex2: index
    })
  },

  //指派用户
  selUser: function(e) {
    var index = e.detail.value;
    this.setData({
      selUser: this.data.assignUserList[index].managername,
      pointToAccount: this.data.assignUserList[index].manageraccount,
      activeIndex3: index
    })
  },

  //新建任务
  newTask() {
    // 判断任务内容是否为空
    if (this.data.taskContent == '') {
      wx.showModal({
        title: '提示',
        content: '任务内容不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 判断指派用户是否为空
    if (this.data.pointToAccount == '') {
      wx.showModal({
        title: '提示',
        content: '指派用户不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    let ftaskInfo = {
      projectid: this.data.projectID,
      messagemodule: this.data.messageModule,
      pointtoaccount: this.data.pointToAccount,
      message: this.data.taskContent,
      messagedemand: this.data.messageDemand,
    };
    wx.showModal({
      title: '提示',
      content: '确定新建吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 提交任务
          addtaskAction.postTask(ftaskInfo, function(res) {
            console.log(res);
            console.log(ftaskInfo);
            if(res.code == 1){
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1000)
                }
              })
            }else{
              wx.showToast({
                title: '提交失败',
                icon: 'fail',
                duration: 2000,
              })
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})