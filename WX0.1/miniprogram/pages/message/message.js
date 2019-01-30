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
    // 获取消息总数
    this.getCountMessageNo();
  },
  // 加载数据
  onLoad: function(options) {
    this.getMessageList();
    // 获取消息总数
    this.getCountMessageNo();
  },


  // 获取消息内容
  getMessageList() {
    let _this = this;
    // 获取所有消息
    messageCenterJS.mountedAllMessage(function (res) {
      let messages = res;
      // 格式化时间
      for (let index in messages) {
        for (let index2 in messages[index].messageData) {
          messages[index].messageData[index2].createDate = _this.dateFormat2(messages[index].messageData[index2].createAt);
          messages[index].messageData[index2].createAt = _this.dateFormat(messages[index].messageData[index2].createAt);
        }
      }
      _this.setData({
        messageList: messages,
      });
    })
  },
  // 获取消息总数
  getCountMessageNo() {
    let _this = this;
    messageCenterJS.countMessageNo(function (countTotal) {
      if(countTotal > 0){
        wx.setTabBarBadge({
          index: 3,
          text: '' + countTotal
        })
      }      
    })
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

  // 跳转到消息详情页
  navMesSlove(event) {
    let message = event.currentTarget.dataset.index;
    console.log("新建" + message);
    wx.navigateTo({
      url: '/pages/messagesolve/messagesolve?formId=' + message.formId + 
        "&messageType=" + message.messageType + 
        "&createAt=" + message.createAt + 
        "&messageModule=" + message.messageModule + 
        "&message=" + message.message + 
        "&projectAbbreviation=" + message.projectAbbreviation + 
        "&status=" + message.status + 
        "&pointToID=" + message.pointToID + 
        "&projectID=" + message.projectID,
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