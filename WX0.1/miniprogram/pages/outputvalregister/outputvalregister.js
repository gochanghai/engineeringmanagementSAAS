// pages/outputvalregister/outputvalregister.js
const fileJS = require('../../action/file.js');
const fileUtil = require('../../utils/fileUtil.js');
const fileProgressJS = require('../../action/file_progress.js')
const confirmvalueJS = require('../../action/confirmvalue.js');
Page({
  data: {
    valueUploadAt: '请选择日期',
    confirmAt: '请选择日期',
    outputValue: '',
    receivableAmount: '',
    fileName: "未选择文件",
    uploadFilePath: '',
    fileList: [],
  },

  onLoad: function(options) {
    // 获取数据
    // 判断金额是否为空
    let outputValue = 0.00;
    if (options.outputValue != null) {
      receivableAmount = options.outputValue
    }
    let receivableAmount = 0.00;
    if (options.receivableAmount != null) {
      receivableAmount = options.receivableAmount
    }
    let confirmAt = 0.00;
    if (options.confirmAt != null) {
      confirmAt = options.confirmAt
    }
    // 设置数据
    this.setData({
      objectId: options.objectId,
      formId: options.formId,
      projectID: options.projectID,
      receivableAmount: receivableAmount,
      ownerPayPercent: options.ownerPayPercent != null ? options.ownerPayPercent : 1,
      outputValue: options.outputValue,
      valueUploadAt: options.valueUploadAt,
      confirmAt: options.confirmAt,
      progressNodeID: options.progressNodeID,
      ownerPayTime: options.ownerPayTime,
    });
    this.getconfirmvalue();
    this.getFileList();
  },

  // 产值表上传时间输入
  InputValueUploadAt(e) {
    // console.log(e.detail.value);
    this.setData({
      valueUploadAt: e.detail.value
    })
  },
  // 产值输入
  InputOutputValue(e) {
    var _this = this;
    console.log(e.detail.value);
    this.setData({
      outputValue: e.detail.value,
      receivableAmount: e.detail.value * _this.data.ownerPayPercent
    })
  },
  // 可收款输入
  InputReceivableAmount(e) {
    // console.log(e.detail.value);
    this.setData({
      receivableAmount: e.detail.value
    })
  },
  // 甲方确认时间输入
  InputConfirmAt(e) {
    // console.log(e.detail.value);
    this.setData({
      confirmAt: e.detail.value
    })
  },

  // 获取产值信息
  getconfirmvalue() {
    let _this = this;
    confirmvalueJS.getConfirmvalue(this.data.formId, function(res) {
      // console.log(res);
      let outputValue = 0.00;
      if (res.outputValue != null) {
        receivableAmount = res.outputValue
      }
      let receivableAmount = 0.00;
      if (res.receivableAmount != null) {
        receivableAmount = res.receivableAmount
      }
      let confirmAt = 0.00;
      if (res.confirmAt != null) {
        confirmAt = res.confirmAt
      }
      _this.setData({
        objectId: res.objectId,
        formId: res.formId,
        receivableAmount: receivableAmount,
        outputValue: outputValue,
        valueUploadAt: _this.dateFormat2(res.valueUploadAt),
        confirmAt: _this.dateFormat2(res.confirmAt),
        progressNodeID: res.progressNodeID,
        ownerPayTime: res.ownerPayTime,
      });
    });
  },

  // 预览
  review(e) {
    // 获取参数
    let item = e.currentTarget.dataset.index
    let fileId = item.fileId;
    let fileName = item.fileName;
    let formobjId = this.data.objectId;

    // 调用预览函数    
    this.reviewFile(formobjId, fileId, fileName);

  },


  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 提交数据
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
    if (this.data.confirmAt == "" || this.data.confirmAt == null) {
      wx.showModal({
        title: '提示',
        content: '甲方确认时间不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 获取数据
    let confirmvalueInfo = {
      confirmAt: this.data.confirmAt,
      outputValue: this.data.outputValue,
      receivableAmount: this.data.receivableAmount,
      valueUploadAt: this.data.valueUploadAt,
      formId: this.data.formId,
      projectID: this.data.projectID,
      progressNodeID: this.data.progressNodeID,
      ownerPayTime: this.data.ownerPayTime,
    }
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          // console.log('Commit');
          // 更新产值登记
          let fileInfo = {
            file: _this.data.uploadFilePath,
            fileName: _this.data.uploadFilePath.replace("http://tmp/", ""),
          };
          fileProgressJS.comitFileANDConfirmValue(confirmvalueInfo, fileInfo, function(res) {
            console.log(res)
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 上传附件
  uploadFile() {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9
      sourceType: ['album', 'camera'], // 来源是相册、相机
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          uploadFilePath: tempFilePaths[0],
          fileName: tempFilePaths[0].replace("http://tmp/", "")
        })
      },
    })
  },
  // 获取文件列表
  getFileList() {
    // console.log("getFileList");
    let _this = this;
    let fileInfo = {
      projectID: this.data.projectID,
      formName: 'confirmvalue',
      belongIdList: this.data.formId,
      fileBelong: '确认产值',
    }
    // let fileInfo = {
    //   projectID: "SHXF-201810102",
    //   formName: 'confirmvalue',
    //   belongIdList: "7bbff459-a030-442f-abbc-07b7a8595cd5",
    //   fileBelong: '确认产值',
    // }
    fileJS.getFileList(fileInfo, function(res) {
      _this.setData({
        fileList: res,
      })
    })
  },


  // 获取文件数据并预览  
  reviewFile(formobjId, fileId, fileName) {
    let fileInfo = {
      formName: "confirmvalue",
      formobjId: formobjId, // 产值表objectId
      fileId: fileId, // 文件的fileId
      fileName: fileName, // 文件全名
    }
    fileJS.fileGetPath(fileInfo, function(res) {
      const downloadTask = wx.downloadFile({
        url: res.fileURL,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          console.log(res);
          if (res.statusCode === 200) {
            // .....................................preview文件预览.................................     
            // 预览-2019/1/22
            let previewFileInfo = {
              fileName: fileName,
              filePath: res.tempFilePath,
              fileType: fileUtil.getSux(fileName),
            }
            fileJS.previewFile(previewFileInfo)
            // .....................................preview文件预览.................................     
          }
        },
        fail(res) {}
      })
      downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    })
  },

  // 时间格式化
  dateFormat2(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    return date;
  },

})