const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');

/**
 * 获取项目的班组列表：
 * projectid 项目id；
 * bgroupList 返回的实体类数据；
 */
export let getGroupList = function (projectid, callback) {
    let bgroupList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_group",
        action: "get",
        fields: [
            "formid",
            "groupname"
        ],
        condition: [{
            field: "projectid",
            value: projectid,
            symbol: "="
        }],
        page: null
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bgroupList = JSON.parse(res.data).datalist.dc_mng_project_group;
        }
        return typeof callback == 'function' && callback(bgroupList);
    })
};

/**
 * 新增班组时获取基础班组列表：
 * bbasegroupList 返回的实体类数据；
 */
export let getBaseGroupList = function (callback) {
    let bbasegroupList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_base_group",
        action: "get",
        fields: [
            "formid",
            "typename"
        ],
        condition: null,
        page: null
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bbasegroupList = JSON.parse(res.data).datalist.dc_mng_base_group;
        }
        return typeof callback == 'function' && callback(bbasegroupList);
    })
};

/**
 * 新增班组：
 * ffireGroup 实体类数据；
 * code 返回的服务器结果；
 */
export let addFireGroup = function (ffireGroup = { projectid: null, groupname: null, groupid: null, grouptype: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        action: "add",
        form: "dc_mng_project_group",
        fields: [{
            projectid: ffireGroup.projectid,
            groupname: ffireGroup.groupname,
            groupid: ffireGroup.groupid,
            grouptype: ffireGroup.grouptype
        }],
        condition: null
    };
    httpJS.request('/form', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
}