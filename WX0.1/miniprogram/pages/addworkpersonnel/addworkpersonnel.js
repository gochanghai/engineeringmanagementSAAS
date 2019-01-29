// pages/addworkpersonnel/addworkpersonnel.js
const workerJS = require('../../action/worker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeSty: 'color:#fff;border: 1px solid #FFA268;',
    activeSel: 'active-sel',
    activeIndex: '1',

    admissionAt: '请选择入场时间',
    leavingAt: '请选择离场时间',
    projectID: '',
    groupId: 1,
    name: '',
    age: '',
    telNo: '',
    repay: '',
    id_card: '',
    emergencyContact: '',
  },
  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
    })
  },

  selTeam(e) {
    console.log(e.currentTarget.dataset.type);
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      groupId: e.currentTarget.dataset.index
    })
  },

  // 姓名输入
  InputName(e) {
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  // 年龄输入
  InputAge(e) {
    console.log(e.detail.value);
    this.setData({
      age: e.detail.value
    })
  },

  // 身份证输入
  InputIdCard(e) {
    console.log(e.detail.value);
    this.setData({
      id_card: e.detail.value
    })
  },
  // 联系电话输入
  InputTelNo(e) {
    console.log(e.detail.value);
    this.setData({
      telNo: e.detail.value
    })
  },

  // 紧急联系人输入
  InputEmergencyContact(e) {
    console.log(e.detail.value);
    this.setData({
      emergencyContact: e.detail.value
    })
  },
  // 工价输入
  InputRepay(e) {
    this.setData({
      repay: e.detail.value
    })
  },
  // 入场时间输入
  InputAdmissionAt(e) {
    this.setData({
      admissionAt: e.detail.value
    })
  },
  // 离场时间输入
  InputLeavingAt(e) {
    this.setData({
      leavingAt: e.detail.value
    })
  },
  // 取消按钮
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 提交数据
  commitWorker() {
    // 数据校验
    // 姓名
    if (this.data.name == "") {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 年龄
    if (this.data.age == "" || this.data.age < 18) {
      let content = '年龄不能为空';
      if (this.data.age < 18){
        content = '年龄不能小于18岁';
      }
      wx.showModal({
        title: '提示',
        content: content,
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 身份证
    if (this.data.id_card == "") {
      wx.showModal({
        title: '提示',
        content: '身份证不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 身份证号正则校验
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(this.data.id_card)) {
      wx.showModal({
        title: '提示',
        content: '身份证号不正确',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 联系电话
    if (this.data.telNo == "") {
      wx.showModal({
        title: '提示',
        content: '联系电话不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 电话正则校验
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test(this.data.telNo)) {
      wx.showModal({
        title: '提示',
        content: '联系电话输入不正确',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    // 紧急联系人
    if (this.data.emergencyContact == "") {
      wx.showModal({
        title: '提示',
        content: '紧急联系人不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 工价
    if (this.data.repay == "") {
      wx.showModal({
        title: '提示',
        content: '工价不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 入场时间
    if (this.data.admissionAt == "" || this.data.admissionAt == "请选择入场时间") {
      wx.showModal({
        title: '提示',
        content: '入场时间不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    // 离场时间
    if (this.data.leavingAt == "" || this.data.leavingAt == "请选择离场时间") {
      wx.showModal({
        title: '提示',
        content: '离场时间不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    let worker = {
      projectID: this.data.projectID,
      groupId: this.data.groupId,
      name: this.data.name,
      age: this.data.age,
      repay: this.data.repay,
      telNo: this.data.telNo,
      IDCard: this.data.id_card,
      admissionAt: this.data.admissionAt,
      emergencyContract: this.data.emergencyContact,
      leavingAt: this.data.leavingAt,
    }
    console.log(worker);
    
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          workerJS.addWorker(worker, function(res) {
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

})