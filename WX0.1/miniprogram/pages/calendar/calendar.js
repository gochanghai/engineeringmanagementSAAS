// 
const calendarAction = require('../../backend/manageAction/calendarAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBgColor: "#04c704",
    cellSize: 42,
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
    chooseDay: null,
    IsToDay: false,
    days: '',
    isNotice: true,
    noticeContent: ''
  },
  //给点击的日期设置一个背景颜色
  dayClick: function(event) {
    let [year, month, day] = [event.detail.year, event.detail.month, event.detail.day];
    this.setData({
      chooseDay: year + "-" + month + "-" + day
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
  onLoad: function() {
    this.setData({
      chooseDay: new Date().getFullYear() + "-" + (1 + new Date().getMonth()) + "-" + new Date().getDate(),
      IsToDay: true,
      days: '今天'
    });
    // 获取消息数据
    this.getMessageByDate('2019-01-19');
  },

  //消息查看
  mesInfo() {
    // wx.switchTab({
    //   url: '/pages/message/message',
    // })

    wx.navigateTo({
      url: '/pages/messagesolve/messagesolve',
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
    calendarAction.getMessageByDate(date, function(res) {
      console.log('calendarAction');
      console.log(res);
      let list = [{
          title: '产值',
          lightColor: '#FCD147',
          list: ''
        }, {
          title: '回款',
          lightColor: '#FCD147',
          list: ''
        },
        {
          title: '保险',
          lightColor: '#f25022',
          list: ''
        },
        {
          title: '安全交底',
          lightColor: '#f25022',
          list: ''
        },
        {
          title: '安全教育',
          lightColor:'#f25022',
          list: ''
        }
      ];
      let newList = [];
      for(let index in list){
        let messageList = [];
        for (let i = 0; i < 10; i++) {
          let item = {
            id: i,
            type: '',
            projectID: i + 1,            
            lightColor: list[index].lightColor,
            projectName: 'calendarAction' + i + 0,
            content: 'calendarActioncalendarActioncalendarActioncalendarAction2019-02-20'
          }
          messageList.push(item);
        }
        let item2 = {
          title: list[index].title + '(' + messageList.length + ')',
          list: messageList,
        }
        newList.push(item2);
      }
      _than.setData({
        dataList: newList,
      });
      if (_than.data.days === '今天') {
        // 广播内容
        _than.getNoticeContent(res);
      }
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