// 
const calendarAction = require('../../backend/manageAction/calendarAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBgColor: "#04c704",
    cellSize: 42,
    scrollLeft: 0,
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      }
    ],
    scrollAnimation: true,
    chooseDay: null,
    IsToDay: false,
    days: '',
    isNotice: true,
    noticeContent: '',
    toMonth: null,
    windowHeight: null,
    selectModuleIndex: 0,
    heightView: ''
  },
  //给点击的日期设置一个背景颜色
  dayClick: function(event) {
    let [year, month, day] = [event.detail.year, event.detail.month, event.detail.day];
    this.setData({
      chooseDay: year + "-" + month + "-" + day,
    })
    if (this.data.dayStyle[0].day.toString() == day) {
      this.setData({
        IsToDay: true,
        days: '今天'
      })
    } else if (this.data.dayStyle[0].day.toString() == day - 1) {
      this.setData({
        IsToDay: true,
        days: '明天'
      })
    } else if (this.data.dayStyle[0].day.toString() - 1 == day) {
      this.setData({
        IsToDay: true,
        days: '昨天'
      })
    } else {
      this.setData({
        IsToDay: false,
        days: ''
      })
    }

    // console.log(this.data.chooseDay);
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#FFA268"
    })
    // console.log(this.data.dayStyle);
    // 获取某一天的消息
    this.getMessageByDate(this.data.chooseDay);

  },

  //下一月
  next(e) {
    let toMonth = this.data.toMonth;
    if (toMonth < e.detail.currentMonth) {
      this.dayChange();
    } else if (toMonth == e.detail.currentMonth) {
      this.MonthCurrent();
    }
  },

  //上一月
  prev: function(e) {
    let toMonth = this.data.toMonth;
    if (toMonth == e.detail.currentMonth) {
      this.MonthCurrent();
    } else if (toMonth > e.detail.currentMonth) {
      this.dayChange();
    }
  },

  //手动选择月
  dateChange: function(e) {
    let toMonth = this.data.toMonth;
    if (toMonth < e.detail.currentMonth || toMonth > e.detail.currentMonth) {
      this.dayChange();
    } else {
      this.MonthCurrent();
    }
  },

  //选择其他月份的某一天
  dayChange() {
    this.setData({
      dayStyle: [{
        month: 'current',
        day: "",
        color: 'white',
        background: '#AAD4F5'
      }, {
        month: 'current',
        day: "",
        color: 'white',
        background: '#AAD4F5'
      }]
    })
  },

  selModule(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.scrollLeft(index);
    this.setData({
      selectModuleIndex: e.currentTarget.dataset.index
    })
  },

  currentFun(e) {
    let length = this.data.dataList[e.detail.current].list.length;
    if (length <= 2) {
      this.setData({
        heightView: 2 * 132 + 'rpx'
      })
    } else {
      this.setData({
        heightView: length * 132 + 'rpx'
      })
    }
    this.setData({
      selectModuleIndex: e.detail.current,
      swiperIndex: e.detail.current
    })
    this.scrollLeft(e.detail.current);
  },

  //滚动时动态设置滚动条位置
  scrollLeft(index) {
    if (index <= 4) {
      if (index >= 3) {
        this.setData({
          scrollLeft: index * 54
        })
      } else if (index <= 3) {
        this.setData({
          scrollLeft: 0
        })
      }
    }
  },

  //如果当前显示的是本月全月日历
  MonthCurrent() {
    let dayStyle = [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      }
    ];
    this.setData({
      dayStyle: dayStyle
    })
  },

  onLoad: function() {
    this.setData({
      chooseDay: new Date().getFullYear() + "-" + (1 + new Date().getMonth()) + "-" + new Date().getDate(),
      IsToDay: true,
      days: '今天',
      toMonth: new Date().getMonth() + 1,
      windowHeight: wx.getSystemInfoSync().windowHeight + 'px'
    });
    // 获取消息数据
    this.getMessageByDate(this.data.chooseDay);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMessageByDate(this.data.chooseDay);
  },

  //消息查看
  mesInfo(event) {
    let message = event.currentTarget.dataset.data;
    let byTypeTitle = "消息详情"; //消息标题/任务标题
    if (message.type === 'task') {
      byTypeTitle = '任务详情'
    }
    wx.navigateTo({
      url: '/pages/messagesolve/messagesolve?formID=' + message.formID +
        "&projectID=" + message.projectID +
        "&byTypeTitle=" + byTypeTitle,
    })
  },

  //关闭通知
  noticeClose() {
    this.setData({
      isNotice: false
    })
  },

  // 按日返回消息列表
  getMessageByDate(date) {
    let _than = this;
    this.setData({
      selectModuleIndex: 0
    });
    // 打开加载框
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    calendarAction.getMessageByDate(date, function(res) {
      console.log(res.confirmvalue.length);
      if (res.confirmvalue.length <= 2) {
        _than.setData({
          heightView: 2 * 132 + 'rpx'
        })
      } else {
        _than.setData({
          heightView: res.confirmvalue.length * 132 + 'rpx'
        })
      }
      console.log('calendarAction');
      console.log(date);
      console.log(res);
      let moduleList = [{
          title: '产值',
          lightColor: '#FCD147',
          list: res.confirmvalue
        }, {
          title: '回款',
          lightColor: '#FCD147',
          list: res.recievedpay
        },
        {
          title: '保险',
          lightColor: '#f25022',
          list: res.insurance
        },
        {
          title: '安全交底',
          lightColor: '#f25022',
          list: res.disclose
        },
        {
          title: '安全教育',
          lightColor: '#f25022',
          list: res.education
        },
        {
          title: '进度',
          lightColor: '#FCD147',
          list: res.progress
        },
        {
          title: '安全',
          lightColor: '#f25022',
          list: res.security
        }
      ];
      let newList = [];
      let totalMessage = 0;
      for (let index in moduleList) {
        let messageList = [];
        for (let index2 in moduleList[index].list) {
          let message = moduleList[index].list[index2];
          let item = {
            id: message.formid,
            type: message.messagetype,
            projectID: message.projectid,
            formID: message.formid,
            lightColor: moduleList[index].lightColor,
            projectName: message.projectabbreviation,
            content: message.message,
            // content: _than.valueSubString(message.message),
          }
          messageList.push(item);
        }
        let item2 = {
          title: moduleList[index].title + '(' + messageList.length + ')',
          list: messageList,
        }
        newList.push(item2);
        totalMessage += messageList.length;
      }
      _than.setData({
        dataList: newList,
        totalMessage: totalMessage,
      });
      if (_than.data.days === '今天') {
        // 广播内容
        // _than.getNoticeContent(res);
      }
      // 关闭加载框
      wx.hideToast({});
    })
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
  // 时间格式化
  valueSubString(val) {
    if (val.length > 80) {
      return val.substring(0, 40) + "...";
    }
    return val;
  },
  // 通知内容整合
  getNoticeContent(val) {
    // console.log('val.confirmvalue');
    let noticeContent = '';
    let confirmvalue = val.confirmvalue;
    for (let item in confirmvalue) {
      noticeContent = noticeContent + '【' + confirmvalue[item].projectAbbreviation + '】' +
        confirmvalue[item].message + '        '
    }
    let recievedpay = val.recievedpay;
    for (let item in recievedpay) {
      noticeContent = noticeContent + '【' + recievedpay[item].projectAbbreviation + '】' +
        recievedpay[item].message + '        '
    }
    let education = val.education;
    for (let item in education) {
      noticeContent = noticeContent + '【' + education[item].projectAbbreviation + '】' +
        education[item].message + '        '
    }
    let insurance = val.insurance;
    for (let item in insurance) {
      noticeContent = noticeContent + '【' + insurance[item].projectAbbreviation + '】' +
        insurance[item].message + '        '
    }

    // 根据广播内容来判断是否打开广播
    let isNotice = true;
    if (noticeContent === '') {
      isNotice = false
    }
    this.setData({
      noticeContent: noticeContent,
      isNotice: isNotice
    })
  }

})