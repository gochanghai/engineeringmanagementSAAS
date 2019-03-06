// pages/addworkpersonnel/addworkpersonnel.js
const workerAction = require('../../backend/manageAction/workerAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeSty: 'color:#fff;border: 1px solid #FFA268;',
    activeSel: 'active-sel',
    activeIndex: 0,
    admissionAt: '请选择入场时间',
    leavingAt: '请选择离场时间',
    projectID: '',
    groupId: '',
    name: '',
    age: '',
    telNo: '',
    repay: '',
    id_card: '',
    emergencyContact: '',
    selGroup: null,
  },
  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
    })
    //获取班组选择的数据
    this.getSelGroup(this.data.projectID);
  },
  // 获取班组数据
  getSelGroup(projectID) {
    var _this = this;
    workerAction.getTeamNameList(projectID, function(bfireGroup) {
      console.log(bfireGroup);
      _this.setData({
        selGroup: bfireGroup,
        groupId: bfireGroup[0].formid,
      })
    })
  },

  selTeam(e) {
    let groupId = this.data.selGroup[e.detail.value].formid;
    console.log(groupId);
    this.setData({
      activeIndex: e.detail.value,
      groupId: groupId
    })
  },

  // 姓名输入
  InputName(e) {
    // console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  // 年龄输入
  InputAge(e) {
    // console.log(e.detail.value);
    this.setData({
      age: e.detail.value
    })
  },

  // 身份证输入
  InputIdCard(e) {
    // console.log(e.detail.value);
    this.setData({
      id_card: e.detail.value
    })
  },
  // 联系电话输入
  InputTelNo(e) {
    // console.log(e.detail.value);
    this.setData({
      telNo: e.detail.value
    })
  },

  // 紧急联系人输入
  InputEmergencyContact(e) {
    // console.log(e.detail.value);
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
    // let worker = {
    //   projectid: this.data.projectID,
    //   groupid: this.data.groupId,
    //   name: this.data.name,
    //   age: this.data.age,
    //   repay: this.data.repay,
    //   telno: this.data.telNo,
    //   idcard: this.data.id_card,
    //   admissionat: this.data.admissionAt,
    //   emergencycontract: this.data.emergencyContact,
    //   leavingat: this.data.leavingAt,
    // }
    // console.log(worker);
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
      if (this.data.age < 18) {
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
      projectid: this.data.projectID,
      groupid: this.data.groupId,
      name: this.data.name,
      age: this.data.age,
      repay: this.data.repay,
      telno: this.data.telNo,
      idcard: this.data.id_card,
      admissionat: this.data.admissionAt,
      emergencycontract: this.data.emergencyContact,
      leavingat: this.data.leavingAt,
    }
    console.log(worker);
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          workerAction.addWorker(worker, function(res) {
            console.log('worker');
            console.log(worker);
            console.log(res.code);
            if (res.code == 1) {
              wx.showToast({
                title: '提交成功',
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
                content: '新增失败',
                showCancel: false,
                confirmColor: '#F0880C'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
})