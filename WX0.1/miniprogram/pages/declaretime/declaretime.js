// pages/declaretime/declaretime.js
const declaretimeAction = require('../../backend/manageAction/declaretimeAction.js');
Page({

  data: {
    declareHidden: true,
    maxlength: -1,
    startDate: '',
    endDate: '',
    seldate: '2019-09-01',
    declareType: [{
      label: '自定义节点',
      value: '0'
    }, {
      label: '定期每月几号',
      value: '1'
    }],
    selType: '',
    chooseSize: false,
    animationData: {},
    Day: '号',
    today: '',
    disabled: true,
    WinHeight: null,
    declaretimeList: [],
  },

  bindDateChange(e) {
    let today = this.data.today;
    if (parseInt(today) < 10) {
      today = '0' + today;
    }
    let toDay2 = today.split("");
    let changeDate = e.detail.value.split("");
    let changeDate2 = changeDate.splice(8, 2, toDay2[0], today[1]);
    this.setData({
      seldate: changeDate.join("")
    })
  },


  onLoad: function(options) {
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 320 + 'px',
      projectID: options.projectID,
    })
    // 获取项目合同时间
    this.getContractInfo(this.data.projectID);
    // 获取项目申报时间列表
    this.getDeclaretimeList(this.data.projectID);
  },

  // 获取项目的合同启止与申报类型
  getContractInfo(projectID) {
    let _than = this;
    declaretimeAction.getDeclaretimeBaseInfo(projectID, function(res) {
      console.log('projectID');
      console.log(res);
      let contractInfo = {
        startDate: res.start_date,
        endDate: res.end_date,
      }
      _than.setData({
        contractInfo: contractInfo,
      })
    });

  },
  // 获取项目申报时间列表
  getDeclaretimeList(projectID) {
    let _than = this;
    declaretimeAction.getDeclaretimeList(projectID, function(res) {
      console.log('resprojectID');
      console.log(res);
      let list = [];
      for (let index in res) {
        let item = {
          cformid: res[index].cformid,
          fdatenode: _than.dateFormat(res[index].fdatenode),
          fnodedeclare: res[index].fnodedeclare,
          status: 'updateDetail',
          cprojectid: projectID,
          remark: '',
        }
        list.push(item);
      }
      _than.setData({
        declaretimeList: list,
      })
    });

  },
  // 确定
  saveDeclaretiemList() {
    let declaretimeList = this.data.declaretimeList;

    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          //提交合同信息
          declaretimeAction.postDeclaretiemList(declaretimeList, function(res) {
            console.log(res);
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: '1'
                })
              }, 1200)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  declareTap() {
    this.setData({
      declareHidden: !this.data.declareHidden
    })
  },

  hiddenDeclareFun() {
    this.declareTap();
  },

  // 时间类型输入
  dayBindInput(e) {
    this.setData({
      today: e.detail.value,
    });
  },

  selType(e) {
    // console.log(e.currentTarget.dataset);
    let valType = e.currentTarget.dataset.value;
    if (valType == '1') {
      this.chooseSezi();
    }
    this.declareTap();
  },

  //自定义节点
  chooseSezi: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },

  //关闭
  hideModal() {
    this.setData({
      chooseSize: false
    })
  },

  InputDay(e) {
    // console.log(e.detail.value);
    this.setData({
      selType: e.detail.value
    })
  },

  // 备注输入
  intoutNoderemark(e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index;
    let list = this.data.declaretimeList;
    list[index].remark = value;
    this.setData({
      declaretimeList: list,
    })
  },

  // 添加一个申报时间
  addDeclareTime(e) {
    let declaretimeList = this.data.declaretimeList;
    // 创建一个新的 declaretime
    let declaretime = {
      fdatenode: '2019-02-22',
      fnodedeclare: '2019-02-22 - 222222',
      status: 'addDetail',
      cprojectid: this.data.projectID,
      remark: '',
    };
    // 放进数组
    declaretimeList.push(declaretime);
    this.setData({
      declaretimeList: declaretimeList,
    })
  },
  // 删除一个申报时间
  deleteDeclareTime(e) {
    let _this = this;
    let declaretimeList = this.data.declaretimeList;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      showCancel: true,
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          declaretimeList[index].status = 'deleteDetail';
          _this.setData({
            declaretimeList: declaretimeList,
          })
        }
      }
    })
  },

  saveDay() {
    this.setData({
      Day: '每月' + this.data.selType + '号',
      chooseSize: false
    })
  },

  // 取消按钮
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 设置成功
  commitDeclareTime() {
    let projectID = this.data.projectID;
    let dateList = this.data.declaretimeList
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          declaretimeAction.postDeclaretiemList(projectID, dateList, function(res) {
            console.log(res);
          })
          wx.showToast({
            title: '设置成功',
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 时间格式化
  dateFormat(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  },
})