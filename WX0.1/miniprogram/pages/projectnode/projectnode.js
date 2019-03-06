// pages/projectnode/projectnode.js
const projectNodeAction = require('../../backend/manageAction/projectNodeAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateLis: {
      startDate: "2019-01-02"
    },
    // 是否有选中
    isChecked: false,
    // 1：全选/ 0：全不选
    all_checked: false,
    WinHeight: '',
    /**
     * 页面的初始数据
     */
    nodeList: [{
      id: "1",
      rowID: '1',
      nodeName: "进场",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '进场',
      finishStatus: '',
      checked: false,
    }, {
      id: "2",
      rowID: '2',
      nodeName: "预埋工程",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '预埋工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3",
      rowID: '3',
      nodeName: "安装工程",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.1",
      rowID: '3.1',
      nodeName: "消火栓系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.2",
      rowID: '3.2',
      nodeName: "喷林系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.3",
      rowID: '3.3',
      nodeName: "水泡系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.4",
      rowID: '3.4',
      nodeName: "火灾自动报警系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.5",
      rowID: '3.5',
      nodeName: "防排烟系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.6",
      rowID: '3.6',
      nodeName: "气体灭火系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.7",
      rowID: '3.7',
      nodeName: "防火卷帘系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.8",
      rowID: '3.8',
      nodeName: "防火门系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.9",
      rowID: '3.9',
      nodeName: "防火门监控系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.10",
      rowID: '3.10',
      nodeName: "电源监控系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "3.11",
      rowID: '3.11',
      nodeName: "电气火灾监控系统",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '二级',
      nodeFName: '安装工程',
      finishStatus: '',
      checked: false,
    }, {
      id: "4",
      rowID: '4',
      nodeName: "工程测试",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '工程测试',
      finishStatus: '',
      checked: false,
    }, {
      id: "5",
      rowID: '5',
      nodeName: "工程内部验收",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '工程内部验收',
      finishStatus: '',
      checked: false,
    }, {
      id: "6",
      rowID: '6',
      nodeName: "消防验收",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '消防验收',
      finishStatus: '',
      checked: false,
    }, {
      id: "7",
      rowID: '7',
      nodeName: "工程竣工验收",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '工程竣工验收',
      finishStatus: '',
      checked: false,
    }, {
      id: "8",
      rowID: '8',
      nodeName: "工程移交",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '工程移交',
      finishStatus: '',
      checked: false,
    }, {
      id: "9",
      rowID: '9',
      nodeName: "工程质保",
      startTime: null,
      endTime: null,
      status: null,
      rowLevel: '一级',
      nodeFName: '工程质保',
      finishStatus: '',
      checked: false,
    }],

    selStatus: [
      "未完成",
      "已完成"
    ],

    activeIndex: 0,

    //是否可编辑状态
    isEditor: false,
    btnType: "设置",
    cancelType: "返回",
    tempList: [],
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 56 + 'px',
      projectID: projectID,
    })
    // 获取项目进度节点
    this.getProjectNodeList(this.data.projectID);
  },

  //siwtch
  bindItemChange(e) {
    let switchVal = e.detail.value;
    let checkedItem = `nodeList[` + e.currentTarget.id + `].checked`;
    this.setData({
      [checkedItem]: switchVal,
    })
    if (switchVal) {
      let statusItem = `nodeList[` + e.currentTarget.id + `].status`;
      this.setData({
        [statusItem]: 'add',
      })
    } else {
      let statusItem = `nodeList[` + e.currentTarget.id + `].status`;
      this.setData({
        [statusItem]: 'delete',
      })
    }
    // console.log(this.data.nodeList);
  },

  //选择状态
  selStatusItem(e) {
    let finishStatus = `nodeList[` + e.currentTarget.id + `].finishStatus`;
    this.setData({
      [finishStatus]: this.data.selStatus[e.detail.value]
    })
    // console.log(e.detail.value);
    this.setData({
      activeIndex: e.detail.value
    })
    // console.log(this.data.nodeList);
  },

  //设置
  settings(e) {
    let nodeList = this.data.nodeList;
    for (let item of nodeList) {
      if (item.status == 'normal') {
        let index = this.data.nodeList.indexOf(item);
        let statusItem = `nodeList[` + index + `].status`;
        this.setData({
          [statusItem]: 'update',
        })
      } 
      // else if (item.status == 'null' || item.status == null) {
      //   let index = this.data.nodeList.indexOf(item);
      //   let statusItem = `nodeList[` + index + `].status`;
      //   this.setData({
      //     [statusItem]: 'add',
      //   })
      // }
    }
    console.log(this.data.nodeList);
    this.setData({
      isEditor: true,
      btnType: '确定',
      cancelType: '取消',
      tempList: this.data.nodeList,
    })
    let btnType = e.currentTarget.dataset.type;
    if (btnType == "确定") {
      console.log("Commit");
      this.commitProNode();
      this.setData({
        tempList: [],
      })
    }
  },

  //某一个节点删除事件
  selDataDelete(e) {
    console.log(e.currentTarget.id)
    let statusItem = `nodeList[` + e.currentTarget.id + `].status`;
    this.setData({
      [statusItem]: 'delete',
    })
    // console.log(this.data.nodeList);
  },

  // 获取项目进度节点
  getProjectNodeList(projectID) {
    let _this = this;
    projectNodeAction.getProjectNodeList(projectID, function(res) {
      console.log('getProjectNodeList');
      console.log(res);
      // 格式化数据
      for (let item of _this.data.nodeList) {
        let filterDataList = res.filter(function(resDataPage, index, array) {
          return resDataPage.nodeid == this;
        }, item.rowID);
        if (filterDataList.length > 0 && null != filterDataList[0].nodeid) {
          item.nodeName = filterDataList[0].nodename;
          item.startTime = _this.dateFormat2(filterDataList[0].startfrom);
          item.endTime = _this.dateFormat2(filterDataList[0].endat);
          item.status = "normal";
          item.rowLevel = filterDataList[0].rowlevel;
          item.nodeFName = filterDataList[0].nodeparentname;
          item.finishStatus = filterDataList[0].finishstatus;
          item.formid = filterDataList[0].formid;
          item.projectid = filterDataList[0].projectid;
          item.checked = (item.startTime != '未知' && item.endTime != '未知') ? true : false;
        }
        // console.log(item);
      }

      _this.setData({
        nodeList: _this.data.nodeList,
      });
    })
  },

  // 全选
  changeAllChecked(e) {
    let value = !e.currentTarget.dataset.index;
    // console.log(value);
    let nodeList = this.data.nodeList;
    this.data.all_checked = value;
    for (let index in nodeList) {
      // console.log(index);
      nodeList[index].checked = value;
    }
    this.setData({
      nodeList: nodeList,
      all_checked: value,
      isChecked: value,
    });
  },
  // 单个选择框事件
  changeChecked(e) {
    let index = e.currentTarget.dataset.index;
    let checked = !e.currentTarget.dataset.type;
    let nodeList = this.data.nodeList;
    nodeList[index].checked = checked;
    // 统计是否全部选中
    let checkNum = 0;
    for (let index in nodeList) {
      if (nodeList[index].checked) {
        checkNum = checkNum + 1;
      }
    }
    this.setData({
      nodeList: nodeList,
      all_checked: checkNum === nodeList.length,
      isChecked: checkNum != 0,
    });
  },
  // 删除节点
  deleteNode() {
    // 判断是否有选中的数据
    if (!this.data.isChecked) {
      wx.showModal({
        title: '提示',
        content: '您没有选择要删除的数据',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    let _this = this;
    let nodeList = this.data.nodeList;
    let newNodeList = [];
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      showCancel: false,
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          for (let index in nodeList) {
            console.log(index);
            if (!nodeList[index].checked) {
              newNodeList.push(nodeList[index])
            }
          }
          _this.setData({
            nodeList: newNodeList,
            all_checked: false,
            isChecked: false,
          });
        }
      }
    });
  },

  // 开始时间输入
  inputStartDate(e) {
    let nodeList = this.data.nodeList;
    let index = e.currentTarget.dataset.index;
    let startfrom = e.detail.value;
    nodeList[index].startTime = startfrom;
    this.setData({
      nodeList: nodeList
    })
  },
  // 结束时间输入
  inputEndDate(e) {
    let nodeList = this.data.nodeList;
    let index = e.currentTarget.dataset.index;
    let endAt = e.detail.value;
    nodeList[index].endTime = endAt;
    this.setData({
      nodeList: nodeList
    })
  },

  // 取消按钮
  cancel(e) {
    let btnType = e.currentTarget.dataset.type;
    let nodeList = this.data.nodeList;
    let normalList = [];
    console.log(normalList);
    for (let item of nodeList) {
      item.checked = false;
      normalList.push(item);
    }
    if (btnType == "取消") {
      this.setData({
        isEditor: false,
        btnType: '设置',
        cancelType: '返回',
        nodeList: this.data.tempList,
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  //设置成功
  commitProNode() {
    let _this = this;
    // 获取节点数据
    let nodeList = this.data.nodeList;
    console.log(nodeList);
    let projectID = this.data.projectID;
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 提交项目进度节点       
          let psotnodeList = [];
          for (let item of nodeList) {
            let pushdata = {
              status: item.status,
              nodeid: item.rowID,
              nodename: item.nodeName,
              startfrom: item.startTime,
              endat: item.endTime,
              rowlevel: item.rowLevel,
              nodeparentname: item.nodeFName,
              finishstatus: item.finishStatus,
              cformid: item.formid,
              cprojectid: projectID,
            }
            psotnodeList.push(pushdata)
          }
          console.log(psotnodeList);
          projectNodeAction.postProjectNode_2(psotnodeList, function(res) {
            console.log('工程节点提交成功');
            console.log(res);
            console.log(psotnodeList);
            if (res.code == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                success() {
                  // setTimeout(() => {
                  //   wx.navigateBack({
                  //     delta: '1'
                  //   })
                  // }, 1000)
                  _this.setData({
                    isEditor: false,
                    btnType: '设置',
                    cancelType: '返回',
                  })
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '提交失败',
                confirmColor: '#F0880C',
                success(res) {}
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) {
      return "";
    }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  },
})