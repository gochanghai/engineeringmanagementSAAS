// pages/messagesolve/messagesolve.js
const messageCenterAction = require('../../backend/manageAction/messageCenterAction.js');
Page({
  data: {
    // 消息体
    message: {}
  },

  onLoad: function (options) {
    //根据任务 or 消息来设置当前页面的标题
    wx.setNavigationBarTitle({
      title: options.byTypeTitle
    })
    this.setData({
      formID: options.formID,
      projectID: options.projectID,
    })

    this.getMessage(options.formID, options.projectID);
  },

  // 获取消息信息
  getMessage(formID, projectID) {
    let _than = this;
    messageCenterAction.getMessagePage(formID, projectID, function (res) {
      console.log('bmessageInfo');
      console.log(res);
      _than.setData({
        message: res.message,
        messageType: res.messagetype,
        createAt: res.projectabbreviation,
        pointToID: res.pointtoid,
        projectAbbreviation: res.projectabbreviation,
        status: res.status,
        messageModule: res.messagemodule,
        messageDemand: res.messagedemand,
      })
    })


  },

  //消息忽略
  mesDeal() {
    let projectID = this.data.projectID;
    let formID = this.data.formID;
    let messageModule = this.data.messageModule;
    // console.log(message);
    wx.showModal({
      title: '提示',
      content: '确定忽略此消息吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          // 消息忽略          
          messageCenterAction.mesIgnore(projectID, formID, messageModule, function (res) {
            console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: '已忽略',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                    // 返回消息中心
                    wx.switchTab({
                      url: '/pages/message/message',
                    })
                  }, 1000)
                }
              })
            } else {
              wx.showToast({
                title: '忽略失败',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                    // 返回消息中心
                    // wx.switchTab({
                    //   url: '/pages/message/message',
                    // })
                  }, 1000)
                }
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  //消息处理(跳转到产值登记、回款登记或人员列表)
  mesSolve() {
    let _this = this;
    // 判断是否是产值消息
    if (_this.data.messageModule == "confirmvalue") {
      wx.navigateTo({
        url: '/pages/outputvalregister/outputvalregister?projectID=' + _this.data.projectID +
          "&formID=" + _this.data.formID
      })
    }
    // 判断是否是回款消息
    if (_this.data.messageModule == "recievedpay") {
      wx.navigateTo({
        url: '/pages/receivableregistration/receivableregistration?projectID=' + _this.data.projectID +
          "&formID=" + _this.data.formID
      })
    }

    // 判断是否是安全消息
    if (_this.data.messageModule == "insurance" || _this.data.messageModule == "education" || _this.data.messageModule == "disclose") {
      let byTypeTitle;
      let fileSign;
      //  区分保险消息、安全教育消息、安全交底消息
      if (_this.data.messageModule == "insurance") {
        // 设置页面标题
        byTypeTitle = "上传附件-工伤意外保险";
        // 安全的消息类型
        fileSign = 'insurance';
      } else if (_this.data.messageModule == "education") {
        byTypeTitle = "上传附件-三级安全教育";
        fileSign = 'education';
      } else if (_this.data.messageModule == "disclose") {
        byTypeTitle = "上传附件-安全技术交底";
        fileSign = 'disclose';
      }
      wx.navigateTo({
        url: '/pages/uploadfile/uploadfile?projectID=' + _this.data.projectID +
          '&fileSign=' + fileSign,
      })
    }
  },
})