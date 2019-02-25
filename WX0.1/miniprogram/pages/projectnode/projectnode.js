// pages/projectnode/projectnode.js
const projectNodeAction = require('../../backend/manageAction/projectNodeAction.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateLis: {
      startDate: "2019-01-02"
    },
    // 是否有选中
    isChecked: false,
    // 1：全选/ 0：全不选
    all_checked: false,
    WinHeight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取项目ID
    let projectID = options.projectID;
    this.setData({
      WinHeight: wx.getSystemInfoSync().windowHeight - 165 + 'px',
      projectID: projectID,
    })
    // 获取项目进度节点
    this.getProjectNodeList(this.data.projectID);

  },

  // 获取项目进度节点
  getProjectNodeList(projectID) {
    let _this = this;
    projectNodeAction.getProjectNodeList('5', function (res) {
    //   console.log(bNodeList);
      // console.log(res);
      // 格式化数据
      for (let index in res) {
        res[index].startfrom = _this.dateFormat2(res[index].startfrom);
        res[index].endat = _this.dateFormat2(res[index].endat);
      }
      _this.setData({
        nodeList: res,
      });
    })
  },

  // 全选
  changeAllChecked(e) {
    let value = !e.currentTarget.dataset.index;
    // console.log(value);
    let nodeList = this.data.nodeList;
    this.data.all_checked = value;
    for(let index in nodeList){
      // console.log(index);
      nodeList[index].checked = value;
    }
    this.setData({
      nodeList: nodeList,
      all_checked: value,
      isChecked: value,
    });
  },
  // 单个选择框事件
  changeChecked(e) {
    let index = e.currentTarget.dataset.index;
    let checked = !e.currentTarget.dataset.type;
    let nodeList = this.data.nodeList;
    nodeList[index].checked = checked;
    // 统计是否全部选中
    let checkNum = 0;
    for (let index in nodeList) {
      if (nodeList[index].checked){
        checkNum = checkNum + 1;
      }
    }    
    this.setData({
      nodeList: nodeList,
      all_checked: checkNum === nodeList.length,
      isChecked: checkNum != 0,
    });
  },
  // 删除节点
  deleteNode(){
    // 判断是否有选中的数据
    if(!this.data.isChecked){
      wx.showModal({
        title: '提示',
        content: '您没有选择要删除的数据',
        showCancel: false,
        confirmColor: '#F0880C'
      })
      return;
    }
    let _this = this;
    let nodeList = this.data.nodeList;
    let newNodeList = [];    
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      showCancel: false,
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          for (let index in nodeList) {
            console.log(index);
            if (!nodeList[index].checked) {
              newNodeList.push(nodeList[index])
            }
          }
          _this.setData({
            nodeList: newNodeList,
            all_checked: false,
            isChecked: false,
          });
        }
      }
    });
  },

  // 开始时间输入
  inputStartDate(e) {
    let nodeList = this.data.nodeList;
    let index = e.currentTarget.dataset.index;
    let startfrom = e.detail.value;
    nodeList[index].startfrom = startfrom;
    this.setData({
      nodeList: nodeList
    })
  },
  // 结束时间输入
  inputEndDate(e) {
    let nodeList = this.data.nodeList;
    let index = e.currentTarget.dataset.index;
    let endAt = e.detail.value;
    nodeList[index].endat = endAt;
    this.setData({
      nodeList: nodeList
    })
  },

  // 取消按钮
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },

  //设置成功
  commitProNode() {
    // 获取节点数据
    let nodeList =this.data.nodeList;
    let projectID = this.data.projectID;
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      confirmColor: '#F0880C',
      success(res) {
        if (res.confirm) {
          console.log('Commit');
          // 提交项目进度节点          
          projectNodeAction.postProjectNode(projectID, nodeList, function(res) {
            // console.log(res)
          })
          wx.showToast({
            title: '设置成功',
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
  },

  // 时间格式化 2019-01-24
  dateFormat2(val) {
    if (val === null) { return "未知"; }
    let date = val.substring(0, 10);
    // console.log(date);
    return date;
  }, 
})