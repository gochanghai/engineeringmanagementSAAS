const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');


/**
 * 已失效！！
 * 提交项目进度结点设置：
 * fnodeList 实体类数据；
 * cprojectid 项目id；
 * code 返回的服务器结果；
 */
let postProjectNode = function (cprojectid, fnodeList = [{ nodeid: null, nodename: null, startfrom: null, endat: null, projectid: null, rowlevel: null, nodeparentname: null, finishstatus: null, }], callback) {
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
 * 提交项目进度结点设置：
 * nodeList 实体类数据，其中
 * nodeList[x].status = 'update'|'delete'|'add'|''；
 * 在status为update或delete时使用，c+单词为查询条件，
 * 另有，status为add时应传入cprojectid作为新增数据的项目id：
 * nodeList[x].cformid 表单id，
 * nodeList[x].cprojectid 项目id；
 * code 返回的服务器结果；
 */
export let postProjectNode_2 = function (nodeList = [{ status: null, nodeid: null, nodename: null, startfrom: null, endat: null, rowlevel: null, nodeparentname: null, finishstatus: null, cformid: null, cprojectid: null }], callback) {
    let postList = [];
    let index = 0;
    for (let item of nodeList) {
        let actionValue, fieldsValue, conditionValue, dealFlag = false;
        switch (item.status) {
            case "update":
                actionValue = "updateList";
                fieldsValue = {
                    nodeid: item.nodeid,
                    nodename: item.nodename,
                    startfrom: item.startfrom,
                    endat: item.endat,
                    rowlevel: item.rowlevel,
                    nodeparentname: item.nodeparentname,
                    finishstatus: item.finishstatus
                };
                conditionValue = [{
                    field: "formid",
                    symbol: "=",
                    value: item.cformid
                },
                {
                    field: "projectid",
                    symbol: "=",
                    value: item.cprojectid
                }
                ];
                dealFlag = true;
                break;
            case "delete":
                actionValue = "deleteList";
                fieldsValue = null;
                conditionValue = [{
                    field: "formid",
                    symbol: "=",
                    value: item.cformid
                },
                {
                    field: "projectid",
                    symbol: "=",
                    value: item.cprojectid
                }
                ];
                dealFlag = true;
                break;
            case "add":
                actionValue = "add";
                fieldsValue = [{
                    nodeid: item.nodeid,
                    nodename: item.nodename,
                    startfrom: item.startfrom,
                    endat: item.endat,
                    projectid: item.cprojectid,
                    rowlevel: item.rowlevel,
                    nodeparentname: item.nodeparentname,
                    finishstatus: item.finishstatus
                }];
                conditionValue = null;
                dealFlag = true;
                break;
            case null:
            case "null":
            default:
                break;
        }
        if(dealFlag == true){
            let postPage = {
                name: "confirmnode_" + index,
                form: "dc_mng_project_progressnodes",
                action: actionValue,
                fields: fieldsValue,
                condition: conditionValue,
                page: null
            };
            index++;
            postList.push(postPage);
        }
    }
    let datalist = {
        user: storageJS.getUser().account,
        clientip: null,
        platform: "WXP",
        batchFun: "serverTrans",
        source: null,
        batchList: postList
    };
    httpJS.request('/sbatch', datalist, function (res) {
        return typeof callback == 'function' && callback({
            code: res.data.code || -1
        });
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
            "formid",
            "nodeid",
            "nodename",
            "startfrom",
            "endat",
            "projectid",
            "rowlevel",
            "nodeparentname",
            "finishstatus",
        ],
        page: null,
        condition: [{
            field: "projectid",
            value: cprojectid,
            symbol: "="
        }]
    };
    httpJS.request('/form', datalist, function (res) {
        if (null != JSON.parse(res.data).datalist.dc_mng_project_progressnodes) {
            bNodeList = JSON.parse(res.data).datalist.dc_mng_project_progressnodes;
        }
        return typeof callback == 'function' && callback(bNodeList);
    });
}

