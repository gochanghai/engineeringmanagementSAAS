// pages/certification/certification.js
const certificationSaaSAction = require('../../backend/saasAction/certificationAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{
      lable: "姓名",
      value: ""
    }, {
      lable: "邮箱",
      value: ""
    }, {
      lable: "所属部门",
      value: ""
    }, {
      lable: "手机号码",
      value: ""
    }, {
      lable: "身份证号码",
      value: ""
    }, {
      lable: "级别定位",
      value: ""
    }, {
      lable: "省份",
      value: ""
    }, {
      lable: "城市",
      value: ""
    }, {
      lable: "风险保证金",
      value: ""
    }, {
      lable: "责任书有效期",
      value: ""
    }, {
      lable: "从业年限",
      value: ""
    }, {
      lable: "紧急联系人",
      value: ""
    }, {
      lable: "紧急联系人电话",
      value: ""
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {    
    // 获取数据
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取认证信息
  getData() {
    let _than = this;
    certificationSaaSAction.getSertification(function(res) {
      console.log('bsertification')
      console.log(res)
      let info = res;
      let dataList = [{
        lable: "姓名",
        value: info.username
      }, {
        lable: "邮箱",
        value: info.email
      }, {
        lable: "所属部门",
        value: "深圳分公司"
      }, {
        lable: "手机号码",
        value: _than.phoneFormat(info.phone)
      }, {
        lable: "身份证号码",
        value: info.identification
      }, {
        lable: "级别定位",
        value: info.level
      }, {
        lable: "省份",
        value: info.address
      }, {
        lable: "风险保证金",
        value: '已缴纳保证金'
      }, {
        lable: "责任书有效期",
        value: info.start_time + ' 至 ' + info.end_time
      }, {
        lable: "从业年限",
        value: info.working_years + "年"
      }, {
        lable: "紧急联系人",
        value: info.emergency_contact
      }, {
        lable: "紧急联系人电话",
          value: _than.phoneFormat(info.emergency_phone)
      }];;
      // 判断是否是 省级商务经理 是的则多加城市信息
      if (info.level === '省级商务经理') {
        let item = {
          lable: "城市",
          value: "深圳市"
        };
        dataList.splice(7, 0, item)
      } 
      _than.setData({
        dataList: dataList,
      })
    })
  },

  // 手机号码格式化
  phoneFormat: function (val) {
    if (val === null) {
      return "未知";
    }
    if (val.length === 11) {
      let a1 = val.substring(0, 3);
      let a2 = val.substring(4, 7);
      let a3 = val.substring(8, 11);
      // console.log(date);
      return a1 + '-' + a2 + '-' + a3;
    }
    return val;
  },

})