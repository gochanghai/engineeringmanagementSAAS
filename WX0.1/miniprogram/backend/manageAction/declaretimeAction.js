const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取项目的合同启止与申报类型：
 * cprojectid 项目id；
 * bdeclaretimeBaseInfo 返回的实体类数据；
 */
function getDeclaretimeBaseInfo(cprojectid = null, callback) {
  let bdeclaretimeBaseInfo = {};
  let datalist = {
    user: storageJS.getUser().account,
    form: "dc_mng_contract",
    action: "leftJoin", //innerJoin，rightJoin，fullJoin
    fields: {
      "dc_mng_contract": [
        "projectid",
        "confirmtype",
        "confirmtypememo"
      ],
      "dc_projects": [
        "start_date",
        "end_date"
      ]
    },
    join: [{
      "dc_mng_contract": "projectid",
      "dc_projects": "id"
    }],
    condition: {
      "dc_mng_contract": [{
        "field": "projectid",
        "value": cprojectid,
        "symbol": "="
      }]
    },
    page: {
      "pageSize": 1,
      "pageIndex": 0
    }
  };
  httpJS.request('/mform', datalist, function(res) {
    if (res.data.code > 0) {
      bdeclaretimeBaseInfo = res.data.datalist.dc_mng_contract[0];
    }
    return typeof callback == 'function' && callback(bdeclaretimeBaseInfo);
  });
};

/**
 * 获取申报时间列表：
 * cprojectid 项目id；
 * bdeclaretimeList 返回的实体类数据；
 */
function getDeclaretimeList(cprojectid, callback) {
  let bdeclaretimeList = [];
  let datalist = {
    user: storageJS.getUser().account,
    form: "dc_mng_project_confirmnodes",
    action: "get",
    distinct: false,
    fields: ["formid", "datenode", "nodedeclare"],
    page: null,
    condition: [{
      field: "projectid",
      value: cprojectid,
      symbol: "="
    }]
  };
  httpJS.request('/form', datalist, function(res) {
    if (JSON.parse(res.data).code > 0) {
      let DateList = JSON.parse(res.data).datalist.project_confirmnode;
      if (null != DateList) {
        for (let item of DateList) {
          item.status = "updateDetail";
        }
        bdeclaretimeList = DateList;
      }
    }
    return typeof callback == 'function' && callback(bdeclaretimeList);
  });
};

/**
 * 提交申报时间列表变化：
 * dateList 实体类数据，status = 'updateDetail'|'deleteDetail'|'addDetail'|''， f+单词 为实体类数据， c+单词 为匹配条件；
 * code 返回服务器的结果；
 */
function postDeclaretiemList(dateList = [{
  status: null,
  fdatenode: null,
  fnodedeclare: null,
  cformid: null,
  cprojectid: null
}], callback) {
  let postList = [];
  for (let item of dateList) {
    let actionValue, fieldsValue, conditionValue;
    switch (item.status) {
      case "updateDetail":
        actionValue = "update";
        fieldsValue = {
          datenode: item.fdatenode,
          nodedeclare: item.fnodedeclare
        };
        conditionValue = [{
            field: "formid",
            symbol: "=",
            value: item.cformid
          },
          {
            field: "projectid",
            symbol: "=",
            value: item.cprojectid
          }
        ];
        break;
      case "deleteDetail":
        actionValue = "delete";
        fieldsValue = null;
        conditionValue = [{
            field: "formid",
            symbol: "=",
            value: item.objectId
          },
          {
            field: "projectid",
            symbol: "=",
            value: cprojectid
          }
        ];
        break;
      case null:
      case "addDetail":
      default:
        actionValue = "add";
        fieldsValue = [{
          datenode: item.datenode,
          nodedeclare: item.nodedeclare,
          projectid: cprojectid
        }];
        conditionValue = null;
        break;
    }

    let postPage = {
      name: "confirmnode_" + dateList.indexOf(item),
      form: "project_confirmnode",
      action: actionValue,
      fields: fieldsValue,
      condition: conditionValue,
      page: null
    };
    postList.push(postPage);
  }
  let datalist = {
    user: storageJS.getUser().account,
    clientip: null,
    platform: "WX",
    batchFun: "serverTrans",
    source: null,
    batchList: postList
  };
  httpJS.request('/sbatch', datalist, function(res) {
    return typeof callback == 'function' && callback({
      code: JSON.parse(res.data).code
    });
  });
};

module.exports = {
  getDeclaretimeBaseInfo: getDeclaretimeBaseInfo,
  getDeclaretimeList: getDeclaretimeList,
  postDeclaretiemList: postDeclaretiemList,
}