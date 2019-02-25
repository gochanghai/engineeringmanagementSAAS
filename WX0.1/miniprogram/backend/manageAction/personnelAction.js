const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取管理人员列表数据:
 * cprojectid 项目id；
 * bmanagerList 返回的实体类数据；
 **/
function getManagerList(cprojectid = null, callback) {
    var bmanagerList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_manager",
        action: "get",
        fields: [
            "managertype",
            "managername",
            "telphoneno"
        ],
        page: null,
        condition: [{
            field: "projectid",
            symbol: "=",
            value: cprojectid
        }]
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bmanagerList = JSON.parse(res.data).datalist.dc_mng_manager;
        }
        return typeof callback == 'function' && callback(bmanagerList);
    })
};

/**
 * 获取班组人员列表：
 * cprojectid 项目id；
 * bgroupList 返回的实体类数据；
 */
function getGroupList(cprojectid, callback) {
    var bgroupList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_group",
        action: "leftJoin",
        fields: {
            dc_mng_project_group: ["groupname", "formid"],
            default: [
                "count(dc_mng_worker.objectid) as totalNumber",
                "SUM(case when dc_mng_worker.discloseFileSign = 'false' then 1 else 0 end) as discloseFileSign",
                "SUM(case when dc_mng_worker.educationFileSign = 'false' then 1 else 0 end) as educationFileSign",
                "SUM(case when dc_mng_worker.insuranceFileSign = 'false' then 1 else 0 end) as insuranceFileSign"
            ]
        },
        join: [{
            dc_mng_worker: "groupid",
            dc_mng_project_group: "formId"
        }],
        condition: {
            dc_mng_project_group: [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }]
        },
        group: "dc_mng_project_group.groupname,dc_mng_project_group.formid"
    }
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            let resgrouplist = res.data.datalist.dc_mng_project_group;
            if (null != resgrouplist)
                bgroupList = resgrouplist;
        }
        return typeof callback == 'function' && callback(bgroupList);
    })
};

/**
 * 获取施工人员列表：
 * cprojectid 项目id；
 * bconstructionList 返回的实体类数据；
 */
function getConstructionList(cprojectid, callback) {
    var bconstructionList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_worker",
        action: "leftJoin",
        fields: {
            dc_mng_worker: ["groupid"],
            dc_mng_project_group: ["groupname"],
            default: [
                "name",
                "age",
                "telno",
                "admissionat",
                "repay"
            ]
        },
        join: [{
            dc_mng_worker: "groupid",
            dc_mng_project_group: "formId"
        }],
        condition: {
            dc_mng_worker: [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }]
        }
    }
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            let resworker = res.data.datalist.dc_mng_worker;
            if (null != resworker)
                bconstructionList = resworker;
        }
        return typeof callback == 'function' && callback(bconstructionList);
    })
}

module.exports = {
    getManagerList: getManagerList,
    getGroupList: getGroupList,
    getConstructionList: getConstructionList,
}