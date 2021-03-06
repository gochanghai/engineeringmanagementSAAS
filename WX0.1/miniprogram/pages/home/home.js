// pages/home/home.js
var wxCharts = require('../../utils/wxcharts.js');
const storageJS = require('../../static/storage.js');
const statisticalAction = require('../../backend/manageAction/statisticalAction.js');
const messageCenterAction = require('../../backend/manageAction/messageCenterAction.js');
const statisticalSaaSAction = require('../../backend/saasAction/statisticalAction.js');
Page({
  data: {
    windowWidth: null,
    outValueDates: [],
    outValueDate: [],
    sumProjectMoney: null,
    moneySwitch: false,
    like: '/images/logo@2x.png',
    avatarUrl: '',    
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.onShow();
    return;
  },

  switch1Change(e) {
    this.setData({
      moneySwitch: e.detail.value,
    })
  },

  // 跳转到项目列表
  navProjectList() {
    wx.navigateTo({
      url: '/pages/projectlist/projectlist',
    })
  },

  shenhauDetail() {
    wx.navigateTo({
      url: '/pages/shenhua/shenhua',
    })
  },

  // 产值图表
  ChartData: function(categories, datas) {
    new wxCharts({
      canvasId: 'Canvas1',
      type: 'line',
      animation: true,
      categories: categories,
      series: [{
        name: ' ',
        data: datas,
        animation: true,
        format: function(val, name) {
          return (val / 10000).toFixed(2) + '万';
        }
      }],
      xAxis: { //是否隐藏x轴分割线
        disableGrid: true,
        fontColor: '#000'
      },
      yAxis: {
        format: function(val) {
          return (val / 10000000).toFixed(2);
        },
        // title: '确认产值(亿元)', 
        // disabled:true,
        gridColor: '#ffffff',
        fontColor: '#000',
        min: 0
      },
      extra: {
        column: {
          width: 100
        },
        lineStyle: 'curve' //曲线
      },
      legend: false,
      width: this.data.windowWidth - 30,
      height: 160,
      dataLabel: true, //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
    });
  },
  // 安全图表
  ChartData2: function(seriesData) {
    new wxCharts({
      canvasId: 'Canvas2',
      type: 'column',
      categories: [' '],
      series: seriesData,
      yAxis: {
        format: function(val) {
          return val;
        },
        gridColor: '#ffffff',
        fontColor: '#000',
        min: 0
      },
      xAxis: {
        disableGrid: true,
      },
      width: this.data.windowWidth - 210,
      height: 130,
      dataLabel: false,
      legend: false,
      extra: {
        column: {
          width: 20 //柱的宽度
        }
      }
    });
  },
  // 进度图表
  ChartData3: function(series) {
    new wxCharts({
      canvasId: 'Canvas3',
      type: 'ring',
      extra: {
        ringWidth: 20, //圆环的宽度
        pie: {
          offsetAngle: -45 //圆环的角度
        }
      },
      series: series,
      legend: false,
      width: this.data.windowWidth - 180,
      height: 170,
      dataLabel: false,
    });
  },

  onLoad: function(options) {
    let _this = this;
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth
    });
    // 获取用户 姓名、公司、职位信息
    // this.setData({
    //   headimg: '',
    //   userName: storageJS.getUser().userName,
    //   userArea: storageJS.getUser().userArea,
    //   userPostion: storageJS.getUser().userTitle,
    //   avatarUrl: getApp().globalData.avatarUrl,
    // })

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });

    let series = [{
      name: '安全人数',
      data: [0],
      color: "#B122E6"
    }, {
      name: '未交底人数',
      data: [0],
      color: "#F5317F"
    }, {
      name: '未教育人数',
      data: [0],
      color: "#FF8359"
    }, {
      name: '未参保人数',
      data: [0],
      color: "#3399FF"
    }];
    this.ChartData2(series);
    

    // 关闭加载框
    wx.hideToast({});

    // console.log("s" + _this.data.graphOutputValue);
    // wx.setTabBarBadge({
    //   index: 3,
    //   text: '100'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      headimg: '',
      userName: storageJS.getUser().userName,
      userArea: storageJS.getUser().userArea,
      userPostion: storageJS.getUser().userTitle,
      avatarUrl: getApp().globalData.avatarUrl,
      avatarUrl: wx.getStorageSync('avatarUrl'),
    })
    // 获取项目金额数据
    this.getSumProjectMoney();
    // 获取产值数据    
    this.getGraphOutputValue();
    // 获取安全数据
    this.getGraphSecurity();
    // 获取消息总数
    this.getCountMessageNo();
    this.getGraphProgressData();
  },  

  // 获取项目金额数据
  getSumProjectMoney() {
    let _than = this;
    statisticalSaaSAction.getPStatis(function(res) {
      console.log('getPStatis');
      console.log(res);
      _than.setData({
        contractAmount: _than.getMoneyFormat(res.contractamountsum),
        totalReturnAmount: _than.getMoneyFormat(res.actualreceivamountsum),
        totalOutputvalue: _than.getMoneyFormat(res.outputvaluesum),
        totalUnReturnAmount: _than.getMoneyFormat(res.outputvaluesum - res.actualreceivamountsum),
      });

    })
  },
  // 获取产值数据
  getGraphOutputValue() {
    let _than = this;
    statisticalAction.getGraphOutputValue(function(res) {
      console.log('getGraphOutputValue');
      // console.log(res);
      let categories = [];
      let datas = [];
      let newList = [];
      for (let item of res) {
        // console.log(item);
        let newItem = {
          date: item.statisDate,
          number: item.sumOutputValue
        }
        categories.push(item.statisDate);
        datas.push(item.sumOutputValue);
        newList.push(newItem);
      }
      _than.setData({
        outputValueList: newList,
        // categories: categories,
        // datas: datas
      });
      _than.ChartData(categories, datas);
    })
  },

  // 获取安全数据
  getGraphSecurity() {
    let _than = this;
    statisticalAction.getGraphSecurity(function(res) {
      console.log('graphSecurity');
      // console.log(res);
      let securityData = {
        totalWorker: res.totalWorker,
        totalUnDisclose: res.totalUnDisclose,
        totalUnEducation: res.totalUnEducation,
        totalUnInsurance: res.totalUnInsurance,
      };
      let isSecurityChart = false;
      // 判断是否有数据
      if (securityData.totalWorker != 0 || securityData.totalUnDisclose != 0 || securityData.totalUnEducation != 0 || securityData.totalUnInsurance != 0) {
        isSecurityChart = true;
      }
      _than.setData({
        securityData: securityData,
        isSecurityChart: isSecurityChart,
      });

      let series = [{
        name: '安全人数',
        data: [securityData.totalWorker],
        color: "#B122E6"
      }, {
        name: '未交底人数',
        data: [securityData.totalUnDisclose],
        color: "#F5317F"
      }, {
        name: '未教育人数',
        data: [securityData.totalUnEducation],
        color: "#FF8359"
      }, {
        name: '未参保人数',
        data: [securityData.totalUnInsurance],
        color: "#3399FF"
      }];

      _than.ChartData2(series);
    })
  },

  getGraphProgressData() {
    let _than = this;
    statisticalSaaSAction.getGraphProgressData(function(res) {
      console.log('getGraphProgressData');
      // console.log(res);
      // 设置进度图表数据
      let progressData = {
        unOutputValue: _than.getMoneyFormat(res.outputvaluerest / 10000),
        // unconfirmValue: _than.getMoneyFormat(res.outputvaluerest / 10000),
        actualreceivAmount: _than.getMoneyFormat(res.actualreceivamountsum / 10000),
        receivablePay: _than.getMoneyFormat(res.receivablepaysum / 10000),
      };
      let series = [{
        name: '未完成产值',
        data: parseInt(res.outputvaluerest / 1000000),
        stroke: false
      }, {
        name: '累计回款',
        data: parseInt(res.actualreceivamountsum / 1000000),
        stroke: false
      }, {
        name: '可回款',
        data: parseInt(res.receivablepaysum / 1000000),
        stroke: false
      }];
      console.log(series)
      _than.ChartData3(series);
      let isProgressChart = false;
      // 判断是否有数据
      if (res.receivablePay != null && res.actualreceivamountsum != null && res.outputvaluerest != null) {
        isProgressChart = true;
      }
      _than.setData({
        progressData: progressData,
        isProgressChart: true,
      })
    })

  },

  // 获取消息总数
  getCountMessageNo() {
    let _than = this;
    messageCenterAction.countMessageNo(function(res) {
      // countTotal = 0;
      console.log('countTotal');
      console.log(res);
      if (res > 0) {
        // wx.setTabBarBadge({
        //   index: 3,
        //   text: '' + res
        // })
      }
    })
  },

  //项目详情
  projectDetails() {
    wx.navigateTo({
      url: '/pages/projectlist/projectlist',
    })
  },

  // 头像放大
  imagePreview() {
    wx.previewImage({
      current: this.data.avatarUrl,
      urls: [this.data.avatarUrl]
    })
  },

  //图表刷新
  refreshChart(e) {
    let sizeCanvas = e.currentTarget.dataset.canvas;
    if (sizeCanvas === "产值") {
      this.getGraphOutputValue();
    } else if (sizeCanvas === "安全") {
      this.getGraphSecurity();
    } else {
      this.getGraphProgressData();
    }
  },

  //财务金额格式化
  getMoneyFormat(val) {
    var str = parseInt(val).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf("."));
    var ret = intSum + dot;
    return ret;
  },
  
  valueUndefinedRsturn0(val) {
    if ('undefined' != val || '' != val || null != val) {
      return 0;
    }
    return val;
  }
})