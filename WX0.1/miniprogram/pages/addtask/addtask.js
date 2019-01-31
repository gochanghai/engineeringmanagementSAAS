// pages/addtask/addtask.js
const addtaskJS = require('../../action/addtask.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionNameHidden: true,
    actionTypeHidden: true,
    actionAskHidden: true,
    actionUserHidden: true,
    AskList: ["请立即处理", "三天内处理", "一周内处理"],
    messageTypeList: [
      { type: 'confirmvalue', name: '产值'},
      { type: 'progress', name: '进度' },
      { type: 'recievedpay', name: '回款' },
      { type: 'security', name: '安全' },
      { type: 'insurance', name: '保险' },
      { type: 'education', name: '安全教育' },
      { type: 'disclose', name: '安全交底'},
    ],
    assignUserList: [{
      userName: "test1",
      userAccount: 'test1'
    }],
    selName: '腾讯大厦',
    messageModule: '进度',
    messageDemand: '请立即处理',
    taskContent: '',
    selUser: "",
    pointToAccount: '',
    projectNameList: [{
      projectName: "腾讯大厦",
      ProjectID: 'sh-001'
    }],
  },

  onLoad: function(options) {
    let _this = this;
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
      selName: options.projectAbbreviation,
    });
    // 获取项目管理人员
    addtaskJS.getAssignUser(projectID, function(res) {
      // console.log(res);
      _this.setData({
        assignUserList: res,
      });
    })
  },

  //任务板块
  actionTypeTap: function(e) {
    this.setData({
      actionTypeHidden: !this.data.actionTypeHidden
    })
  },

  hiddenTypeFun: function() {
    this.setData({
      actionTypeHidden: !this.data.actionTypeHidden
    })
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  selType: function(e) {
    // console.log(e)
    this.setData({
      messageModuleName: e.currentTarget.dataset.name,
      messageModule: e.currentTarget.dataset.type,
      actionTypeHidden: !this.data.actionTypeHidden
    })
  },

  //处理
  actionAskTap: function() {
    this.setData({
      actionAskHidden: !this.data.actionAskHidden
    })
  },

  hiddenAskFun: function() {
    this.setData({
      actionAskHidden: !this.data.actionAskHidden
    })
  },

  // 任务内容输入
  inputTaskContent: function(e) {
    this.setData({
      taskContent: e.detail.value,
    })
  },
  // 
  selAsk: function(e) {
    this.setData({
      messageDemand: e.currentTarget.dataset.name,
      actionAskHidden: !this.data.actionAskHidden
    })
  },
  //指派用户
  actionUserkTap: function() {
    if (this.data.assignUserList.length != 0) {
      this.setData({
        actionUserHidden: !this.data.actionUserHidden
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先选择项目名称',
      })
    }
  },

  hiddenUserFun: function() {
    this.setData({
      actionUserHidden: !this.data.actionUserHidden
    })
  },

  selUser: function(e) {
    // console.log(e.currentTarget);
    this.setData({
      selUser: e.currentTarget.dataset.user,
      pointToAccount: e.currentTarget.dataset.account,
      actionUserHidden: !this.data.actionUserHidden
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
    if (this.data.pointToAccount == ''){
      wx.showModal({
        title: '提示',
        content: '指派用户不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    let taskInfo = {
      projectID: this.data.projectID,
      messageModule: this.data.messageModule,
      pointToAccount: this.data.pointToAccount,
      message: this.data.taskContent,
      messageDemand: this.data.messageDemand,
    };
    wx.showModal({
      title: '提示',
      content: '确定新建吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 提交任务          
          addtaskJS.postTask(taskInfo, function(res) {
            console.log(res);
          })
          wx.showToast({
            title: '新建成功',
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})