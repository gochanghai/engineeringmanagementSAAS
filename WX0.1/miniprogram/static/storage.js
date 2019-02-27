//异步：
// wx.getStorage({
//   key: 'ProjectList',
//   success: function (res) {
//     console.log("get callback data...");
//     _this.setData({
//       getProjectList: res.data
//     });
//     console.log(_this.data.getProjectList);
//   }
// })
//统一使用同步的方式

/**
 * 获取缓存的当前用户信息：
 * user 返回的实体类数据，其中：
 * user.account 用户帐号“test001”；
 * user.userName 用户名“测试用户”；
 * user.userArea 公司“深圳公司”；
 * user.userTitle 职位“副总经理”’；
 * user.userType 帐号类型“商务经理”；
 */
export let getUser = function () {
  var user = wx.getStorageSync('user');
  return user;
}

//登录时传入，程序在login.js，但只有account传入了，而name为空，待决定用户的姓名由何处获取
export let setUser = function (userInfo) {
  wx.removeStorageSync('user')
  let user = {
    account: userInfo.user,
    userName: userInfo.userName,
    userArea: userInfo.userArea,
    userTitle: userInfo.userTitle,
    userType: userInfo.userType
  }
  wx.setStorageSync("user", user)
}

/**
 * 获取缓存的当前项目列表信息：
 * projectList 返回的实体类数据，其中：
 * projectList[x].projectabbreviation 项目简称；
 * projectList[x].projectid 项目id；
 * projectList[x].projectname 项目全称；
 */
export let getProjectList = function () {
  var projectList = wx.getStorageSync('projectList');
  return projectList;
};

export let setProjectList = function (projectList) {
  wx.removeStorageSync('projectList')
  let storagedPojectList = [];
  if (null != projectList) {
    for (let item of projectList) {
      let pushItem = {
        projectabbreviation: item.projectabbr,
        projectid: item.projectid,
        projectname: item.name,
      }
      storagedPojectList.push(pushItem);
    }
  }
  wx.setStorageSync("projectList", storagedPojectList);
}