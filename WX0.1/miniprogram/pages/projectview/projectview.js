// pages/projectview/projectview.js
const projectlistSaaSAction = require('../../backend/saasAction/projectlistAction.js');
Page({
  data: {
    WinHeightCon: null,
    selectModuleIndex: '0',
    swiperIndex: '0',
    selectList: [{
        label: "工程",
        id: "0"
      },
      {
        label: "维保",
        id: "1"
      },
      {
        label: "销售",
        id: "2"
      },
      {
        label: "检测",
        id: "3"
      },
      {
        label: "维修",
        id: "4",
      },
      {
        label: "服务",
        id: "5"
      }
    ]
  },

  onLoad: function(options) {
    this.setData({
      WinHeightCon: wx.getSystemInfoSync().windowHeight - 57 + 'px',
    });

    // 获取项目列表
    this.getProjectList();
  },

  //进入项目详情
  navProjectDetail(event) {
    let data = event.currentTarget.dataset.data;
    wx.navigateTo({
      url: '/pages/projectdetail/projectdetail?id=' + data.id + '&no=' + data.no,
    })
  },

  selectModule(e) {
    this.setData({
      selectModuleIndex: e.currentTarget.dataset.index,
      swiperIndex: e.currentTarget.dataset.index
    })
  },

  currentFun(e) {
    this.setData({
      selectModuleIndex: e.detail.current,
      swiperIndex: e.detail.current
    })
  },

  // 获取项目列表数据
  getProjectList() {
    let _than = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    console.log('get ProjectRes:');
    projectlistSaaSAction.getProjectList(function(res) {
      console.log('ProjectRes:');
      console.log(res)
      // 获取请求返回的数据
      let tbList = res;
      // 定义一个模块数组
      let swiperList = [];
      // 处理数据
      for (let index in tbList) {
        // 获取每一组数据
        let item = tbList[index];
        // 定义模块里面的项目数组
        let list = [];
        // 处理每一组里面的每一条数据
        for (let index in item) {
          let project = {
            id: item[index].projectid,
            name: item[index].projectname,
            date: item[index].startdate + ' 至 ' + item[index].enddate,
            status: _than.getStatusToText(item[index].projectstage),
            no: item[index].code,
            amount: _than.getMoneyFormat(item[index].usablemoney),
            outputValueRatio: _than.getMunberToRatio(item[index].outpustvalueratio),
            returnRatio: _than.getMunberToRatio(item[index].receivedpayratio),
          }
          list.push(project);
        }
        swiperList.push(list);
      }


      _than.setData({
        swiperList: swiperList
      })
    })
    // 关闭加载框
    wx.hideToast({});
  },



  //=====================  数据格式化区域 start =====================//
  //财务金额格式化
  getMoneyFormat(val) {
    if (val === '' || val === null) {
      return '0.00';
    }
    var str = parseInt(val).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf("."));
    var ret = intSum + dot;
    return ret;
  },
  // 获取数值百分比
  getMunberToRatio(val) {
    if (val === '' || val === null) {
      return '0.00%'
    }
    return val * 100 + '%'
  },

  // 获取数值百分比
  getStatusToText(val) {
    if (val === '' || val === null) {
      return '在建'
    }
    return val
  }
  //=====================  数据格式化区域 end =====================//
})