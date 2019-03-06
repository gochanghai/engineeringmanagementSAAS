// pages/addgroup/addgroup.js
const fireGroupAction = require('../../backend/manageAction/fireGroupAction.js');
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    activeSty: 'color:#fff;border: 1px solid #FFA268;',
    activeSel: 'active-sel',
    activeIndex: '0',
    otherVis: true,
    projectID: '',
    groupName: '消防水',
    groupType: '消防水',
    groupId: '1',
    index: 0,
    selGroup: []
  },

  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    console.log(projectID);
    this.setData({
      projectID: projectID,
    })

    //WX:0.4 获取需要选择班组的数据
    this.selGroupData();
  },

  //获取需要选择的班组数据
  selGroupData() {
    var _this = this;
    fireGroupAction.getBaseGroupList(function(bbasegroupList) {
      console.log(bbasegroupList)
      _this.setData({
        selGroup: bbasegroupList
      })
    })
  },

  bindChange: function(e) {
    console.log('当前选中的数值下标为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 班组名输入
  inputGroupName(e) {
    let groupName = e.detail.value;
    this.setData({
      groupName: groupName
    })
  },

  selTeam(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    let groupId = e.currentTarget.id;
    this.setData({
      activeIndex: index,
      groupType: type,
      groupId: groupId,
      groupName: type,
    })

    if (type === "其他") {
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
      projectid: this.data.projectID,
      groupname: this.data.groupName,
      groupid: this.data.groupId,
      grouptype: this.data.groupType
    };
    console.log(fireGroup);
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          fireGroupAction.addFireGroup(fireGroup, function(res) {
            console.log(fireGroup);
            console.log(res);
            if (res.code == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1200)
                }
              })
            } else {
              wx.showModal({
                content: '新增失败',
                showCancel: false,
                confirmColor: '#F0880C'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})