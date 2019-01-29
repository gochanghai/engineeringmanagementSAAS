// pages/uploadfile/uploadfile.js
const fileJS = require('../../action/file.js');
Page({

  data: {
    IsperList: false,
    animationData: {},
    urlFileImg: '',
    WinHeight:null
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.ByTypeTitle
    })
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 100 + 'px',
    });
  },

  uploadFile() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(600).step()
    that.setData({
      animationData: animation.export(),
      IsperList: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },


  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        IsperList: false
      })
    }, 10)
  },

  uploadFileUrl() {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9
      sourceType: ['album', 'camera'], // 来源是相册、相机
      success: function(res) {
        console.log(res.tempFilePaths[0]);
        _this.setData({
          urlFileImg: res.tempFilePaths[0]
        })
      },
    })
  },

  imgView() {
    wx.previewImage({
      current: this.data.urlFileImg,
      urls: [this.data.urlFileImg]
    })
  }
})