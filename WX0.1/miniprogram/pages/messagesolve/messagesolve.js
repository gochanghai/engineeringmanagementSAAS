// pages/messagesolve/messagesolve.js
const messageCenterAction = require('../../backend/manageAction/messageCenterAction.js');
Page({
  data: {
    // 消息体
    message: {}
  },

  onLoad: function (options) {    
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
        createAt: _than.dateFormat(res.createat),
        pointToID: res.pointtoid,
        pointUser: res.pointtomanager,
        projectAbbreviation: res.projectabbreviation,
        status: res.status,
        messageModule: res.messagemodule,
        messageDemand: res.messagedemand,
      });
      //根据任务 or 消息来设置当前页面的标题
      if (res.messagetype == 'task') {
        wx.setNavigationBarTitle({
          title: '任务详情'
        })
      }
    })  
  },

  
  //消息忽略
  mesDeal() {
    let moduleContent = '您确定忽略此消息吗？';
    if (this.data.messageType === "task"){
      moduleContent = '您确定忽略此任务吗？';
    }
    // 调用忽略消息函数
    this.neglectMessage(moduleContent, '已忽略');
  },

  // 任务已处理函数
  handled(){
      // 调用忽略消息函数
    this.neglectMessage('您确定此任务已处理过了吗？', '已处理');
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

  // 忽略消息函数
  neglectMessage(moduleContent, toastTitle){
    let projectID = this.data.projectID;
    let formID = this.data.formID;
    let messageModule = this.data.messageModule;
    wx.showModal({
      title: '提示',
      content: moduleContent,
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          // 消息忽略          
          messageCenterAction.mesIgnore(projectID, formID, messageModule, function (res) {
            console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: toastTitle,
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

  // 时间格式化 2019-01-24
  dateFormat(val) {
    if (val === null || val === '') {
      return "未知";
    }
    if (val.length >= 10) {
      return val.substring(0, 10);
    }
    return val;
  },
})