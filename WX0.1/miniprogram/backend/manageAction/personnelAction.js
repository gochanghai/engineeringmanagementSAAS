const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取管理人员列表数据:
 * cprojectid 项目id；
 * bmanagerList 返回的实体类数据；
 **/
export let getManagerList = function (cprojectid = null, callback) {
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
export let getGroupList = function (cprojectid, callback) {
    var bgroupList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_group",
        action: "leftJoin",
        fields: {
            dc_mng_project_group: ["groupname", "formid"],
            dc_mng_base_group: ["typename as basegroupname"],
            default: [
                "count(dc_mng_worker.objectid) as totalnumber",
                "SUM(case when dc_mng_worker.discloseFileSign = 'false' then 1 else 0 end) as disclosefilesign",
                "SUM(case when dc_mng_worker.educationFileSign = 'false' then 1 else 0 end) as educationfilesign",
                "SUM(case when dc_mng_worker.insuranceFileSign = 'false' then 1 else 0 end) as insurancefilesign"
            ]
        },
        join: [{
            dc_mng_base_group: "formId",
            dc_mng_project_group: "groupid"
        },{
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
        group: "dc_mng_project_group.groupname,dc_mng_project_group.formid,dc_mng_base_group.typename"
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
export let getConstructionList = function (cprojectid, callback) {
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