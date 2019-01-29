const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');


// 提交项目进度结点设置
function postProjectNode(projectID, nodeList = [{ nodeId: null, nodeName: null, startFrom: null, endAt: null, projectID: null, rowLevel: null, nodeParentName: null, finishStatus: null, }], callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "project_progressnode",
        action: "deleteList",
        fields: null,
        page: null,
        condition: [{
            field: "projectID",
            value: projectID,
            symbol: "="
        }]
    };
    //先删除再新增
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let postFieldsData = [];
            for (let item of nodeList) {
                let pageNode = {
                    nodeId: item.nodeId,
                    nodeName: item.nodeName,
                    startFrom: item.startFrom,
                    endAt: item.endAt,
                    projectID: item.projectID,
                    rowLevel: item.rowLevel,
                    nodeParentName: item.nodeParentName,
                    finishStatus: item.finishStatus
                };
                postFieldsData.push(pageNode);
            }
            let datalist = {
                user: storageJS.getUser().account,
                form: "project_progressnode",
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

// 获取项目进度列表
function getProjectNodeList(projectID, callback) {
    let NodeList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "project_progressnode",
        action: "get",
        distinct: false,
        fields: [
            "nodeId",
            "nodeName",
            "startFrom",
            "endAt",
            "projectID",
            "rowLevel",
            "nodeParentName",
            "finishStatus"
        ],
        page: null,
        condition: [{
            field: "projectID",
            value: projectID,
            symbol: "="
        }]
    };
    console.log(datalist);
    httpJS.request('/form', datalist, function (res) {
        console.log(res);
        if (null != JSON.parse(res.data).datalist.project_progressnode) {
            NodeList = JSON.parse(res.data).datalist.project_progressnode;
        }
        return typeof callback == 'function' && callback(NodeList);
    });
}
module.exports = {
    postProjectNode: postProjectNode,
    getProjectNodeList: getProjectNodeList,
}

