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
    today: '1',
    disabled: true,
    WinHeight: null,
    declaretimeList: [],
    pickerDateStart: '2019-01-01',
    // 是否有原始时间列表
    isOldDateList: true,
    dayDisabled: true,
    btnType: '设 置'
  },

  // 节点修改时间
  bindDateChange(e) {
    let today = this.data.today;
    if (parseInt(today) < 10) {
      today = '0' + today;
    }
    let toDay2 = today.split("");
    let changeDate = e.detail.value.split("");
    let changeDate2 = changeDate.splice(8, 2, toDay2[0], today[1]);

    let list = this.data.declaretimeList;
    let index = e.currentTarget.dataset.index;
    list[index].fdatenode = changeDate.join("");
    this.setData({
      seldate: changeDate.join(""),
      declaretimeList: list,
    })
  },

  // 提交按钮
  settingDay(e) {
    console.log(e.currentTarget.dataset.type);
    let type = e.currentTarget.dataset.type;
    this.setData({
      dayDisabled: false,
      btnType: '提 交'
    })
    if (type === '提 交') {
      console.log("Commit..")
      if (this.data.declaretimeList.length <= 0){
        let startDate = this.data.contractInfo.startDate;
        let endDate = this.data.contractInfo.endDate;        
        let list = this.setNewDateTableList(startDate, endDate, this.data.today);
        let dateList = [];
        for(let item of list){
          let node = {
            fdatenode: item,
            fnodedeclare: '',
            status: 'addDetail',
            cprojectid: this.data.projectID,
          };
          dateList.push(node);
        }
        this.setData({
          dataList: list,
          declaretimeList: dateList,
        })
        
      }      
    }
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
        pickerDateStart: res.start_date,
      }
      _than.setData({
        contractInfo: contractInfo,
        today: res.countconfirmnodes,
      });      
    });

  },
  // 获取项目申报时间列表
  getDeclaretimeList(projectID) {
    let _than = this;
    declaretimeAction.getDeclaretimeList(projectID, function(res) {
      console.log('resprojectID');
      console.log(res);
      let list = [];
      for (let item of res) {
        let item2 = {
          cformid: item.formid,
          fdatenode: _than.dateFormat(item.datenode),
          fnodedeclare: item.nodedeclare,
          status: item.status,
          cprojectid: projectID,
          // remark: '',
        }
        list.push(item2);
      }
      _than.setData({
        declaretimeList: list,
        isOldDateList: list.length > 0,
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
    console.log(e.detail.value);
    this.setData({
      selType: e.detail.value
    })
  },

  // 备注输入
  intoutNoderemark(e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index;
    let list = this.data.declaretimeList;
    list[index].nodedeclare = value;
    this.setData({
      declaretimeList: list,
    })
  },

  // 添加一个申报时间
  addDeclareTime(e) {
    let declaretimeList = this.data.declaretimeList;
    // 创建一个新的 declaretime
    let declaretime = {
      fdatenode: this.data.seldate,
      fnodedeclare: '',
      status: 'addDetail',
      cprojectid: this.data.projectID,
      // remark: '',
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
          // 如果status == updateDetail 假删除 ，否则把新增的节点移除
          if (declaretimeList[index].status == 'updateDetail') {
            declaretimeList[index].status = 'deleteDetail';
          } else {
            declaretimeList.splice(index, 1);
          }
          // declaretimeList[index].status = 'deleteDetail';
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

  // =================== 生成新的时间申报列表 start ==========================
  setNewDateTableList(startDate, endDate, today) {
    let dateList = [];
    let yyyy1 = parseInt(startDate.substring(0, 4));
    let yyyy2 = parseInt(endDate.substring(0, 4));
    let mm1 = parseInt(startDate.substring(5, 7));
    let mm2 = parseInt(endDate.substring(5, 7));
    console.log('1 + yyyy1' + startDate + endDate);
    let day = today || '01';
    if (parseInt(today) < 10) {
      today = '0' + today;
    } else {
      day = today;
    }   
    let ynum = yyyy2 - yyyy1
    for (let i = 1; i <= ynum+1; i++) {                  
      if (i == 1 && mm1 == 12) {
        continue;
      } else if (i == 1 && mm1 < 12) {
        console.log('yyyy1' + yyyy1);
        // 下一个月开始申报
        mm1 += 1;
        for (mm1; mm1 <= 12; mm1++) {
          console.log('' + yyyy1 + '-' + mm1 + '-' + day);
          let time = '' + yyyy1 + '-' + mm1 + '-' + day;
          dateList.push(time);
        }
      } else if (i == ynum+1) {
        console.log('ynum' + ynum);
        for (let j = 0; j < mm2-1; j++) {
          if ((j + 1) < 10) {
            console.log('' + yyyy1 + '-0' + (j + 1) + '-' + day);
            let time = '' + yyyy1 + '-0' + (j + 1) + '-' + day;
            dateList.push(time);
          } else {
            console.log('' + yyyy1 + '-' + (j + 1) + '-' + day);
            let time = '' + yyyy1 + '-' + (j + 1) + '-' + day;
            dateList.push(time);
          }

        }
      } else {
        for (let j = 0; j < 12; j++) {
          if (j + 1 < 10) {
            console.log('' + yyyy1 + '-0' + (j + 1) + '-' + day);
            let time = '' + yyyy1 + '-0' + (j + 1) + '-' + day;
            dateList.push(time);
          } else {
            console.log('' + yyyy1 + '-' + (j + 1) + '-' + day);
            let time = '' + yyyy1 + '-' + (j + 1) + '-' + day;
            dateList.push(time);
          }
        }
      }
      yyyy1++;      
    }
    return dateList;    
  },
  // ============================ 生成新的时间申报列表 end =========================

  // 确定按钮函数
  commitDeclareTime() {
    let _than = this;
    let projectID = this.data.projectID;
    let dateList = this.data.declaretimeList
    console.log(dateList)
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          if(_than.data.isOldDateList == true){
            declaretimeAction.postDeclaretiemList( dateList, function (res) {
              console.log(res);
              if (res.code == 1) {
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
              }
            })
          }else{
            // 申报节点个数为0的时候更新申报日并新建申报时间列表
            let fconfirmdate = _than.data.today;
            let fdateList = _than.data.declaretimeList;
            let cprojectid = _than.data.projectID;
            declaretimeAction.bornDeclaretiemList(fconfirmdate, fdateList, cprojectid, function (res) {
              console.log(res.code)
              if (res.code == 1) {
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
              }
            })
          }     
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
    if (val.length >= 10) {
      return val.substring(0, 10);
    }
    return val;
  },

})