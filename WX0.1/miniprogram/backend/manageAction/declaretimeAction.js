const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取项目的合同启止与申报类型：
 * cprojectid 项目id；
 * bdeclaretimeBaseInfo 返回的实体类数据；
 */
export let getDeclaretimeBaseInfo = function (cprojectid = null, callback) {
  let bdeclaretimeBaseInfo = {};
  let datalist = {
    user: storageJS.getUser().account,
    form: "dc_mng_contract",
    action: "leftJoin", //innerJoin，rightJoin，fullJoin
    fields: {
      "dc_mng_contract": [
        "projectid",
        "confirmtype",
        "confirmdate",
        "confirmtypememo"
      ],
      "dc_projects": [
        "start_date",
        "end_date"
      ],
      default: [
        "count(dc_mng_project_confirmnodes.objectid) as countconfirmnodes",
      ]
    },
    join: [{
      "dc_mng_contract": "projectid",
      "dc_projects": "id"
    }, {
      "dc_mng_contract": "projectid",
      "dc_mng_project_confirmnodes": "projectid"
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
    },
    group: "dc_mng_contract.projectid,dc_mng_contract.confirmtype,dc_mng_contract.confirmdate,dc_mng_contract.confirmtypememo,dc_projects.start_date,dc_projects.end_date",
  };
  httpJS.request('/mform', datalist, function (res) {
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
export let getDeclaretimeList = function (cprojectid, callback) {
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
  httpJS.request('/form', datalist, function (res) {
    if (JSON.parse(res.data).code > 0) {
      let DateList = JSON.parse(res.data).datalist.dc_mng_project_confirmnodes;
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
export let postDeclaretiemList = function (dateList = [{
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
        actionValue = "updateList";
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
        actionValue = "deleteList";
        fieldsValue = null;
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
      case null:
      case "addDetail":
      default:
        actionValue = "add";
        fieldsValue = [{
          datenode: item.fdatenode,
          nodedeclare: item.fnodedeclare,
          projectid: item.cprojectid
        }];
        conditionValue = null;
        break;
    }

    let postPage = {
      name: "confirmnode_" + dateList.indexOf(item),
      form: "dc_mng_project_confirmnodes",
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
    platform: "WXP",
    batchFun: "serverTrans",
    source: null,
    batchList: postList
  };
  console.log(datalist);
  httpJS.request('/sbatch', datalist, function (res) {
    return typeof callback == 'function' && callback({ code: res.data.code || -1 });
  });
};


/**
 * 申报节点个数为0的时候更新申报日并新建申报时间列表：
 * fconfirmdate 每月申报日；
 * dateList[{}] 实体类数据，其中——
 *  dateList[x].datenode 结点日期，
 *  dateList[x].nodedeclare 结点备注；
 * cprojectid 项目id；
 * code 返回服务器的结果；
 * @author lijh → liuch
 */
export let bornDeclaretiemList = function (fconfirmdate, dateList = [{
  fdatenode: null,
  fnodedeclare: null
}], cprojectid, callback) {
  let postList = [];
  let contractPage = {
    name: "dc_mng_contract",
    form: "dc_mng_contract",
    action: "updateList",
    fields: {
      confirmdate: fconfirmdate,
    },
    condition: [{
      field: "projectid",
      value: cprojectid,
      symbol: "="
    }],
    page: null
  };
  postList.push(contractPage);
  var index = 0;
  for (let item of dateList) {
    let actionValue = "add",
      fieldsValue = [{
        datenode: item.fdatenode,
        nodedeclare: item.fnodedeclare,
        projectid: cprojectid
      }],
      conditionValue = null;
    let postPage = {
      name: "confirmnode_" + index,
      form: "dc_mng_project_confirmnodes",
      action: actionValue,
      fields: fieldsValue,
      condition: conditionValue,
      page: null
    };
    postList.push(postPage);
    index += 1;
  }
  let datalist = {
    user: storageJS.getUser().account,
    clientip: null,
    platform: "WXP",
    batchFun: "serverTrans",
    source: null,
    batchList: postList
  };
  console.log(datalist);
  httpJS.request('/sbatch', datalist, function (res) {
    return typeof callback == 'function' && callback({ code: res.data.code });
  });
};
