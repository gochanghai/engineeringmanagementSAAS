var wxCharts = require('../../utils/wxcharts.js');
const statisticalJS = require('../../action/statistical.js');
const messageCenterJS = require('../../action/messageCenter.js');
// pages/home/home.js
Page({
  data: {
    windowWidth: null,
    outValueDates: [],
    outValueDate: [],
    sumProjectMoney: null
  },
  
  //下拉刷新
  onPullDownRefresh: function() {
    // // 获取项目金额数据
    // this.getSumProjectMoney();
    // // 获取产值数据    
    // this.getGraphOutputValue();
    // // 获取安全数据
    // this.getGraphSecurity();
    this.onShow();
    return ;
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
        gridColor: '#7cb5ec'
      },
      yAxis: {
        format: function(val) {
          return (val / 100000000).toFixed(2);
        },
        title: '确认产值(亿元)',
        // disabled:true,
        gridColor: '#ffffff',
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
  ChartData2: function(series) {
    new wxCharts({
      canvasId: 'Canvas2',
      type: 'ring',
      extra: {
        ringWidth: 24, //圆环的宽度
        pie: {
          offsetAngle: -45 //圆环的角度
        }
      },
      series: series,
      width: this.data.windowWidth - 180,
      height: 220,
      dataLabel: false,
    });
  },
  // 进度图表
  ChartData3: function(series) {
    new wxCharts({
      canvasId: 'Canvas3',
      type: 'ring',
      extra: {
        ringWidth: 24, //圆环的宽度
        pie: {
          offsetAngle: -45 //圆环的角度
        }
      },
      series: series,
      width: this.data.windowWidth - 180,
      height: 220,
      dataLabel: false,
    });
  },

  onLoad: function(options) {
    let _this = this;
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth
    });

    // 获取项目金额数据
    this.getSumProjectMoney();
    // 获取产值数据    
    this.getGraphOutputValue();
    // 获取安全数据
    this.getGraphSecurity();
    // 获取消息总数
    this.getCountMessageNo();

    // console.log("s" + _this.data.graphOutputValue);
    // wx.setTabBarBadge({
    //   index: 3,
    //   text: '100'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  // 获取项目金额数据
  getSumProjectMoney() {
    let _this = this;
    statisticalJS.sumProjectMoney(function(res) {
      var sumProjectMoney = res;
      // console.log("sumProjectMoney");
      // console.log(sumProjectMoney);
      let amount = _this.getMoneyFormat(sumProjectMoney.totalReceivableAmount_ActualReceivAmount)
      _this.setData({
        sumProjectMoney: sumProjectMoney,
        totalReceivableAmount_ActualReceivAmount: amount,
        totalAmount: _this.getMoneyFormat(sumProjectMoney.totalAmount),
        totalOutputvalue: _this.getMoneyFormat(sumProjectMoney.totalOutputvalue),
        actualReceivAmount: _this.getMoneyFormat(sumProjectMoney.actualReceivAmount),
        actualReceivAmount1: _this.getMoneyFormat((sumProjectMoney.actualReceivAmount) / 1000),
        shouldReceivAmount: _this.getMoneyFormat((sumProjectMoney.totalReceivableAmount_ActualReceivAmount) / 10000),
        unOutvalueAmount: _this.getMoneyFormat((sumProjectMoney.totalAmount - sumProjectMoney.totalOutputvalue) / 10000),
      });
      // 设置进度图表数据
      let series = [{
        name: '未完成产值',
        data: (sumProjectMoney.totalAmount - sumProjectMoney.totalOutputvalue) / 10,
        stroke: false
      }, {
        name: '未确认产值',
        data: sumProjectMoney.actualReceivAmount,
        stroke: false
      }, {
        name: '累计回款',
        data: sumProjectMoney.actualReceivAmount,
        stroke: false
      }, {
        name: '可回款',
        data: sumProjectMoney.totalReceivableAmount_ActualReceivAmount / 10,
        stroke: false
      }];
      // console.log("可回款" + series);
      _this.ChartData3(series);
      _this.setData({
        series: series,
      });
    })
  },
  // 获取产值数据
  getGraphOutputValue() {
    let _this = this;
    statisticalJS.getGraphOutputValue(function(res) {
      var graphOutputValue = res;
      // console.log("graphOutputValue");
      // console.log(graphOutputValue);
      _this.setData({
        graphOutputValue: graphOutputValue,
      });

      let categories = [];
      let datas = [];
      for (let index in graphOutputValue) {
        let item = graphOutputValue[index];
        categories.push(item.date);
        datas.push(item.sumOutputValue);
      }
      _this.ChartData(categories, datas);
    })
  },
  // 获取安全数据
  getGraphSecurity() {
    let _this = this;
    statisticalJS.getGraphSecurity(function(res) {
      var graphSecurity = res;
      // console.log("graphSecurity");
      // console.log(graphSecurity);
      _this.setData({
        graphSecurity: graphSecurity,
      });

      // 设置安全图表数据
      let series = [{
        name: '未教育人数',
        data: graphSecurity.totalUnEducation,
        stroke: false
      }, {
        name: '未参保人数',
        data: graphSecurity.totalUnInsurance,
        stroke: false
      }, {
        name: '安全人数',
        data: graphSecurity.totalWorker,
        stroke: false
      }, {
        name: '未交底人数',
        data: graphSecurity.totalUnDisclose,
        stroke: false
      }];
      // console.log(series);
      _this.ChartData2(series);
    })
  },

  // 获取消息总数
  getCountMessageNo() {
    let _this = this;
    messageCenterJS.countMessageNo(function (countTotal) {
      // countTotal = 0;
      if (countTotal > 0) {
        wx.setTabBarBadge({
          index: 3,
          text: '' + countTotal
        })
      }
    })
  },

  //项目详情
  projectDetails() {
    wx.navigateTo({
      url: '/pages/projectlist/projectlist',
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
      this.getSumProjectMoney();
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
})