// pages/messagesolve/messagesolve.js
const messageCenterJS = require('../../action/messageCenter.js');
const confirmvalueJS = require('../../action/confirmvalue.js');
const recievedPayJS = require('../../action/recievedpay.js');
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
    // let message = options.message;
    let _this = this;
    this.setData({
      message: options.message,
      messageType: options.messageType,
      createAt: options.createAt,
      formId: options.formId,
      projectID: options.projectID,
      pointToID: options.pointToID,
      projectAbbreviation: options.projectAbbreviation,
      status: options.status,
      messageModule: options.messageModule,
      messageDemand: options.messageDemand,
    })
  },

  //消息忽略
  mesDeal() {
    let message = {
      projectID: this.data.projectID,
      formId: this.data.formId,
      messageModule: this.data.messageModule,
    }
    // console.log(message);
    wx.showModal({
      title: '提示',
      content: '确定忽略此消息吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          // console.log('Commit');
          // 消息忽略          
          messageCenterJS.mesIgnore(message, function (res) {
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
                // 返回消息中心
                wx.switchTab({
                  url: '/pages/message/message',
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

    // 判断是否是产值消息
    if (_this.data.messageModule == "confirmvalue") {
      confirmvalueJS.getConfirmvalue(_this.data.pointToID, function (confirmvalueInfo) {
        if ('' != confirmvalueInfo && null != confirmvalueInfo);
        wx.navigateTo({
          url: '/pages/outputvalregister/outputvalregister?projectID=' + confirmvalueInfo.projectID +
            "&receivableAmount=" + confirmvalueInfo.receivableAmount +
            "&ownerPayPercent=" + confirmvalueInfo.ownerPayPercent +
            "&outputValue=" + confirmvalueInfo.outputValue +
            "&valueUploadAt=" + confirmvalueInfo.valueUploadAt +
            "&formId=" + confirmvalueInfo.formId +
            "&confirmAt=" + confirmvalueInfo.confirmAt +
            "&progressNodeID=" + confirmvalueInfo.progressNodeID +
            "&ownerPayTime=" + confirmvalueInfo.ownerPayTime +
            "&objectId=" + confirmvalueInfo.objectId,
        })
      });
    }
    // 判断是否是回款消息
    if (_this.data.messageModule == "recievedpay") {
      recievedPayJS.getRecievedpay(_this.data.pointToID, function (recievedpayInfo) {
        console.log('recievedpayInfo');
        console.log(recievedpayInfo);
        if ('' != recievedpayInfo && null != recievedpayInfo) {
          wx.navigateTo({
            url: '/pages/receivableregistration/receivableregistration?projectID=' + recievedpayInfo.projectID +
              "&formId=" + recievedpayInfo.formId +
              "&actualReceivAmount=" + recievedpayInfo.actualReceivAmount +
              "&theoryReceivAmount=" + recievedpayInfo.theoryReceivAmount +
              "&planReceivDate=" + recievedpayInfo.planReceivDate +
              "&actualReceivAt=" + recievedpayInfo.actualReceivAt +
              "&objectId=" + recievedpayInfo.objectId,
          })
        }
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
        url: '/pages/uploadfile/uploadfile?byTypeTitle=' + byTypeTitle +
          '&projectID=' + _this.data.projectID +
          '&fileSign=' + fileSign,
      })
    }
  },
})