// pages/login/login.js
const userWechatAction = require('../../backend/commonsAction/user_wechatAction.js');
const userAction = require('../../backend/commonsAction/userAction.js');
var app = getApp();
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
  signIn: function() {
    let _this = this;
    //判断用户名密码是否为空
    if (this.data.userName != '' && this.data.password != '') {
      // 用户登录
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      });
      let fwxinfo = this.data.userInfo;
      userAction.signIn(this.data.userName, this.data.password, function(res) {
        if (res.code === 1) {
          // 关闭加载框
          wx.hideToast({});
          // 绑定微信
          console.log('开始获取微信信息');
          console.log(app.globalData.openid);
          userWechatAction.getUSERbindWXID(function (res) {
            console.log('获取微信信息');
            console.log(res);
            if(res){
              app.globalData.userInfo = res;
              app.globalData.avatarUrl = res.avatarurl;
              // 把头像放入缓存
              wx.setStorageSync('avatarUrl', res.avatarurl);
            }
            
          });
          wx.showToast({
            title: '登录成功',
            success: function() {
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
    // this.getInfo(this);
    wx.clearStorageSync();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  // 获取微信授权信息
  onGotUserInfo(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  
})