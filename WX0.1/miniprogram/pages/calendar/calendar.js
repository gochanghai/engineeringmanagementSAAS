const calendarJS = require('../../action/calendar.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBgColor: "#04c704",
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
    IsNotice: true,
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

    console.log(this.data.chooseDay);
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#FFA268"
    })
    console.log(this.data.dayStyle);
    // 清空数据
    this.setData({
      confirmvalueMessages: [],
      recievedpayMessages: [],
      insuranceMessages: [],
      discloseMessages: [],
      educationMessages: [],
      confirmvalueNum: 0,
      recievedpayNum: 0,
      insuranceNum: 0,
      discloseNum: 0,
      educationNum: 0,
    });
    // 获取某一天的消息
    this.getThisDateMsaaage(this.data.chooseDay);

  },
  onLoad: function() {
    this.setData({
      chooseDay: new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate(),
      IsToDay: true,
      days: '今天'
    });
    // 按日统计消息数据
    this.getThisDateMsaaage(this.data.chooseDay);
  },

  //消息查看
  mesInfo() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },

  //关闭通知
  noticeClose() {
    this.setData({
      IsNotice: false
    })
  },

  // 按日统计消息数据
  getThisDateMsaaage(chooseDay) {
    let _this = this;
    calendarJS.getMessageByDate(chooseDay, function(res) {
      console.log('calendarJS');
      console.log(res.confirmvalue.length);
      console.log(res);
      // _this.getchooseDayMessage(_this.data.chooseDay,res);
      _this.setData({
        message: res,
      })

      _this.setData({
        confirmvalueMessages: res.confirmvalue,
        recievedpayMessages: res.recievedpay,
        insuranceMessages: res.insurance,
        discloseMessages: res.disclose,
        educationMessages: res.education,
        confirmvalueNum: res.confirmvalue.length,
        recievedpayNum: res.recievedpay.length,
        insuranceNum: res.insurance.length,
        discloseNum: res.disclose.length,
        educationNum: res.education.length,
      });
      if (_this.data.days === '今天') {
        // 广播内容
        _this.getNoticeContent(res);
      }
    })
  },
  // 消息数据过滤函数
  getchooseDayMessage(date, data) {
    let _this = this;
    // 格式化数据
    let confirmvalueMessages = [];
    let recievedpayMessages = [];
    let insuranceMessages = [];
    let discloseMessages = [];
    let educationMessages = [];
    date = '' + date + '';
    // 产值
    let confirmvalue = data.confirmvalue;
    for (let index in confirmvalue) {
      console.log('confirmvalue' + date);
      console.log(confirmvalue[index].createAt);
      if (date === _this.dateFormat2(confirmvalue[index].createAt)) {
        console.log('confirmvalue12: ' + date);
        confirmvalueMessages.push = confirmvalue[index];
      }
    }
    // 回款
    let recievedpay = data.recievedpay;
    for (let index in recievedpay) {
      console.log('recievedpay[index].createAt' + date);
      console.log(recievedpay[index].createAt);
      if (date === _this.dateFormat2(recievedpay[index].createAt)) {
        recievedpayMessages.push = recievedpay[index];
      }
    }
    // 安全
    let insurance = data.insurance;
    for (let index in insurance) {
      if (date === _this.dateFormat2(insurance[index].createAt)) {
        insuranceMessages.push = insurance[index];
      }
    }
    // 安全交底
    let disclose = data.disclose;
    for (let index in disclose) {
      if (date === _this.dateFormat2(disclose[index].createAt)) {
        discloseMessages.push = disclose[index];
      }
    }
    // 安全教育
    let education = data.education;
    for (let index in education) {
      if (date === _this.dateFormat2(education[index].createAt)) {
        educationMessages.push = education[index];
      }
    }
    // 设置数据
    this.setData({
      confirmvalueMessages: confirmvalueMessages,
      recievedpayMessages: recievedpayMessages,
      insuranceMessages: insuranceMessages,
      discloseMessages: discloseMessages,
      educationMessages: educationMessages,
      confirmvalueNum: confirmvalueMessages.length,
      recievedpayNum: recievedpayMessages.length,
      insuranceNum: insuranceMessages.length,
      discloseNum: discloseMessages.length,
      educationNum: confirmvalueMessages.length,
    });
  },

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) {
      return "未知";
    }
    let date = val.substring(0, 10);
    console.log(date);
    return date;
  },
  // 通知内容整合
  getNoticeContent(val) {
    console.log('val.confirmvalue');
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

    this.setData({
      noticeContent: noticeContent
    })
  }

})