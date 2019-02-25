// pages/receivableregistration/receivableregistration.js
Page({
  data: {
    planReceivAt: '请选择日期',
    theoryReceivAmount: '',
    actualReceivAmount: '',
    actualReceivAt: new Date,
    fileName: "未选择文件",
    uploadFilePath: '',
    fileList: []
  },

  onLoad: function(options) {
    let _this = this;
    // 获取项目ID
    this.setData({
        projectID: options.projectID,
      formId: options.formId,
    })

    // 从消息处理进入 获取回款信息
    this.getRecievedpay();

    // 获取附件列表
    let fileInfo = {
      projectID: this.data.projectID,
      formName: 'recievedpay',
      belongIdList: this.data.formId,
      fileBelong: '回款'
    }    
  },

  // 获取回款信息
  getRecievedpay(){
    let _this = this;
  },
  

  // 计划回款时间输入
  InputPlanReceivAt(e) {
    // console.log(e.detail.value);
    this.setData({
      planReceivDate: e.detail.value
    })
  },
  // 本期可收款金额输入
  InputTheoryReceivAmount(e) {
    // console.log(e.detail.value);
    this.setData({
      theoryReceivAmount: e.detail.value
    })
  },
  // 回款金额输入
  InputActualReceivAmount(e) {
    // console.log(e.detail.value);
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
    var _this = this;
    // 判断回款金额是否为空
    if (this.data.actualReceivAmount == "" || this.data.actualReceivAmount == null) {
      wx.showModal({
        title: '提示',
        content: '回款金额不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 设置要提交的数据
    let recievedpay = {
      projectID: this.data.projectID,
      formId: this.data.formId,
      actualReceivAmount: this.data.actualReceivAmount,
      actualReceivAt: this.data.actualReceivAt,
    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 更新回款登记   
          let fileInfo = {
            file: _this.data.uploadFilePath,
            fileName: _this.data.uploadFilePath.replace("http://tmp/", ""),
          };
          // fileProgressJS.comitFileANDRecievedpay(recievedpay, fileInfo, function(res) {
          //   console.log(res);
          //   if (res.code == 1) {
          //     wx.showToast({
          //       title: '提交成功',
          //       icon: 'success',
          //       duration: 2000,
          //       success() {
          //         setTimeout(() => {
          //           wx.navigateBack({
          //             delta: '1'
          //           })
          //         }, 1000)
          //       }
          //     })
          //   } else {
          //     wx.showToast({
          //       title: '提交失败',
          //       icon: 'success',
          //       duration: 2000,
          //       success() {
          //         setTimeout(() => {
          //           wx.navigateBack({
          //             delta: '1'
          //           })
          //         }, 1000)
          //       }
          //     })
          //   }
          // })
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
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          uploadFilePath: tempFilePaths[0],
          fileName: tempFilePaths[0].replace("http://tmp/", "")
        })
      },
    })
  },
  // 时间格式化
  dateFormat(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    return date;
  },
})