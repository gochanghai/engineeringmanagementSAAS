// pages/uploadfile/uploadfile.js
const fileWorkerJS = require('../../action/file_worker.js');
Page({

  data: {
    IsperList: false,
    animationData: {},
    urlFileImg: '',
    WinHeight: null,
    IsnoneMes: false
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.byTypeTitle,
    })
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 100 + 'px',
      projectID: options.projectID,
      fileSign: options.fileSign,
    });
    this.getUnSignWorkerList(options.projectID, options.fileSign);
  },

  // 单个选择框事件
  changeChecked(e) {
    let index = e.currentTarget.dataset.index;
    let checked = !e.currentTarget.dataset.type;
    let list = this.data.list;
    let formId = list[index].formId;
    let groupName = list[index].groupName;
    let name = list[index].name;
    let workerFormIdlist = '';
    list[index].checked = checked;
    // 全部取消选中 只能单选
    for (let item in list) {
      if (list[item].checked == true) {
        workerFormIdlist = workerFormIdlist + list[item].formId + ","
      }
    }
    // 删除最后一个' , '
    workerFormIdlist = workerFormIdlist.substr(0, workerFormIdlist.length - 1);
    this.setData({
      list: list,
      workerFormIdlist: workerFormIdlist,
    });
  },

  // 获取未上传文件的人员名单
  getUnSignWorkerList(projectID, fileSign) {
    let _this = this;
    // let fileSign =  "disclose"||"education"||"insurance"
    fileWorkerJS.getUnSignWorkerList(projectID, fileSign, function(res) {
      console.log(res);
      if (res == null) {
        _this.setData({
          IsnoneMes: true
        })
      } else {
        _this.setData({
          list: res,
          IsnoneMes: false
        })
      }
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
  },

  // 提交人员名单与附件
  commitFileANDWorkerUnSignList() {
    let packageData = {
      workerFormIdlist: this.data.workerFormIdlist, // =======================？？？？？
      projectID: this.data.projectID,
      file: this.data.urlFileImg,
      fileName: this.data.urlFileImg.replace("http://tmp/", ""),
      fileSign: this.data.fileSign,
    }
    fileWorkerJS.packageComitFileANDWorkerSignList(packageData, function(res) {

    })
  }
})