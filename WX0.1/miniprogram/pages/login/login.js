// pages/login/login.js
const userAction = require('../../backend/commonsAction/userAction.js');
Page({
  data: {
    userName: 'test001',
    password: '123456',
  },

  //获取用户输入的用户名和密码
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  passWdInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  //用户登录操作
  signIn: function (){
    let _this = this;
    //判断用户名密码是否为空
    if (this.data.userName != '' && this.data.password != '') {
      // 用户登录
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      });
      userAction.signIn('test001','123456', function (res) {
        // 关闭加载框
        wx.hideToast({});
        if (res.code === 1) {
          wx.showToast({
            title: '登录成功',
            success: function () {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          })
        } else { 
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '用户名或密码错误',
          })
        }
      })
    } else {
      // 关闭加载框
      wx.hideToast({});
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入用户名和密码',
      })
    }

  },

  //忘记密码
  resetPwdFun: function() {
    wx.navigateTo({
      url: '/pages/forgetpawd/forgetpawd',
    })
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    wx.clearStorageSync()
  }
})