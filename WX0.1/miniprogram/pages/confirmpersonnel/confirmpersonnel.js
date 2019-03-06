// pages/confirmpersonnel/confirmpersonnel.js
const fileAction = require('../../backend/manageAction/fileAction.js');
const workerAction = require('../../backend/manageAction/workerAction.js');
const fileUtilJS = require('../../utils/fileUtil.js');
Page({
  data: {
    windowHeight: null,
    toggleId: null,
    toggleStyle: {
      heightSel: 'auto',
      imgSel: '/images/up.png',
      height: '170rpx',
      img: '/images/down.png'
    },
    personnerList: [],
    groupList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.fileSignToTitle(options.fileSign),
    })

    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight + 'px',
      projectID: options.projectID,
      fileSign: options.fileSign,
    });
    // 获取数据
    this.getDataList(this.data.projectID, this.data.fileSign)
  },

  /**
   * 收缩按钮
   */
  downSwitch(event) {
    // console.log(event.currentTarget.id);
    let _this = this;
    let index = event.currentTarget.id;
    let showID = this.data.toggleId;
    if (showID === index) {
      index = -1;
    }
    if (index != -1) {
      _this.getWorkerList(_this.data.projectID, _this.data.groupList[index].belongidlist);
    }
    this.setData({
      toggleId: index,
    })
  },

  previewFile(event) {
    // console.log(event.currentTarget.id);
    let _this = this;
    let index = event.currentTarget.id;
    let fileInfo = {
      formname: _this.data.groupList[index].formname,
      formobjid: _this.data.groupList[index].formobjid,
      fileid: _this.data.groupList[index].fileid,
      filename: _this.data.groupList[index].filename,
    }
    _this.dopreviewFile(fileInfo)

  },

  /**
   * 获取文件依赖劳务人员
   */
  getWorkerList(projectID, belongidlist) {
    let _this = this;
    _this.data.personnerList = []
    workerAction.getWorkerList(projectID, belongidlist, function (bworkerList) {
      if (null != bworkerList && null != bworkerList.length && bworkerList.length > 0) {
        for (let item of bworkerList) {
          let pushData = {
            admissionat: item.admissionat,
            name: item.name,
            groupname: item.groupname
          }
          _this.data.personnerList.push(pushData);
        }
      }
      _this.setData({
        personnerList: _this.data.personnerList
      })
    });
  },

  dopreviewFile(fileInfo = { formname: null, formobjid: null, fileid: null, filename: null }) {
    console.log(fileInfo)
    fileAction.fileGetPath(fileInfo, function (res) {
      console.log(res.fileURL)
      const downloadTask = wx.downloadFile({
        url: res.fileURL,
        success(res) {
          console.log(res)
          if (res.statusCode === 200) {
            let previewFileInfo = {
              fileName: fileInfo.filename,
              filePath: res.tempFilePath,
              fileType: fileUtilJS.getSux(fileInfo.filename),
            }
            fileAction.previewFile(previewFileInfo)
          }
        },
        fail(res) {
          console.log(res)
        }
      })
      downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      })
    })
  },

  // 获取数据
  getDataList(projectID, fileSign) {
    let _than = this;
    let filebelongvalue = '';
    switch (fileSign) {
      case 'disclose':
        filebelongvalue = "安全交底";
        break;
      case 'education':
        filebelongvalue = "安全教育";
        break;
      case 'insurance':
        filebelongvalue = "保险";
        break;
      default:
        filebelongvalue = null;
        break;
    }
    let fileInfo = {
      projectid: projectID,
      formname: 'dc_mng_worker',
      filebelong: filebelongvalue,
    }
    fileAction.getFileList(fileInfo, function (bfileList) {
      let groupList = [];
      if (null != bfileList && null != bfileList.length && bfileList.length > 0) {
        for (let index of bfileList) {
          let item = {
            formobjid: index.formobjid,
            fileid: index.fileid,
            formname: index.formname,
            filename: index.filename,
            createDate: index.uploadat,
            belongidlist: index.belongidlist,
          }
          groupList.push(item);
        }
      }
      _than.setData({
        groupList: groupList,
      })
    })
  },


  /**
   * 获取标题
   */
  fileSignToTitle(val) {
    // let fileSign =  "disclose"||"education"||"insurance"
    switch (val) {
      case 'disclose':
        return '附件列表：安全交底';
        break;
      case 'education':
        return '附件列表：安全教育';
        break;
      case 'insurance':
        return '附件列表：保险';
        break;
      default:
        return '附件列表';
        break;
    }
  },
})