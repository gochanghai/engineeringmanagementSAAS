const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const fileAction = require('./fileAction.js');
const workerAction = require('./workerAction.js');

/**
 * 获取三类文件未提交标志劳务人员：
 * cprojectid 项目id；
 * fileSign 文件类型标志，disclose|education|insurance；
 * bWorkerList 返回的实体类数据；
 */
export let getUnSignWorkerList = function (cprojectid, fileSign, callback) {
  let bWorkerList = [];
  let conditionValue = [{
    field: "projectid",
    value: cprojectid,
    symbol: "="
  }];
  switch (fileSign) {
    case "disclose":
      var pushData = {
        field: "disclosefilesign",
        value: "true",
        symbol: "!="
      };
      conditionValue.push(pushData);
      break;
    case "education":
      var pushData = {
        field: "educationfilesign",
        value: "true",
        symbol: "!="
      };
      conditionValue.push(pushData);
      break;

    case "insurance":
      var pushData = {
        field: "insurancefilesign",
        value: "true",
        symbol: "!="
      };
      conditionValue.push(pushData);
      break;
    default:
      break;
  }
  let datalist = {
    user: storageJS.getUser().account,
    form: "dc_mng_worker",
    action: "leftJoin",
    fields: {
      dc_mng_worker: ["formid", "name"],
      dc_mng_project_group: ["groupname"]
    },
    join: [{
      dc_mng_worker: "groupid",
      dc_mng_project_group: "formid"
    }],
    page: null,
    condition: {
      dc_mng_worker: conditionValue
    }
  };
  httpJS.request('/mform', datalist, function (res) {
    if (res.data.code > 0) {
      let resworkerlist = res.data.datalist.dc_mng_worker;
      if (null != resworkerlist) {
        bWorkerList = resworkerlist;
      }
    }
    return typeof callback == 'function' && callback(bWorkerList)
  });
};

/**
 * 打包提交附件、更改劳务人员三类文件标志：
 * packageData 打包发送的数据，其中fileSign=disclose|education|insurance；
 * code 返回的服务器结果；
 */
export let packageComitFileANDWorkerSignList = function (packageData = {
  workerFormIdlist: null,
  projectid: null,
  file: null,
  fileName: null,
  fileSign: null
}, callback) {
  let fileBelong = '';
  switch (packageData.fileSign) {
    case "disclose":
      fileBelong = "安全交底";
      break;
    case "education":
      fileBelong = "安全教育";
      break;
    case "insurance":
      fileBelong = "保险";
      break;
    default:
      fileBelong = packageData.fileSign;
      break;
  }
  let fileInfo = {
    projectid: packageData.projectid,
    belongidlist: packageData.workerFormIdlist,
    file: packageData.file,
    filename: packageData.fileName,
    filebelong: fileBelong,
    formname: 'dc_mng_worker'
  }
  // 先提交附件
  fileAction.fileUpload(fileInfo, function (res) {
    if (res.code == 1) {
      // 附件提交成功更新劳务人员三类文件标志
      workerAction.updateWorkerSignList(packageData.fileSign, packageData.projectid, packageData.workerFormIdlist, function (res) {
        return typeof callback == 'function' && callback({
          code: res.code
        })
      })
    } else return typeof callback == 'function' && callback({
      code: res.code
    })
  })
}
