// pages/mycente/mycenterr.js
const storageJS = require('../../static/storage.js');
const userWechatAction = require('../../backend/commonsAction/user_wechatAction.js');
Page({
  data: {
    userInfo: {},
    IsInitial: false,
    avatarUrl: ''
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

  // 头像放大
  imagePreview() {
    wx.previewImage({
      current: this.data.avatarUrl,
      urls: [this.data.avatarUrl]
    })
  },

  onGotUserInfo(e) {
    let _than = this;
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail)
    let userInfo = e.detail.userInfo    
    let wxCharInfo = {
      nickname: userInfo.nickName,
      gender: userInfo.gender,
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarurl: userInfo.avatarUrl,
      signature: e.detail.signature,
      encrypteddata: e.detail.encryptedData,
      iv: e.detail.iv,
      openid: ''
    };
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {　　　　　　　 
              //小程序唯一标识
              appid: 'wxd02017799e41c790',
              //小程序的 app secret
              secret: '3b68e0efab67b7e3d2c1e5de7f85c15d',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (openIdRes) {
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              wxCharInfo.openid= openIdRes.data.openid;
              console.log('开始绑定微信');
              console.log(wxCharInfo);              
              userWechatAction.addUSERbindWXID(wxCharInfo, function (res) {
                console.log('绑定微信');
                console.log(res);
                if(res.code == 1){
                  wx.showModal({
                    title: '提示',
                    content: '绑定成功',
                    showCancel: false,
                    confirmColor: '#F0880C'
                  })
                  _than.setData({
                    userInfo: wxCharInfo,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                  })
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '绑定失败',
                    showCancel: false,
                    confirmColor: '#F0880C'
                  })
                }
              });
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    });
    getApp().globalData.avatarUrl = e.detail.userInfo.avatarUrl;
  },

  /*** 页面监听加载函数 */
  onLoad() {
    this.setData({
      userName: storageJS.getUser().userName,
      userArea: storageJS.getUser().userArea,
      userPostion: storageJS.getUser().userTitle,
      avatarUrl: getApp().globalData.avatarUrl,
    })
  },

  //公司信息
  shenhauDetail() {
    wx.navigateTo({
      url: '/pages/shenhua/shenhua',
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

  // 修改密码
  modifyPwd() {
    wx.navigateTo({
      url: '/pages/modifypwd/modifypwd',
    })
  },

  // 查看认证信息
  accountCertification() {
    wx.navigateTo({
      url: '/pages/certification/certification',
    })
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.getUserINfo();
  },

  // 退出登录
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