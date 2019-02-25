// pages/shenhua/shenhua.js
Page({
  data: {
    switchIndex: "0",
    WinHeightCon: null,
    swiperDuration: 1
  },
  onLoad: function(options) {
    this.setData({
      WinHeightCon: wx.getSystemInfoSync().windowHeight + 'px',
    });
  },

  bindSwitch(e) {
    this.setData({
      switchIndex: e.currentTarget.dataset.index
    })
  }
})