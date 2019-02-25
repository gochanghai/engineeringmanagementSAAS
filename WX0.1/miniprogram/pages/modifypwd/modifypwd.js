// pages/modifypwd/modifypwd.js
const storage = require('../../static/storage.js');
const userAction = require('../../backend/commonsAction/userAction.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    BACK_VALUE: 0,
    account: storage.getUser().account,
    oldPassword: '',
    newPassword: '',
    newPassword1: ''
  },

  onLoad: function(options) {
    // 获取用户账号
    this.setData({
      account: storage.getUser().account
    })
    console.log(this.data.account);
  },

  // 获取输入旧密码
  oldPasswordInput: function(e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },

  // 获取输入新密码 
  newPasswordInput: function(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },

  // 获取输入确认密码 
  newPassword1Input: function(e) {
    this.setData({
      newPassword1: e.detail.value
    })
  },

  // 保存 
  save: function() {
    // 判断密码是否为空
    if (this.data.oldPassword === '') {
      wx.showModal({
        title: '提示',
        content: '旧密码不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    if (this.data.newPassword === '' || this.data.newPassword1 === '') {
      wx.showModal({
        title: '提示',
        content: '新密码和确认密码都不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    if (this.data.newPassword != this.data.newPassword1) {
      wx.showModal({
        title: '提示',
        content: '新密码和确认密码不一样',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    let oldPassword = this.data.oldPassword;
    let newPassword = this.data.newPassword;

    wx.showModal({
      title: '提示',
      content: '确定修改密码吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          // console.log('Commit');
          // 修改密码
          userAction.modifyPWD(oldPassword, newPassword, function(res) {
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1200)
                  // 返回个人中心
                  wx.navigateTo({
                    url: '/pages/mycenter/mycenter'
                  })
                }
              })
            } else {
              wx.showModal({
                content: '修改失败',
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