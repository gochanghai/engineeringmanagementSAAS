/**
 * 对接项目列表页
 */
const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取项目列表：
 * bprojectList 返回的实体类数据：t0 工程、t1 维保、t2 销售、t3 检测、t4 维修、t5 服务；
 */
export let getProjectList = function (callback) {
  let bprojectList = {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
    t5: [],
  };
  let projectList = storageJS.getProjectList();
  let ids = "";
  for (let item of projectList) {
    ids += item.projectid + ",";
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (ids.length > 0) {
    ids = ids.substr(0, ids.length - 1);
  }
  let datalist = {
    user: storageJS.getUser().account,
    projectIDList: ids
  };
  console.log(datalist);
  httpJS.request('/mysaas/project/liststatis/get/all', datalist, function (res) {
    let dealingprojectlist = [];
    let resprojectdataList = res.data.datalist;
    for (let item of projectList) {
      let resprojectdataPage = resprojectdataList[item.projectid];
      let pushData = {
        // projectid
        projectid: item.projectid,
        // 项目类型
        projecttype: null != resprojectdataPage.project[0] ? resprojectdataPage.project[0].project_type : "",
        // 项目名称
        projectname: null != resprojectdataPage.project[0] ? resprojectdataPage.project[0].name : "",
        // 项目简称
        projectabbreviation: null != resprojectdataPage.contract[0] ? resprojectdataPage.contract[0].projectabbreviation : "",
        // 项目编码
        code: null != resprojectdataPage.project ? resprojectdataPage.project[0].code : "",
        // 项目开始日期
        startdate: null != resprojectdataPage.project ? resprojectdataPage.project[0].start_date : "",
        // 项目结束日期
        enddate: null != resprojectdataPage.project ? resprojectdataPage.project[0].end_date : "",
        // 项目状态
        projectstage: null != resprojectdataPage.project ? resprojectdataPage.project[0].project_stage || "无状态" : "",
        // 可用余额
        usablemoney: null != resprojectdataPage.recievedpay ? resprojectdataPage.recievedpay[0].usable_money || 0 : 0,
        // 产值百分比
        outpustvalueratio: null != resprojectdataPage.confirmvalue && null != resprojectdataPage.contract_amount
          && null != resprojectdataPage.confirmvalue[0].outputvaluesum && null != resprojectdataPage.contract_amount[0].contractamountsum
          && 0 != resprojectdataPage.contract_amount[0].contractamountsum ?
          resprojectdataPage.confirmvalue[0].outputvaluesum / resprojectdataPage.contract_amount[0].contractamountsum : 0,
        // 回款百分比
        receivedpayratio: null != resprojectdataPage.recievedpay ? resprojectdataPage.recievedpay[0].returned_ratio || 0 : 0,
      }
      dealingprojectlist.push(pushData);
    }
    bprojectList.t0 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "工程");
    bprojectList.t1 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "维保");
    bprojectList.t2 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "销售");
    bprojectList.t3 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "检测");
    bprojectList.t4 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "维修");
    bprojectList.t5 = dealingprojectlist.filter(function (resMessDataPage, index, array) {
      return resMessDataPage.projecttype == this;
    }, "服务");
    return typeof callback == 'function' && callback(bprojectList)
  });
};
