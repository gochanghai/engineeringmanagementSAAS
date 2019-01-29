// pages/addgroup/addgroup.js
const fireGroupJS = require('../../action/fireGroup.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeSty: 'color:#fff;border: 1px solid #FFA268;',
    activeSel: 'active-sel',
    activeIndex: '1',
    otherVis: true,

    projectID: '',
    groupName: '消防水',
    groupType: '',
    groupId: '0',
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      projectID: projectID,
    })
  },

  // 班组名输入
  InputGroupName(e) {
    console.log(e.detail.value);
    let groupName = e.detail.value;
    this.setData({
      groupName: groupName
    })
  },

  selTeam(e) {
    console.log(e.currentTarget.dataset.type);
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    this.setData({
      activeIndex: index,
      groupType: type,
      groupId: index,
      groupName: type,
    })

    if (index == 4) {
      this.setData({
        otherVis: false,
        groupName: '',
      })
    } else {
      this.setData({
        otherVis: true
      })
    }
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  commitGroup() {

    // 数据校验
    if (this.data.groupName == "") {
      wx.showModal({
        title: '提示',
        content: '班组名不能为空',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    // 班组 
    let fireGroup = {
      projectID: this.data.projectID,
      groupName: this.data.groupName,
      groupId: this.data.groupId,
      type: this.data.groupType
    };
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');

          //  新增
          fireGroupJS.addFireGroup(fireGroup,function(res){
            console.log(res);
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: '1'
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