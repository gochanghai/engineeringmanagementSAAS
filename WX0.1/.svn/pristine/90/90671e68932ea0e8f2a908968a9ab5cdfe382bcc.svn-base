const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const dateJS = require('../utils/date.js');

// 提交任务
function postTask(taskInfo = { projectID: null, messageModule: null, pointToAccount: null, message: null, messageDemand: null, }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "messagedrive",
        action: "add",
        fields: [{
            "projectID": taskInfo.projectID,
            "messageType": "task",
            "messageModule": taskInfo.messageModule,
            "pointToAccount": taskInfo.pointToAccount,
            "message": taskInfo.message,
            "messageDemand": taskInfo.messageDemand,
            "status": "未处理",
            "createAt": dateJS.dateFun()
        }],
        page: null,
        condition: null
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

// 获取项目下拉列表
function getProjectNameList(callback) {
    let projectNameList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushData = {
            projectAbbreviation: item.projectAbbreviation,
            projectID: item.projectID,
        }
        projectNameList.push(pushData);
    }
    return typeof callback == 'function' && callback(projectNameList)
};

function getAssignUser(projectID, callback) {
    let assignUser = [];
    let datalist = {
        user: storageJS.getUser().account,
        action: "get",
        form: "manager",
        fields: ["managerName", "managerAccount"],
        page: null,
        condition: [
            {
                field: "projectID",
                value: projectID,
                symbol: "="
            }
        ]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            assignUser = JSON.parse(res.data).datalist.manager;
            return typeof callback == 'function' && callback(assignUser)
        }
        else return typeof callback == 'function' && callback({ code: -1 })
    });
}

module.exports = {
    postTask: postTask,
    getProjectNameList: getProjectNameList,
    getAssignUser: getAssignUser,
}