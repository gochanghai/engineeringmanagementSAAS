// pages/confirmpersonnel/confirmpersonnel.js
const workerAction = require('../../backend/manageAction/workerAction.js');
Page({
  data: {
    windowHeight: null,
    toggleId: null,
    toggleStyle: {
      heightSel: 'auto',
      imgSel: '/images/up.png',
      height: '110rpx',
      img: '/images/down.png'
    },
    groupList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: this.fileSignToTitle(options.fileSign),
    })

    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight + 'px',
      projectID: options.projectID,
      fileSign: options.fileSign,
    });
    // 获取数据
    this.getDataList(this.data.projectID, this.data.fileSign)
  },

  /**
   * 收缩按钮
   */
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

  // 获取数据
  getDataList(projectID, fileSign){
    let _than = this;
    workerAction.getSignedWorkerList(projectID, fileSign, function (res) {
      console.log('bWorkerList');
      console.log(res);
      let groupList = [];
      for(let index in res){
          let item = {
            group: res[index].groupname,
            file: '/images/mesimage2.png',
            createDate: "2019-02-19",
            personnerList: [{
              name: "张三",
              gender: "男",
              date: "2018-11-03"
            }, {
              name: "张三",
              gender: "男",
              date: "2018-11-03"
            }, {
              name: "张三",
              gender: "男",
              date: "2018-11-03"
            }]
          }
        groupList.push(item);
      }
      _than.setData({
        groupList: groupList,
      })
    })
  },


  /**
   * 获取标题
   */
  fileSignToTitle(val) {
    // let fileSign =  "disclose"||"education"||"insurance"
    switch (val) {
      case 'disclose':
        return '已交底人员';
        break;
      case 'education':
        return '已教育人员';
        break;
      case 'insurance':
        return '已参保人员';
        break;
      default:
        return '已参保人员';
        break;
    }
  },
})