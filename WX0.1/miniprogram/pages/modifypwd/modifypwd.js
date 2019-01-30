// pages/modifypwd/modifypwd.js
const storage = require('../../utils/storage.js');
const userJS = require('../../action/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BACK_VALUE: 0,
    account: storage.getUser.account,
    oldPassword: '',
    newPassword: '',
    newPassword1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户账号
    this.setData({
      account: storage.getUser().account
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
    if (this.data.oldPassword === '' ) {
      wx.showModal({
        title: '提示',
        content: '旧密码不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    if (this.data.newPassword === '' || this.data.newPassword1 === ''){      
      wx.showModal({
        title: '提示',
        content: '新密码和确认密码都不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }

    if(this.data.newPassword != this.data.newPassword1){
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
          console.log('Commit');
          // 修改密码
          userJS.modifyPWD(oldPassword,newPassword,function(res){
            console.log(res)
            if(res.code == 1){
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1000)
                  // 返回个人中心
                  wx.navigateTo({
                    url: '/pages/mycenter/mycenter'
                  })
                }
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