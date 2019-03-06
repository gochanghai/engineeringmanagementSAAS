const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');


/**
 * 获取产值曲线图数据：
 * bgraphOutputValueData 返回的实体类数据；
 */
export let getGraphOutputValue = function (callback) {
  let bgraphOutputValueData = [];
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
    fields: ["SUM(outputvalue) as sumoutputvalue"],
    dField: "confirmat",
    statisType: "Month", //Year,Month,Season
    page: null,
    condition: [
      {
        field: "projectid",
        symbol: "=",
        value: ids
      }, {
        "field": "confirmat",
        "symbol": "!=",
        "value": null
      }],
    group: "confirmat", //增加group和order能使结果按日期排序
    order: "statisdate asc"

  };
  httpJS.request('/form', datalist, function (res) {
    if (JSON.parse(res.data).code > 0) {
      let resconfirmvalue = JSON.parse(res.data).datalist.dc_mng_project_confirmvalues;
      if (null != resconfirmvalue) {
        for (let item of resconfirmvalue) {
          let pushData = {
            statisDate: item.statisdate,
            sumOutputValue: item.sumoutputvalue || 0,
          };
          bgraphOutputValueData.push(pushData);
        }
      }
    }
    return typeof callback == 'function' && callback(bgraphOutputValueData)
  });
};

/**
 * 获取劳务人员绘图数据：
 * bgraphSecurityData 返回的实体类数据；
 */
export let getGraphSecurity = function (callback) {
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
      "count(1) as totalworker",
      "SUM( case when dc_mng_worker.discloseFileSign = 'false' then 1 else 0 end ) as totalundisclose",
      "SUM( case when dc_mng_worker.educationFileSign = 'false' then 1 else 0 end ) as totaluneducation",
      "SUM( case when dc_mng_worker.insuranceFileSign = 'false' then 1 else 0 end ) as totaluninsurance"
    ],
    page: null,
    condition: [{
      field: "projectid",
      symbol: "=",
      value: ids
    }]
  };
  httpJS.request('/form', datalist, function (res) {
    console.log(res)
    try {
      let resWorkerData = JSON.parse(res.data).datalist.dc_mng_worker;
      if (null != resWorkerData) {
        bgraphSecurityData.totalWorker = resWorkerData[0].totalworker; //总人数
        bgraphSecurityData.totalUnDisclose = resWorkerData[0].totalundisclose; //安全交底
        bgraphSecurityData.totalUnEducation = resWorkerData[0].totaluneducation; //安全教育
        bgraphSecurityData.totalUnInsurance = resWorkerData[0].totaluninsurance; //保险 
      }
    } catch (error) { }
    return typeof callback == 'function' && callback(bgraphSecurityData)
  });
};