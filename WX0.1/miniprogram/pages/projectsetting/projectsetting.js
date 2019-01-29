// pages/projectsetting/projectsetting.js
const contractJS = require('../../action/contract.js');
Page({
  data: {
    updateLis: {
      startDate: "请选择日期",
      endDate: '请选择日期',
      ownerApprovalTime: ''
    }
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
    });

    // 获取项目合同信息
    this.getContractInfo();
  },

  // 获取项目合同信息函数
  getContractInfo() {
    let _this = this;
    let projectID = this.data.projectID;
    console.log(projectID);
    contractJS.getContractInfo(projectID, function(res) {
      console.log(res);
      _this.setData({
        contractAmount: res.contractAmount,
        projectName: res.projectName,
        startFrom: res.startFrom,
        endAt: res.endAt,
        contractNo: res.contractNo,
        ownerPayPercent: res.ownerPayPercent,
        ownerPayTime: res.ownerPayTime,
        ownerApprovalTime: res.ownerApprovalTime,
        projectAbbreviation: res.projectAbbreviation,
        status: res.status,
        objectId: res.objectId,
      })
    })
  },

  // 项目名称输入
  InputProjectName(e) {
    this.setData({
      projectName: e.detail.value
    })
  },
  // 合同编号输入
  InputContractNo(e) {
    this.setData({
      contractNo: e.detail.value
    })
  },
  // 合同起始时间输入
  InputStartFrom(e) {
    this.setData({
      startFrom: e.detail.value
    })
  },
  // 合同终止时间输入
  InputEndAt(e) {
    this.setData({
      endAt: e.detail.value
    })
  },
  // 合同金额输入
  InputContractAmount(e) {
    this.setData({
      contractAmount: e.detail.value
    })
  },
  // 业务审批付款周期输入
  InputOwnerPayTime(e) {
    this.setData({
      ownerPayTime: e.detail.value
    })
  },
  // 付款比例输入
  InputOwnerPayPercent(e) {      
    this.setData({
      ownerPayPercent: e.detail.value / 100
    })
  },
  // 业务审批进度周期输入
  InputOwnerApprovalTime(e) {
    this.setData({
      ownerApprovalTime: e.detail.value
    })
  },

  // 取消按钮
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  //设置成功
  commitProSetting() {
    let ownerPayPercent = this.data.ownerPayPercent;  
    if (ownerPayPercent < 0 || ownerPayPercent > 100) {
      wx.showModal({
        title: '提示',
        content: '付款比例不能小于0且不能大于100',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 合同信息
    let contractInfo = {
      // projectID: this.data.projectID,
      contractAmount: this.data.contractAmount,
      projectName: this.data.projectName,
      startFrom: this.data.startFrom,
      endAt: this.data.endAt,
      contractNo: this.data.contractNo,
      ownerPayPercent: this.data.ownerPayPercent,
      ownerPayTime: this.data.ownerPayTime,
      ownerApprovalTime: this.data.ownerApprovalTime,
      projectAbbreviation: this.data.projectAbbreviation,
      status: this.data.status,
      objectId: this.data.objectId,
    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          //提交合同信息
          contractJS.updateContract(contractInfo, function(res) {
            console.log(res)
          })
          wx.showToast({
            title: '设置成功',
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