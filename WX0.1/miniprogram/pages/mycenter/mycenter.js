// pages/mycente/mycenterr.js
const storageJS = require('../../static/storage.js');
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

    this.setData({
      headimg: '',
      userName: storageJS.getUser().userName,
      userArea: storageJS.getUser().userArea,
      userPostion: storageJS.getUser().userTitle,
    })
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

  accountCertification() {
    wx.navigateTo({
      url: '/pages/certification/certification',
    })
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.getUserINfo();
  },

  loginOut() {
    wx.showModal({
      title: '退出登录',
      content: '是否退出当前账号?',
      success(res) {
        if (res.confirm) {
          console.log('logOut...')
          try {
            wx.clearStorageSync();
            wx.showToast({
              title: '',
              icon: 'loading',
            })
            setTimeout(function() {
              wx.hideToast({});
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 2000,
                success: function() {
                  setTimeout(function() {
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }, 1200)
                }
              })
            }, 1200)
          } catch (e) {}
        } else if (res.cancel) {
          console.log('取消');
        }
      }
    })
  }
})