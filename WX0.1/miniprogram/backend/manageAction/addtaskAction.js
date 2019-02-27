const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const dateUtilJS = require('../../utils/date.js')


/**
 * 新增任务：
 * ftaskInfo 实体类数据；
 * code 返回的服务器结果；
 */
export let postTask = function (ftaskInfo = { projectid: null, messagemodule: null, pointtoaccount: null, message: null, messagedemand: null, }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_messagedrives",
        action: "add",
        fields: [{
            "projectid": ftaskInfo.projectid,
            "messagetype": "task",
            "messagemodule": ftaskInfo.messagemodule,
            "pointtoaccount": ftaskInfo.pointtoaccount,
            "message": ftaskInfo.message,
            "messagedemand": ftaskInfo.messagedemand,
            "status": "未处理",
            "createat": dateUtilJS.dateFun()
        }],
        page: null,
        condition: null
    }
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

/**
 * 从缓存中获取项目下拉列表：
 * bprojectNameList 返回的实体类数据；
 */
export let getProjectNameList = function (callback) {
    let bprojectNameList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushData = {
            projectAbbreviation: item.projectAbbreviation,
            projectid: item.projectid,
        }
        bprojectNameList.push(pushData);
    }
    return typeof callback == 'function' && callback(bprojectNameList)
};

/**
 * 获取单项目的管理人员列表：
 * cprojectid 项目id；
 * bassignUser 返回的实体类数据
 */
export let getAssignUser = function (cprojectid, callback) {
    let bassignUser = [];
    let datalist = {
        user: storageJS.getUser().account,
        action: "get",
        form: "dc_mng_manager",
        fields: ["managername", "manageraccount"],
        page: null,
        condition: [
            {
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }
        ]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bassignUser = JSON.parse(res.data).datalist.dc_mng_manager;
            return typeof callback == 'function' && callback(bassignUser)
        }
        else return typeof callback == 'function' && callback({ code: -1 })
    });
}
