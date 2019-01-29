// pages/declaretime/declaretime.js
const declaretimeJS = require('../../action/declaretime.js');
Page({

  data: {
    declareHidden: true,
    startDate: '请选择日期',
    EndDate: '请选择日期',
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
    Day: '每月*号',
    disabled: true,
    WinHeight: null
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 320 + 'px',
      projectID: projectID,
    })
    // 获取项目合同时间
    this.getContractInfo();
    // 获取项目申报时间列表
    this.getDeclaretimeList();
  },

  // 获取项目申报时间列表
  getDeclaretimeList() {
    let _this = this;
    let projectID = this.data.projectID;
    declaretimeJS.getDeclaretimeList(projectID, function(res) {
      console.log(res);
      // 格式化数据
      for (let index in res) {
        res[index].dateNode = _this.dateFormat2(res[index].dateNode);
      }
      _this.setData({
        declaretimeList: res,
      });
    });
  },
  // 获取项目合同时间
  getContractInfo(){
    let _this = this;
    declaretimeJS.getContractInfo(_this.data.projectID, function (res) {
      _this.setData({
        contractInfo: res,
      });
    });
  },


  InputBeginDate(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  InputEndDate(e) {
    this.setData({
      EndDate: e.detail.value
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

  selType(e) {
    console.log(e.currentTarget.dataset);
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
    console.log(e.detail.value);
    this.setData({
      selType: e.detail.value
    })
  },

  // 添加一个申报时间
  addDeclareTime(e) {
    let declaretimeList = this.data.declaretimeList;
    // 创建一个新的 declaretime
    let declaretime = {
      dateNode: '',
      nodeDeclare: '',      
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

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 设置成功
  commitDeclareTime() {
    let projectID = this.data.projectID;
    let dateList = {

    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          declaretimeJS.postDeclaretiemList(projectID, dateList, function(res) {
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

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) { return "未知"; }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  }, 
})