const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');


/**
 * 获取产值曲线图数据：
 * bgraphOutputValueData 返回的实体类数据；
 */
function getGraphOutputValue(callback) {
  var bgraphOutputValueData = [];
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
    form: "dc_mng_project_confirmvalues",
    action: "dStatis",
    fields: ["SUM(outputvalue) as sumOutputValue"],
    dField: "confirmat",
    statisType: "Month", //Year,Month,Season
    page: null,
    condition: [
      // {
      //   field: "confirmat",
      //   symbol: ">=",
      //   value: "2018/7/1"
      // }, 
      {
        field: "projectid",
        symbol: "=",
        value: ids
      }, {
        "field": "confirmat",
        "symbol": "!=",
        "value": null
      }]
  };
  httpJS.request('/form', datalist, function (res) {
    try {
      let resconfirmvalue = JSON.parse(res.data).datalist.dc_mng_project_confirmvalues;
      if (null != resconfirmvalue) {
        for (let item of resconfirmvalue) {
          let pushData = {
            date: item.Date,
            sumOutputValue: item.sumOutputValue
          }
          bgraphOutputValueData.push(pushData);
        }
      }
      return typeof callback == 'function' && callback(bgraphOutputValueData)
    } catch (error) { }
  });
};

/**
 * 获取劳务人员绘图数据：
 * bgraphSecurityData 返回的实体类数据；
 */
function getGraphSecurity(callback) {
  var bgraphSecurityData = {
    totalWorker: 0, //总人数
    totalUnDisclose: 0, //安全交底
    totalUnEducation: 0, //安全教育
    totalUnInsurance: 0 //保险 
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
    form: "dc_mng_worker",
    action: "get",
    fields: [
      "count(1) as totalWorker",
      "SUM( case when dc_mng_worker.discloseFileSign = 'false' then 1 else 0 end ) as totalUnDisclose",
      "SUM( case when dc_mng_worker.educationFileSign = 'false' then 1 else 0 end ) as totalUnEducation",
      "SUM( case when dc_mng_worker.insuranceFileSign = 'false' then 1 else 0 end ) as totalUnInsurance"
    ],
    page: null,
    condition: [{
      field: "projectid",
      symbol: "=",
      value: ids
    }]
  };
  httpJS.request('/form', datalist, function (res) {
    try {
      let resWorkerData = JSON.parse(res.data).datalist.dc_mng_worker;
      if (null != resWorkerData) {
        bgraphSecurityData.totalWorker = resWorkerData[0].totalWorker; //总人数
        bgraphSecurityData.totalUnDisclose = resWorkerData[0].totalUnDisclose; //安全交底
        bgraphSecurityData.totalUnEducation = resWorkerData[0].totalUnEducation; //安全教育
        bgraphSecurityData.totalUnInsurance = resWorkerData[0].totalUnInsurance; //保险 
      }
    } catch (error) { }
    return typeof callback == 'function' && callback(bgraphSecurityData)
  });
};
module.exports = {
  getGraphOutputValue: getGraphOutputValue,
  getGraphSecurity: getGraphSecurity,
}