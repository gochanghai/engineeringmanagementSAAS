const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');


/**
 * 获取项目管理设置信息: 
 * cprojectid 项目id；
 * bmangageInfo 返回实体类数据；
 * */
export let getManageInfo = function (cprojectid = null, callback) {
    let bmangageInfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_contract",
        action: "leftJoin",
        fields: {
            dc_mng_contract: [
                "projectabbreviation",
                "ownerapprovaltime",
                "ownerpaypercent",
                "ownerpaytime",
            ],
            dc_projects: ["name as projectname"]
        },
        join: [{
            dc_mng_contract: "projectid",
            dc_projects: "id"
        }],
        page: null,
        condition: {
            dc_mng_contract: [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            }]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        if (res.data.code > 0) {
            bmangageInfo = res.data.datalist.dc_mng_contract[0];
        }
        return typeof callback == 'function' && callback(bmangageInfo);
    });
};
/**
 * 更新项目管理设置信息: 
 * fmanageInfo 实体类数据； 
 * cprojectid 项目id；
 * code 返回服务器的结果；
 */
export let updateManageInfo = function (fmanageInfo = { projectabbreviation: null, ownerapprovaltime: null, ownerpaypercent: null, ownerpaytime: null, }, cprojectid = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_contract",
        action: "updateList",
        fields: {
            projectabbreviation: fmanageInfo.projectabbreviation,
            ownerapprovaltime: fmanageInfo.ownerapprovaltime,
            ownerpaypercent: fmanageInfo.ownerpaypercent,
            ownerpaytime: fmanageInfo.ownerpaytime,
        },
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
}