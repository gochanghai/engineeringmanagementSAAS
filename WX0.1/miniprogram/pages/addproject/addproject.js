// pages/addproject/addproject.js
const contractJS = require('../../action/contract.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selIcon: '/images/sel_ok.png',
    toggelLine: '/images/progress_hui.png',
    toggelIcon: '/images/nor_ok.png',
    swiperIndex: '0',
    WinHeight: null,
    IsModal: false,
    projectName:'',
    projectAbbreviation: '',
    managers: [{
        managerName: "",
        telphoneNo: "",
        managerType: '项目经理'
      },
      {
        managerName: "",
        telphoneNo: "",
        managerType: '安全员'
      },
      {
        managerName: "",
        telphoneNo: "",
        managerType: '施工员'
      },
      {
        managerName: "",
        telphoneNo: "",
        managerType: '材料员'
      },
      {
        managerName: "",
        telphoneNo: "",
        managerType: '质量员'
      },
      {
        managerName: "",
        telphoneNo: "",
        managerType: '测试员'
      },
    ],

  },

  onLoad: function(options) {
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 140 + 'px',
    })
  },

  // 下一步
  next() {
    if (this.data.projectName == "") {
      wx.showModal({
        title: '提示',
        content: '请输入项目名称',
        showCancel: false,
        confirmColor: '#F0880C'
      })
    } else if (this.data.ProjectAbbreviation == "") {
      wx.showModal({
        title: '提示',
        content: '请输入项目简称',
        showCancel: false,
        confirmColor: '#F0880C'
      })
    } else {
      this.setData({
        selIcon: '/images/progress_active.png',
        toggelLine: '/images/progress_lan.png',
        toggelIcon: '/images/sel_ok.png',
        swiperIndex: '1',
      })
    }
  },

  previousStep() {
    this.setData({
      selIcon: '/images/sel_ok.png',
      toggelLine: '/images/progress_hui.png',
      toggelIcon: '/images/nor_ok.png',
      swiperIndex: '0',
    })
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  currentFun(e) {
    let index = e.detail.current;
    if (index == '1') {
      this.next();
    } else {
      this.previousStep();
    }
  },

  // 第二步 确定
  commitModal() {
    this.setData({
      toggelIcon: '/images/progress_active.png',
    })
    let managers = this.data.managers;
    // 电话判断
    for (let index in managers) {
      console.log("电话判断");
      if (managers[index].managerName == "") {
        wx.showModal({
          title: '提示',
          content: managers[index].managerType + '姓名不能为空',
          showCancel: false,
          confirmColor: '#F0880C'
        })
        return;
      }
      if (managers[index].telphoneNo == "") {
        wx.showModal({
          title: '提示',
          content: managers[index].managerType + '电话不能为空',
          showCancel: false,
          confirmColor: '#F0880C'
        })
        return;
      }
      // 电话正则校验
      var reg = /^1[34578]\d{9}$/;
      // console.log("电话判断:" + reg.test(managers[index].telphoneNo));
      if (!reg.test(managers[index].telphoneNo)) {
        // console.log("电话判断:" + reg.test(managers[index].telphoneNo));
        wx.showModal({
          title: '提示',
          content: managers[index].managerType + '电话输入不正确',
          showCancel: false,
          confirmColor: '#F0880C'
        })
        return;
      }

    }

    setTimeout(() => {
      this.setData({
        IsModal: true
      })
      console.log(1);
    }, 100)
  },

  cancelModal() {
    this.setData({
      IsModal: false
    })

    setTimeout(() => {
      this.setData({
        toggelIcon: '/images/sel_ok.png',
        toggelLine: '/images/progress_lan.png',
      })
    }, 100)
  },

  //项目名称输入
  InputProName(e) {
    console.log(e.detail.value);
    this.setData({
      projectName: e.detail.value
    })
  },
  //项目简称输入
  InputProAbbreviation(e) {
    // console.log(e.detail.value);
    this.setData({
      projectAbbreviation: e.detail.value
    })
  },
  // 姓名输入
  InputManagerName(e) {
    let managers = this.data.managers;
    let index = e.currentTarget.dataset.index;
    let managerName = e.detail.value;
    managers[index].managerName = managerName;
    this.setData({
      managers: managers
    })
  },
  // 电话输入
  InputTelphoneNo(e) {
    let managers = this.data.managers;
    let index = e.currentTarget.dataset.index;
    let telphoneNo = e.detail.value;
    managers[index].telphoneNo = telphoneNo;
    this.setData({
      managers: managers
    })
  },


  //确定提交数据吗
  dataCommit() {
    let managerList = this.data.managers;
    let contractInfo = {
      projectName: this.data.projectName,
      projectAbbreviation: this.data.projectAbbreviation
    }
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 提交数据
          contractJS.addContract(managerList, contractInfo, function(res) {
            console.log(res);
            // if(res.code == 1){
            //   wx.showToast({
            //     title: '项目新建成功',
            //     icon: 'success',
            //     duration: 2000,
            //     success() {
            //       setTimeout(() => {
            //         wx.switchTab({
            //           url: '/pages/projectview/projectview'
            //         })
            //       }, 1000)
            //     }
            //   })
            // }else{
            //   wx.showToast({
            //     title: '提交失败',
            //     icon: 'success',
            //     duration: 2000,
            //     success() {
            //       setTimeout(() => {
            //         wx.switchTab({
            //           url: '/pages/projectview/projectview'
            //         })
            //       }, 1000)
            //     }
            //   })
            // }            
          });
          // 页面跳转回到 项目展示页 
          wx.showToast({
            title: '项目新建成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/projectview/projectview'
                })
              }, 1000)
            }
          })
          
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})