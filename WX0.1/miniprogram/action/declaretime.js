const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');


//获取合同启止与申报类型
function getContractInfo(projectID, callback) {
    let contractInfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "contract",
        action: "get",
        distinct: false,
        fields: ["startFrom", "endAt", "confirmType", "confirmTypeMemo"],
        page: null,
        condition: [
            {
                field: "projectID",
                value: projectID,
                symbol: "="
            }
        ],
        group: "projectID"
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            contractInfo = JSON.parse(res.data).datalist.contract[0];
        }
        return typeof callback == 'function' && callback(contractInfo);
    });
};

//获取申报时间列表
function getDeclaretimeList(projectID, callback) {
    let declaretimeList = [];
    let datalist = {
        user: storageJS.getUser().account,
        form: "project_confirmnode",
        action: "get",
        distinct: false,
        fields: ["dateNode", "nodeDeclare"],
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
            let DateList = JSON.parse(res.data).datalist.project_confirmnode;
            for (let item of DateList) {
                item.status = "updateDetail";
            }
            declaretimeList = DateList;
        }
        return typeof callback == 'function' && callback(declaretimeList);
    });
};

//提交申报时间列表变化
function postDeclaretiemList(projectID, dateList = [{ status: null, dateNode: null, nodeDeclare: null, objectId: null, projectID: null }], callback) {
    let postList = [];
    for (let item of dateList) {
        let actionValue, fieldsValue, conditionValue;
        switch (item.status) {
            case "updateDetail":
                actionValue = "update";
                fieldsValue = {
                    dateNode: item.dateNode,
                    nodeDeclare: item.nodeDeclare
                };
                conditionValue = [
                    { field: "objectId", symbol: "=", value: item.objectId },
                    { field: "projectID", symbol: "=", value: projectID }
                ];
                break;
            case "deleteDetail":
                actionValue = "delete";
                fieldsValue = null;
                conditionValue = [
                    { field: "objectId", symbol: "=", value: item.objectId },
                    { field: "projectID", symbol: "=", value: projectID }
                ];
                break;
            case null:
            case "addDetail":
            default:
                actionValue = "add";
                fieldsValue = [{
                    dateNode: item.dateNode,
                    nodeDeclare: item.nodeDeclare,
                    projectID: projectID
                }];
                conditionValue = null;
                break;
        }

        let postPage = {
            name: "confirmnode_" + dateList.indexOf(item),
            form: "project_confirmnode",
            action: actionValue,
            fields: fieldsValue,
            condition: conditionValue,
            page: null
        };
        postList.push(postPage);
    }
    let datalist = {
        user: storageJS.getUser().account,
        clientip: null,
        platform: "WX",
        batchFun: "serverTrans",
        source: null,
        batchList: postList
    };
    httpJS.request('/sbatch', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code });
    });
};

module.exports = {
    getContractInfo: getContractInfo,
    getDeclaretimeList: getDeclaretimeList,
    postDeclaretiemList: postDeclaretiemList,
}
