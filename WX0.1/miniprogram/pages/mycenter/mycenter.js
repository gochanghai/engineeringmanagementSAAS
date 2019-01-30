// pages/mycente/mycenterr.js
Page({
  data: {
    userInfo: {},
    IsInitial: false
  },

  //获取用户信息
  getUserINfo() {
    wx.getSetting({
      success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },

  onLoad() {
    // this.getUserINfo();

    // let that = this;
    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       avatarUrl: res.userInfo.avatarUrl,
    //       nickName: res.userInfo.nickName,
    //     })
    //   }
    // })
  },

  UpavatarUrl() {
    wx.chooseImage({
      count: 1, //张数， 默认9
      sourceType: ['album', 'camera'], // 来源是相册、相机
      success: function(res) {
        console.log(res);
      },
    })
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  modifyPwd() {
    wx.navigateTo({
      url: '/pages/modifypwd/modifypwd',
    })
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.getUserINfo();
  },
})