const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');


//获取管理人员列表数据
function getManagerList(projectID, callback) {
    var managerList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "manager",
        action: "get",
        fields: [
            "managerType",
            "managerName",
            "telphoneNo"
        ],
        page: null,
        condition: [{
            field: "projectID",
            symbol: "=",
            value: projectID
        }]
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            managerList = JSON.parse(res.data).datalist.manager;
        }
        return typeof callback == 'function' && callback(managerList);
    })
};

//获取班组人员列表
function getGroupList(projectID, callback) {
    var groupList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "project_group",
        action: "leftJoin",
        fields: {
            project_group: ["groupName", "groupId"],
            default: [
                "count(worker.objectId) as totalNumber",
                "SUM(if(worker.discloseFileSign = 'false',1,0)) as discloseFileSign",
                "SUM(if(worker.educationFileSign = 'false',1,0)) as educationFileSign",
                "SUM(if(worker.insuranceFileSign = 'false',1,0)) as insuranceFileSign"
            ]
        },
        join: [{
            worker: "groupId",
            project_group: "formId"
        }],
        condition: {
            project_group: [{
                field: "projectID",
                value: projectID,
                symbol: "="
            }]
        },
        group: "`project_group`.`groupName`"
    }
    httpJS.request('/mform', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            groupList = JSON.parse(res.data).datalist.project_group;
        }
        return typeof callback == 'function' && callback(groupList);
    })
};

// 获取施工人员列表
function getConstructionList(projectID, callback) {
    var constructionList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "worker",
        action: "leftJoin",
        fields: {
            worker: ["groupId"],
            project_group: ["groupName"],
            default: [
                "name",
                "age",
                "telNo",
                "admissionAt",
                "repay"
            ]
        },
        join: [{
            worker: "groupId",
            project_group: "formId"
        }],
        condition: {
            worker: [{
                field: "projectID",
                value: projectID,
                symbol: "="
            }]
        }
    }
    httpJS.request('/mform', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            constructionList = JSON.parse(res.data).datalist.worker;
        }
        return typeof callback == 'function' && callback(constructionList);
    })
}

module.exports = {
    getManagerList: getManagerList,
    getGroupList: getGroupList,
    getConstructionList: getConstructionList,
}