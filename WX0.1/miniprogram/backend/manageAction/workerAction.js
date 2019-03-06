const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取单条劳务人员信息：
 * cprojectid 项目id；
 * cformid 劳务人员表单id；
 * bworkerInfo 返回的实体类数据；
 */
export let getWorkerPage = function (cprojectid = null, cformid = null, callback) {
    let bworkerInfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_worker",
        action: "get",
        distinct: false,
        fields: [
            "projectid",
            "groupid",
            "name",
            "age",
            "repay",
            "telno",
            "idcard",
            "admissionat",
            "emergencycontract",
            "leavingat",
            "disclosefilesign",
            "educationfilesign",
            "insurancefilesign"
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }, {
            field: "formid",
            value: cformid,
            symbol: "="
        }]
    }
    console.log(datalist);
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let resworkerinfo = JSON.parse(res.data).datalist.dc_mng_worker;
            if (null != resworkerinfo) {
                bworkerInfo = resworkerinfo[0];
            }
        }
        return typeof callback == 'function' && callback(bworkerInfo);
    });
};

/**
 * 获取多条劳务人员信息：
 * cprojectid 项目id；
 * cformidList 劳务人员表单id集合字符串；
 * bworkerList 返回的实体类数据；
 */
export let getWorkerList = function (cprojectid = null, cformidList = null, callback) {
    let bworkerList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_worker",
        action: "leftJoin",
        fields: {
            dc_mng_worker: [
                "projectid",
                "groupid",
                "name",
                "age",
                "repay",
                "telno",
                "idcard",
                "admissionat",
                "emergencycontract",
                "leavingat",
                "disclosefilesign",
                "educationfilesign",
                "insurancefilesign"
            ],
            dc_mng_project_group: ["groupname"]
        },
        join: [{
            dc_mng_worker: "groupid",
            dc_mng_project_group: "formid"
        }],
        page: null,
        condition: {
            dc_mng_worker:  [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }, {
                field: "formid",
                value: cformidList,
                symbol: "="
            }]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            let resworkerinfo = res.data.datalist.dc_mng_worker;
            if (null != resworkerinfo) {
                bworkerList = resworkerinfo;
            }
        }
        return typeof callback == 'function' && callback(bworkerList);
    });
};

/**
 * 新增劳务人员信息：
 * fworker 实体类数据；
 * code 返回的服务器结果；
 */
export let addWorker = function (fworker = { projectid: null, groupid: null, name: null, age: null, repay: null, telno: null, idcard: null, admissionat: null, emergencycontract: null, leavingat: null, }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_worker",
        action: "add",
        fields: [{
            projectid: fworker.projectid,
            groupid: fworker.groupid,
            name: fworker.name,
            age: fworker.age,
            repay: fworker.repay,
            telno: fworker.telno,
            idcard: fworker.idcard,
            admissionat: fworker.admissionat,
            emergencycontract: fworker.emergencycontract,
            leavingat: fworker.leavingat,
            disclosefilesign: false,
            educationfilesign: false,
            insurancefilesign: false
        }],
        page: null,
        condition: null
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
};

/**
 * 新增单条劳务人员信息并获取formid：
 * fworker 实体类数据；
 * code 返回的服务器结果；formid 返回的formid；
 */
export let addWorkerbformid = function (fworker = { projectid: null, groupid: null, name: null, age: null, repay: null, telno: null, idcard: null, admissionat: null, emergencycontract: null, leavingat: null, }, callback) {
    let datalist = {
        data: {
            user: storageJS.getUser().account,
            form: "dc_mng_worker",
            action: "add",
            retFields: ["formid"],
            fields: [{
                projectid: fworker.projectid,
                groupid: fworker.groupid,
                name: fworker.name,
                age: fworker.age,
                repay: fworker.repay,
                telno: fworker.telno,
                idcard: fworker.idcard,
                admissionat: fworker.admissionat,
                emergencycontract: fworker.emergencycontract,
                leavingat: fworker.leavingat,
                disclosefilesign: false,
                educationfilesign: false,
                insurancefilesign: false
            }],
            page: null,
            condition: null
        }
    }
    httpJS.request('/form', datalist, function (res) {
        let bformid, resData = JSON.parse(res.data).datalist.dc_mng_worker;
        if (null != resData) {
            bformid = resData[0].formid;
        }
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code, formid: bformid });
    });
};

/**
 * 更新劳务人员信息：
 * fworker 实体类数据；
 * cformid 表单id；
 * code 返回的服务器结果；
 */
export let updateWorker = function (fworker = { idcard: null, admissionat: null, age: null, emergencycontract: null, groupid: null, leavingat: null, name: null, projectid: null, repay: null, telno: null, }, cformid = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_worker",
        action: "updateList",
        fields: {
            idcard: fworker.idcard,
            admissionat: fworker.admissionat,
            age: fworker.age,
            emergencycontract: fworker.emergencycontract,
            groupid: fworker.groupid,
            leavingat: fworker.leavingat,
            name: fworker.name,
            projectid: fworker.projectid,
            repay: fworker.repay,
            telno: fworker.telno
        },
        page: null,
        condition: [{
            field: "formid",
            value: cformid,
            symbol: "="
        }]
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
};

/**
 * 更新劳务人员未提交三类文件标志：
 * fileSign 文件分类：disclose|education|insurance，交底|安全|保险；
 * cprojectid 项目id；
 * cworkerformidlist 更新的劳务人员表单id集合字符串；
 * code 返回的服务器结果；
 */
export let updateWorkerSignList = function (fileSign = null, cprojectid = null, cworkerformidlist = null, callback) {
    let fieldsValue = {};
    switch (fileSign) {
        case "disclose":
            fieldsValue.disclosefilesign = "true";
            break;
        case "education":
            fieldsValue.educationfilesign = "true";
            break;
        case "insurance":
            fieldsValue.insurancefilesign = "true";
            break;
        default:
            break;
    }
    let postList = [
        {
            name: "dc_mng_worker",
            form: "dc_mng_worker",
            action: "updateList",
            fields: fieldsValue,
            page: null,
            condition: [
                {
                    field: "formid",
                    value: cworkerformidlist,
                    symbol: "="
                }
            ]
        },
        {
            name: "dc_mng_project_messagedrives",
            form: "dc_mng_project_messagedrives",
            action: "updateList",
            fields: {
                status: "已处理"
            },
            condition: [
                { field: "messagetype", symbol: "=", value: "risk" },
                { field: "messagemodule", symbol: "=", value: fileSign },
                { field: "status", symbol: "=", value: "未处理" },
                { field: "projectid", symbol: "=", value: cprojectid }
            ],
            page: null
        }
    ];
    let datalist = {
        user: storageJS.getUser().account,
        clientip: null,
        platform: "WXP",
        batchFun: "serverTrans",
        source: null,
        batchList: postList
    };
    console.log("datalist")
    console.log(datalist)
    httpJS.request('/sbatch', datalist, function (res) {
        console.log(res)
        return typeof callback == 'function' && callback({ code: res.data.code })
    });
}

/**
 * 获取班组List：
 * cprojectid 项目id；
 * bfireGroup 返回的实体类数据；
 */
export let getTeamNameList = function (cprojectid, callback) {
    let bfireGroup = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_group",
        action: "get",
        fields: [
            "formid",
            "groupName"
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bfireGroup = JSON.parse(res.data).datalist.dc_mng_project_group;
        }
        return typeof callback == 'function' && callback(bfireGroup);
    });
};

/**
 * 获取三类文件已提交标志劳务人员：
 * cprojectid 项目id；
 * fileSign 文件类型标志，disclose|education|insurance；
 * bWorkerList 返回的实体类数据；
 */
export let getSignedWorkerList = function (cprojectid, fileSign, callback) {
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
                symbol: "="
            };
            conditionValue.push(pushData);
            break;
        case "education":
            var pushData = {
                field: "educationfilesign",
                value: "true",
                symbol: "="
            };
            conditionValue.push(pushData);
            break;

        case "insurance":
            var pushData = {
                field: "insurancefilesign",
                value: "true",
                symbol: "="
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