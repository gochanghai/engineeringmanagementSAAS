// pages/receivableregistration/receivableregistration.js
const recievedPayJS = require('../../action/recievedpay.js');
Page({

  data: {
    planReceivAt: '请选择日期',
    theoryReceivAmount: '',
    actualReceivAmount: '', 
    fileName:"未选择文件"
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    // 判断数据是否为空
    let theoryReceivAmount = 0.00;
    if (options.theoryReceivAmount != null) {
      theoryReceivAmount = options.theoryReceivAmount
    }
    let actualReceivAmount = 0.00;
    if (options.actualReceivAmount != null) {
      actualReceivAmount = options.actualReceivAmount
    }
    this.setData({
      projectID: projectID,
      formId: options.formId,
      actualReceivAmount: actualReceivAmount,
      theoryReceivAmount: theoryReceivAmount,
      planReceivDate: options.planReceivDate,
    })
  },

  // 计划回款时间输入
  InputPlanReceivAt(e) {
    console.log(e.detail.value);
    this.setData({
      planReceivDate: e.detail.value
    })
  },
  // 本期可收款金额输入
  InputTheoryReceivAmount(e) {
    console.log(e.detail.value);
    this.setData({
      theoryReceivAmount: e.detail.value
    })
  },
  // 回款金额输入
  InputActualReceivAmount(e) {
    console.log(e.detail.value);
    this.setData({
      actualReceivAmount: e.detail.value
    })
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  //提交数据
  commitReceivable() {
    let recievedpay = {};
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 更新回款登记          
          recievedPayJS.updateRecievedpay(recievedpay, function(res) {
            console.log(res);
          })
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 上传附件
  uploadFile() {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9
      sourceType: ['album', 'camera'], // 来源是相册、相机
      success: function(res) {
        console.log(res);
      },
    })
  }
})