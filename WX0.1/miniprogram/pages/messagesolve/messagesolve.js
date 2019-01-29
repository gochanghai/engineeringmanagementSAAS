// pages/messagesolve/messagesolve.js
const messageCenterJS = require('../../action/messageCenter.js');
Page({

  data: {
    // 消息体
    message: {}
  },

  onLoad: function(options) {
    // let message = options.message;
    this.setData({
      message: options.message,
      messageType: options.messageType,
      createAt: options.createAt,
      formId: options.formId,
      projectID: options.projectID,
      messageModule: options.messageModule,
    })
  },

  //消息忽略
  mesDeal() {
    let message = {
      projectID: this.data.projectID,
      formId: this.data.formId,
    }
    console.log(message);
    wx.showModal({
      title: '提示',
      content: '确定忽略此消息吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 消息忽略          
          messageCenterJS.mesIgnore(message, function(res) {
            console.log(res);
          })
          wx.showToast({
            title: '已忽略',
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
          console.log('用户点击取消');
        }
      }
    })
  },

  //消息处理(跳转到产值登记、回款登记或人员列表)
  mesSolve() {
    let _this = this;
    if (_this.data.messageModule == "confirmvalue"){
      wx.navigateTo({
        url: '/pages/outputvalregister/outputvalregister?formId=' +  _this.data.formId + 
            "&projectID=" +  _this.data.projectID,
      });
    }

    if (_this.data.messageModule == "recievedpay") {
      wx.navigateTo({
        url: '/pages/receivableregistration/receivableregistration?formId=' + _this.data.formId +
          "&projectID=" + _this.data.projectID,
      });
    }

    if (_this.data.messageModule == "insurance") {
      let byTypeTitle = "上传附件-工伤意外保险";
      let fileSign = 'insurance';
      wx.navigateTo({
        url: '/pages/uploadfile/uploadfile?formId=' + _this.data.formId +
          "&projectID=" + _this.data.projectID +
          '&fileSign=' + fileSign +
          '&byTypeTitle=' + byTypeTitle,
      });
    }

    if (_this.data.messageModule == "education") {
      let byTypeTitle = "上传附件-三级安全教育";
      let fileSign = 'education';
      wx.navigateTo({
        url: '/pages/uploadfile/uploadfile?formId=' + _this.data.formId +
          "&projectID=" + _this.data.projectID +
          '&fileSign=' + fileSign +
          '&byTypeTitle=' + byTypeTitle,
      });
    }

    if (_this.data.messageModule == "disclose") {
      let byTypeTitle = "上传附件-安全技术交底";
      let fileSign = 'disclose';
      wx.navigateTo({
        url: '/pages/uploadfile/uploadfile?formId=' + _this.data.formId +
          "&projectID=" + _this.data.projectID+
          '&fileSign=' + fileSign +
          '&byTypeTitle=' + byTypeTitle,
      });
    }
  }
})