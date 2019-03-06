// pages/projectsetting/projectsetting.js
const projectManageAction = require('../../backend/manageAction/projectManageAction.js');
Page({
  data: {
    contractInfo: {},
    ownerPayPercent: 0.8,
    ownerPayTime: 25,
    ownerApprovalTime: 10,
    projectID: '',
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    let contractInfo = JSON.parse(options.contractInfo);
    this.setData({
      projectID: projectID,
      contractInfo: contractInfo
    });

    // 获取项目设置信息
    this.getContractInfo(this.data.projectID);
  },

  // 获取项目设置信息
  getContractInfo(projectID) {
    var _than = this;
    projectManageAction.getManageInfo(projectID, function(res) {
      console.log(res);
      _than.setData({
        projectAbbreviation: res.projectabbreviation,
        projectName: res.projectname,
        ownerPayPercent: res.ownerpaypercent,
        ownerPayTime: res.ownerpaytime,
        ownerApprovalTime: res.ownerapprovaltime,
      })
    })
  },

  // 项目简称输入
  inputProjectAbbreviation(e){
    this.setData({
      projectAbbreviation: e.detail.value
    })
  },
  
  // 业务审批付款周期输入
  inputOwnerPayTime(e) {
    this.setData({
      ownerPayTime: e.detail.value
    })
  },
  // 付款比例输入
  inputOwnerPayPercent(e) {
    this.setData({
      ownerPayPercent: e.detail.value / 100
    })
  },
  // 业务审批进度周期输入
  inputOwnerApprovalTime(e) {
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

    let projectID = this.data.projectID;
    // 合同信息
    let contractInfo = {
      ownerpaypercent: this.data.ownerPayPercent,
      ownerpaytime: this.data.ownerPayTime,
      ownerapprovaltime: this.data.ownerApprovalTime,
      projectabbreviation: this.data.projectAbbreviation,
      projectname: this.data.projectname,
    };

    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          //提交合同信息
          projectManageAction.updateManageInfo(contractInfo, projectID, function(res) {
            console.log(res)
            if (res.code > 0) {
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1200)
                }
              })
            } else {
              wx.showModal({
                content: '设置失败',
                showCancel: false,
                confirmColor: '#F0880C'
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