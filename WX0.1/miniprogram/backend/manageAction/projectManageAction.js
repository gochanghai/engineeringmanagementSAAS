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
        action: "get",
        distinct: false,
        fields: [
            "projectname",
            "projectabbreviation",
            "ownerapprovaltime",
            "ownerpaypercent",
            "ownerpaytime",
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }],
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bmangageInfo = JSON.parse(res.data).datalist.dc_mng_contract[0];
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