// pages/addgroup/addgroup.js
const managerJS = require('../../action/manager.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    managerTypes: [{
      label: '项目经理',
      id: '0'
    }, {
      label: '安全员',
      id: '1'
    }, {
      label: '施工员',
      id: '2'
    }, {
      label: '材料员',
      id: '3'
    }, {
      label: '资料员',
      id: '4'
    }, {
      label: '质检员',
      id: '5'
    }],
    activeSty: 'color:#fff;border: 1px solid #FFA268;',
    activeSel: 'active-sel',
    activeIndex: '0',
    otherVis: true,
    managerType: '商经经理',
    managerName: '',
    telphoneNo: ''
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
    })
  },

  selTeam(e) {
    // console.log(e.currentTarget.dataset.type);
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    this.setData({
      activeIndex: index,
      managerType: type
    })

    if (index == '3') {
      this.setData({
        otherVis: false
      })
    } else {
      this.setData({
        otherVis: true
      })
    }
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 姓名输入
  InputManagerName(e) {
    // console.log(e.detail.value);
    this.setData({
      managerName: e.detail.value
    })
  },
  // 电话输入
  InputTelPhoneNo(e) {
    // console.log(e.detail.value);
    this.setData({
      telphoneNo: e.detail.value
    })
  },

  // 提交
  commitManager() {

    // 数据校验
    if (this.data.managerName == "") {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    // 数据校验
    if (this.data.telphoneNo == "") {
      wx.showModal({
        title: '提示',
        content: '电话不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 电话正则校验
    var reg = /^1[34578]\d{9}$/;
    // console.log("电话判断:" + reg.test(this.data.telphoneNo));
    if (!reg.test(this.data.telphoneNo)) {
      wx.showModal({
        title: '提示',
        content: '电话输入不正确',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    // 管理人员 
    let manager = {
      managerType: this.data.managerType,
      managerName: this.data.managerName,
      telphoneNo: this.data.telphoneNo,
      projectID: this.data.projectID
    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 新增         
          managerJS.addManage(manager,function(res){
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
  }
})