const messageCenterAction = require('../../backend/manageAction/messageCenterAction.js');
Page({
  data: {
    activeIndex: '1',
    swiperIndex: '1',
    modalDialog: false,
    WinHeight: null,
    toggleId: 1,
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
    IsnoneMes: false,
    projectMsgTotal: 0
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.onShow();
    return;
  },
  // 加载数据
  onLoad: function(options) {
    // 获取消息总数
    this.getCountMessageNo();

    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 63 + 'px',
    });

    this.getMessageList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMessageList();
    this.getCountMessageNo();
  },

  // 获取消息内容
  getMessageList() {
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    // 获取所有消息
    messageCenterAction.mountedAllMessage(function(res) {
      let messages = res;
      console.log('messageCenterAction');
      console.log(res);
      // 通知公告
      let noticeList = [];
      for (let i = 0; i < 15; i++) {
        let notice = {
          id: i,
          noticeTitle: '你才是了才能分明是你才是' + i,
          context: '你才是了才能分明是你才是了才能分明是你才是了才能分明是你才是了才能分明是你才是了才能分明是 ' + i,
          sendDept: '运营办' + i,
          sendDate: '2019/02/11',
          authRead: '商务经理' + i,
          status: 0,
          imageList: [
            '/images/mesimage1.png',
            '/images/mesimage2.png',
            '/images/mesimage3.png',
            '/images/mesimage1.png',
            '/images/mesimage2.png',
            '/images/mesimage3.png',
          ]
        }
        noticeList.push(notice);
      }
      _this.setData({
        messageList22: messages,
        noticeList: noticeList,
      });

      // 项目消息
      let projectMessageList = [];
      for (let index in messages) {
        let list = [];
        let projectAName = '';
        for (let val of messages[index].messageData) {
          // let val = messages[index].messageData[index2];
          projectAName = val.projectabbreviation;
          let item2 = {
            type: val.messagetype,
            context: val.message,
            date: _this.dateFormat2(val.createat),
            formID: val.formid,
            projectID: messages[index].projectid,
            pointtoID: val.pointtoid,
          }
          list.push(item2);
        }
        let item1 = {
          id: messages[index].projectid,
          projectName: projectAName,
          total: messages[index].messageTotal,
          list: list,
        }
        projectMessageList.push(item1);
      }
      _this.setData({
        projectMessageList: projectMessageList,
      });
      // 关闭加载狂
      wx.hideToast({});
    });
  },
  // 获取消息总数
  getCountMessageNo() {
    let _this = this;
    messageCenterAction.countMessageNo(function(bcountNo) {
      console.log(bcountNo);
      console.log('bcountNo');
      if (bcountNo > 0) {
        // wx.setTabBarBadge({
        //   index: 3,
        //   text: '' + bcountNo
        // })
        _this.setData({
          projectMsgTotal: bcountNo,
        });
      }
    })
  },

  downSwitch(event) {
    // console.log(event.currentTarget.id);
    let index = event.currentTarget.id;
    let showID = this.data.toggleId;
    if (showID === index) {
      index = -1;
    }
    this.setData({
      toggleId: index,
    })
  },

  // 跳转到消息/任务详情页
  navMesSlove(event) {
    let message = event.currentTarget.dataset.index;
    console.log(message);
    // console.log("新建" + message);
    let byTypeTitle = "消息详情"; //消息标题/任务标题
    let messageDemand = '';
    if (message.messageType === 'task') {
      messageDemand = message.messageDemand;
      byTypeTitle = '任务详情'
    }
    wx.navigateTo({
      url: '/pages/messagesolve/messagesolve?formID=' + message.formID +
        "&projectID=" + message.projectID +
        "&byTypeTitle=" + byTypeTitle,
    })
  },

  // 新建任务
  addTask(event) {
    let project = event.currentTarget.dataset.data;
    let projectID = project.id;
    let projectAbbreviation = project.projectName;
    // console.log('console.log(projectAbbreviation)');
    // console.log(projectAbbreviation);
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

  // 消息/公告切换
  bindChange(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.active,
      swiperIndex: e.currentTarget.dataset.active
    })
  },

  downSwitch(event) {
    let index = event.currentTarget.id;
    let showID = this.data.toggleId;
    if (showID === index) {
      index = -1;
    }
    this.setData({
      toggleId: index,
    })
  },

  currentFun(e) {
    this.setData({
      activeIndex: e.detail.current,
      swiperIndex: e.detail.current
    })
  },

  closeFun() {
    this.setData({
      modalDialog: false
    })
  },

  // 查看通知公告明细
  noticeDetail(event) {
    let noticeDetail = event.currentTarget.dataset.item;
    this.setData({
      modalDialog: true,
      noticeDetail: noticeDetail,
    })
  }
})