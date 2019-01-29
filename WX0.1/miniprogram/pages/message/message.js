const messageCenterJS = require('../../action/messageCenter.js');
Page({
  data: {
    BgColorStatus: '#fcd147',
    BgIColorStatus: '#f25022',
    toggleStyle: {
      heightSel: 'auto',
      imgSel: '/images/up.png',
      height: '100rpx',
      img: '/images/down.png'
    },
    toggleId: 0,
    containerSty: 'container',
    IsnoneMes: false
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.getMessageList();
  },
  // 加载数据
  onLoad: function(options) {
    this.getMessageList();
  },


  // 获取消息内容
  getMessageList() {
    let _this = this;
    // 获取风险消息
    messageCenterJS.mountedRiskMessage(function(res) {
      var riskmessage = res;
      console.log("riskmessage");
      console.log(riskmessage.length);
      if (riskmessage.length == 0) {
        _this.setData({
          IsnoneMes: true
        })
      } else {
        // 格式化时间
        for (let index in riskmessage) {
          for (let index2 in riskmessage[index].messageData) {
            riskmessage[index].messageData[index2].createDate = _this.dateFormat2(riskmessage[index].messageData[index2].createAt);
            riskmessage[index].messageData[index2].createAt = _this.dateFormat(riskmessage[index].messageData[index2].createAt);
          }
        }
        _this.setData({
          riskmessage: riskmessage,
        });
      }
    });
    // 获取任务消息
    messageCenterJS.mountedTaskMessage(function(res) {
      var taskmessage = res;
      console.log("taskmessage");
      console.log(taskmessage);
      // 格式化时间
      for (let index in taskmessage) {
        for (let index2 in taskmessage[index].messageData) {
          taskmessage[index].messageData[index2].createDate = _this.dateFormat2(taskmessage[index].messageData[index2].createAt);
          taskmessage[index].messageData[index2].createAt = _this.dateFormat(taskmessage[index].messageData[index2].createAt);
        }
      }
      _this.setData({
        taskmessage: taskmessage,
      });
    });
  },

  downSwitch(event) {
    console.log(event.currentTarget.id);
    let index = event.currentTarget.id;
    let showID = this.data.toggleId;
    if (showID === index) {
      index = -1;
    }
    this.setData({
      toggleId: index,
    })
  },

  // addTask() {
  //   console.log("新建")
  // },

  navMesSlove(event) {
    let message = event.currentTarget.dataset.index;
    console.log("新建" + message);
    wx.navigateTo({
      url: '/pages/messagesolve/messagesolve?formId=' + message.formId + "&messageType=" + message.messageType + "&createAt=" + message.createAt + "&message=" + message.message + "&projectID=" + message.projectID,
    })
  },

  // 新建任务
  addTask(event) {
    let projectID = event.currentTarget.dataset.index.projectID;
    let projectAbbreviation = event.currentTarget.dataset.index.projectAbbreviation;
    wx.navigateTo({
      url: '/pages/addtask/addtask?projectID=' + projectID + "&projectAbbreviation=" + projectAbbreviation,
    })
  },

  // 时间格式化 2019-01-24 09:30:00
  dateFormat(val) {
    let date = val.substring(0, 10) + " " + val.substring(11, 19);
    // console.log(date);
    return date;
  },

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  },
})