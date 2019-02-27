const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');


/**
 * 提交项目进度结点设置：
 * fnodeList 实体类数据；
 * cprojectid 项目id；
 * code 返回的服务器结果；
 */
export let postProjectNode = function (cprojectid, fnodeList = [{ nodeid: null, nodename: null, startfrom: null, endat: null, projectid: null, rowlevel: null, nodeparentname: null, finishstatus: null, }], callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_progressnodes",
        action: "deleteList",
        fields: null,
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    //先删除再新增
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let postFieldsData = [];
            for (let item of fnodeList) {
                let pageNode = {
                    nodeid: item.nodeid,
                    nodename: item.nodename,
                    startfrom: item.startfrom,
                    endat: item.endat,
                    projectid: item.projectid,
                    rowlevel: item.rowlevel,
                    nodeparentname: item.nodeparentname,
                    finishstatus: item.finishstatus
                };
                postFieldsData.push(pageNode);
            }
            let datalist = {
                user: storageJS.getUser().account,
                form: "dc_mng_project_progressnodes",
                action: "add",
                fields: postFieldsData,
                page: null,
                condition: null
            };
            httpJS.request('/form', datalist, function (res) {
                return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
            });
        } else {
            return typeof callback == 'function' && callback({ code: -1 });
        }

    });
};

/**
 * 获取项目进度列表：
 * cprojectid 项目id；
 * bNodeList 返回的实体类数据；
 */
export let getProjectNodeList = function (cprojectid, callback) {
    let bNodeList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_progressnodes",
        action: "get",
        distinct: false,
        fields: [
            "nodeid",
            "nodename",
            "startfrom",
            "endat",
            "projectid",
            "rowlevel",
            "nodeparentname",
            "finishstatus"
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        if (null != JSON.parse(res.data).datalist.project_progressnode) {
            bNodeList = JSON.parse(res.data).datalist.project_progressnode;
        }
        return typeof callback == 'function' && callback(bNodeList);
    });
}

