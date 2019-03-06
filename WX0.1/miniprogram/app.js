//app.js
const userWechatAction = require('backend/commonsAction/user_wechatAction.js');
App({
  onLaunch: function() {
    let _than = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    let openid = '';
    // 微信登录获取openId
    wx.login({
      success: function(res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {　　　　　　　 //小程序唯一标识
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
            success: function(openIdRes) {
              // console.info("登录成功返回的openId：" + openIdRes.data.openid);
              // 判断openId是否获取成功
              // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                // console.log('用户授权获取平台帐号及其他信息');
                openid = openIdRes.data.openid;
                _than.globalData = {
                  openid: openid,
                };

                // 微信openId登录
                userWechatAction.wxopenidSignIn(openIdRes.data.openid, function(res) {
                  console.log(res.code);
                  if (res.code === 1) {
                    // 登录成功获取用户信息
                    userWechatAction.getUSERbindWXID(function(res) {
                      console.log(res);
                      // 把用户信息存入全局变量
                      getApp().globalData.userInfo = res;
                      getApp().globalData.avatarUrl = res.avatarurl;
                      // 把头像放入缓存
                      wx.setStorageSync('avatarUrl', res.avatarurl);                      
                    });
                    // 跳转到首页
                    wx.switchTab({
                      url: '/pages/home/home',
                    })                    
                  } else {
                    // 跳转到登录页
                    wx.switchTab({
                      url: '/pages/login/login',
                    })
                  }

                })
                console.log(openIdRes.data.openid);
              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function(error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    });
    console.log('app:' + openid)
    this.globalData = {
      userInfo: {},
      openid: openid,
      avatarUrl: '',
    }
  },

  //页面加载 微信授权
  getInfo(thisObj) {
    var that = thisObj;

  }


})