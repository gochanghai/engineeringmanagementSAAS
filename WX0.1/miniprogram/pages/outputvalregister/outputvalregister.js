// pages/outputvalregister/outputvalregister.js
const fileUtil = require('../../utils/fileUtil.js');
const fileAction = require('../../backend/manageAction/fileAction.js');
const confirmvalueAction = require('../../backend/manageAction/confirmvalueAction.js');
const fileConfirmvalueAction = require('../../backend/manageAction/file_confirmvalueAction.js');

Page({
  data: {
    outputValue: '',
    receivableAmount: '',
    fileName: "未选择文件",
    uploadFilePath: '',
    fileList: [],
    IsperList: false,
    urlFileImg: '',
    animationData: {},
    formID: '',
    projectID: '',
    uploadDate: '',
    outputValue: '',
    receivableAmount: '',
    confirmDate: '',
    UnConfirmNodeList: null,
    activeIndex: 0,
    typeTitle:''
  },

  selNode(e) {
    this.setData({
      activeIndex: e.detail.value
    })
  },

  hideModal() {
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

  onLoad: function(options) {
    this.setData({
      formID: options.formID,
      projectID: options.projectID,
      typeTitle: options.title
    });
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (this.data.formID != '') {
      this.getData(this.data.formID, this.data.projectID);
      this.getFileList(this.data.formID, this.data.projectID);
    }
    // this.getFileList(this.data.formID, this.data.projectID);
    this.getUnConfirmNode(this.data.projectID);
  },

  // 获取单项目的未申报时间节点列表
  getUnConfirmNode(projectID) {
    var _this = this;
    confirmvalueAction.getUnConfirmNode(projectID, function(bnodeList) {
      // console.log('获取单项目的未申报时间节点列表')
      console.log(bnodeList)
      _this.setData({
        UnConfirmNodeList: bnodeList
      })
    })
  },

  // 产值表上传时间输入
  inputValueUploadAt(e) {
    this.setData({
      uploadDate: e.detail.value
    })
  },
  // 产值输入
  inputOutputValue(e) {
    var _this = this;
    this.setData({
      outputValue: e.detail.value
    })
  },
  // 可收款输入
  inputReceivableAmount(e) {
    this.setData({
      receivableAmount: e.detail.value
    })
  },
  // 甲方确认时间输入
  inputConfirmAt(e) {
    this.setData({
      confirmDate: e.detail.value
    })
  },

  //  获取数据
  getData(formID, projectID) {
    let _than = this;
    confirmvalueAction.getConfirmvalue(formID, projectID, function(res) {
      console.log('getConfirmvalue');
      console.log(res);
      _than.setData({
        uploadDate: _than.dateFormat(res.valueuploadat),
        outputValue: res.outputvalue,
        receivableAmount: res.receivableamount,
        confirmDate: _than.dateFormat(res.confirmat),
      })
    });
  },
  // 获取已上传的文件列表
  getFileList(formID, projectID) {
    let _than = this;
    let fileInfo = {
      projectid: projectID,
      formname: 'dc_mng_project_confirmvalues',
      belongidlist: formID,
      filebelong: '确认产值',
    }
    fileAction.getFileList(fileInfo, function(res) {
      console.log('bfileList');
      console.log(res);
      let fileList = [];
      for (let index in res) {
        let item = {
          fileId: res[index].fileid,
          fileName: res[index].filename,
          formName: res[index].formname,
        }
        fileList.push(item);
      }
      _than.setData({
        fileList: fileList,
      })
    })
  },

  // 预览
  review(e) {
    // 获取参数
    let item = e.currentTarget.dataset.index
    let fileId = item.fileId;
    let fileName = item.fileName;
    let formobjId = this.data.formID;

    // 调用预览函数    
    this.reviewFile(formobjId, fileId, fileName);

  },

  // 取消按钮
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 确定按钮
  commitOutputVal() {
    var _this = this;
    // 判断回款金额是否为空
    if (this.data.outputValue == "" || this.data.outputValue == null) {
      wx.showModal({
        title: '提示',
        content: '产值不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    if (this.data.receivableAmount == "" || this.data.receivableAmount == null) {
      wx.showModal({
        title: '提示',
        content: '可收款不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    if (this.data.confirmDate == "" || this.data.confirmDate == null) {
      wx.showModal({
        title: '提示',
        content: '甲方确认时间不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    if (this.data.file == "" || this.data.file == null) {
      wx.showModal({
        title: '提示',
        content: '请长传产值表！',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 准备要提交的数据
    // 附件
    let fileInfo = {
      file: _this.data.uploadFilePath,
      filename: _this.data.fileName,
    };
    // 表单ID
    let formID = this.data.formID;
    // 项目ID
    let projectID = this.data.projectID;
    // 产值登记信息
    let confirmvalueInfo = {
      uploadDate: this.data.uploadDate,
      confirmat: this.data.confirmDate,
      outputvalue: this.data.outputValue,
      receivableamount: this.data.receivableAmount,
      valueuploadat: this.data.uploadDate,
      projectid: projectID,
    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 更新产值登记
          console.log(fileInfo);
          console.log(confirmvalueInfo);
          console.log(formID);
          console.log(projectID);
          // 提交数据
          if (formID != '') {
            fileConfirmvalueAction.comitFileANDConfirmValue(fileInfo, confirmvalueInfo, formID, projectID, function(res) {
              console.log(res.code);
              if (res.code == 1) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: '1'
                      })
                    }, 1000)
                  }
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: '1'
                      })
                    }, 1000)
                  }
                })
              }
            })
          } else {
            fileConfirmvalueAction.addFileANDConfirmValue(fileInfo, confirmvalueInfo, function(res) {
              console.log(res.code);
              if (res.code == 1) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: '1'
                      })
                    }, 1000)
                  }
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  icon: 'success',
                  duration: 2000,
                  success() {
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: '1'
                      })
                    }, 1000)
                  }
                })
              }
            })
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 选择文件按钮
  uploadFileUrl() {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9
      sourceType: ['album', 'camera'], // 来源是相册、相机
      success: function(res) {
        // console.log(res);
        // const tempFilePaths = res.tempFilePaths[0]
        console.log(res.tempFilePaths[0])
        _this.setData({
          uploadFilePath: res.tempFilePaths[0],
          urlFileImg: res.tempFilePaths[0],
          fileName: res.tempFilePaths[0].replace("http://tmp/", "")
        })
      },
    })
  },

  // 完成按钮
  commitFileANDWorkerUnSignList() {
    console.log(this.data.urlFileImg);
    if (this.data.urlFileImg) {
      this.setData({
        IsperList: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '未选择文件',
        showCancel: false,
        confirmColor: '#F0880C'
      })
    }
  },

  imgView() {
    wx.previewImage({
      current: this.data.urlFileImg,
      urls: [this.data.urlFileImg]
    })
  },

  // 上传附件按钮
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


  // 获取文件数据并预览  
  reviewFile(formobjId, fileId, fileName) {
    let fileInfo = {
      formname: "confirmvalue",
      formobjId: formobjId, // 产值表objectId
      fileid: fileId, // 文件的fileId
      filename: fileName, // 文件全名
    }
    fileAction.fileGetPath(fileInfo, function(res) {
      const downloadTask = wx.downloadFile({
        url: res.fileURL,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          console.log(res);
          if (res.statusCode === 200) {
            // .....................................preview文件预览................................. 
            let previewFileInfo = {
              filename: fileName,
              filePath: res.tempFilePath,
              fileType: fileUtil.getSux(fileName),
            }
            fileAction.previewFile(previewFileInfo)
            // .....................................preview文件预览.................................     
          }
        },
        fail(res) {}
      })
      downloadTask.onProgressUpdate((res) => {
        wx.showToast({
          title: '正在加载',
          icon: 'loading',
          mask: true
        })

        if (res.totalBytesWritten == res.totalBytesExpectedToWrite) {
          wx.hideToast({})
        }
        console.log('下载进度', res.progress)
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    })
  },

  // 时间格式化
  dateFormat(val) {
    if (val === null) {
      return "未知";
    }
    if (val.length >= 10) {
      return val.substring(0, 10);
    }
    return val;
  },

})