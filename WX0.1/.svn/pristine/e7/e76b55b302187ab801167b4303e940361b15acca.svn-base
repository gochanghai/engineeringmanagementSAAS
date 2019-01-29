// pages/mycente/mycenterr.js
Page({
  data: {
    userInfo: {},
    IsInitial: false
  },

  //获取用户信息
  getUserINfo() {
    // 查看是否授权
    var _this = this;
    wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.showNavigationBarLoading();
            wx.showToast({
              title: '加载中',
              icon: 'loading'
            });
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                if (res.errMsg == "getUserInfo:ok") {
                  wx.hideNavigationBarLoading();
                  wx.stopPullDownRefresh();
                  wx.hideToast({});
                  _this.setData({
                    userInfo: res.userInfo,
                    IsInitial: true
                  })
                  console.log(_this.data.userInfo);
                };
              }
            })
          }
        }
      }),
      wx.login({
        success: function(res) {
          console.log(res);
        }
      })
  },

  onLoad() {
    this.getUserINfo();
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
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