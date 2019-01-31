const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const dateUtil = require('../utils/date.js');

//所有消息获取
function getAllMessage(messageList, callback) {
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectID + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "messagedrive",
        action: "leftJoin",
        fields: {
            messagedrive: [
                "formId",
                "messageDemand",
                "messageType",
                "messageModule",
                "projectID",
                "pointToID",
                "message",
                "createAt",
                "status"
            ],
            contract: ["projectAbbreviation"]
        },
        join: [{
            messagedrive: "projectID",
            contract: "projectID"
        }],
        page: null,
        condition: {
            messagedrive: [{
                field: "projectID",
                value: ids,
                symbol: "="
            },
            {
                field: "status",
                value: "未处理",
                symbol: "="
            }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            let resMesData = JSON.parse(res.data).datalist.messagedrive;
            if (null != resMesData) {
                for (let item of messageList) {
                    item.messageData = resMesData.filter(function (
                        resMessDataPage,
                        index,
                        array
                    ) {
                        return resMessDataPage.projectID == this;
                    },
                        item.projectID);
                    item.messageTotal = item.messageData.length;
                }
            }
            return typeof callback == 'function' && callback(messageList)
        } catch (error) { }
    });
};


//风险消息获取
function getRiskMessage(riskMessageList, callback) {
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectID + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "messagedrive",
        action: "leftJoin",
        fields: {
            messagedrive: [
                "formId",
                "messageDemand",
                "messageType",
                "messageModule",
                "projectID",
                "pointToID",
                "message",
                "createAt",
                "status"
            ],
            contract: ["projectAbbreviation"]
        },
        join: [{
            messagedrive: "projectID",
            contract: "projectID"
        }],
        page: null,
        condition: {
            messagedrive: [{
                field: "projectID",
                value: ids,
                symbol: "="
            },
            {
                field: "status",
                value: "未处理",
                symbol: "="
            },
            {
                field: "messageType",
                value: "risk",
                symbol: "="
            }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            let resMesData = JSON.parse(res.data).datalist.messagedrive;
            if (null != resMesData) {
                for (let item of riskMessageList) {
                    item.messageData = resMesData.filter(function (
                        resMessDataPage,
                        index,
                        array
                    ) {
                        return resMessDataPage.projectID == this;
                    },
                        item.projectID);
                    item.messageTotal = item.messageData.length;
                }
            }
            return typeof callback == 'function' && callback(riskMessageList)
        } catch (error) { }
    });
};


//任务消息获取
function getTaskMessage(taskMessageList, callback) {
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectID + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "messagedrive",
        action: "leftJoin",
        fields: {
            messagedrive: [
                "formId",
                "messageDemand",
                "messageType",
                "messageModule",
                "projectID",
                "pointToID",
                "message",
                "createAt",
                "status"
            ],
            contract: ["projectAbbreviation"]
        },
        join: [{
            messagedrive: "projectID",
            contract: "projectID"
        }],
        page: null,
        condition: {
            messagedrive: [{
                field: "projectID",
                value: ids,
                symbol: "="
            },
            {
                field: "status",
                value: "未处理",
                symbol: "="
            },
            {
                field: "messageType",
                value: "task",
                symbol: "="
            }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            let resMesData = JSON.parse(res.data).datalist.messagedrive;
            if (null != resMesData) {
                for (let item of taskMessageList) {
                    item.messageData = resMesData.filter(function (
                        resMessDataPage,
                        index,
                        array
                    ) {
                        return resMessDataPage.projectID == this;
                    },
                        item.projectID);
                    item.messageTotal = item.messageData.length;
                }
            }
            return typeof callback == 'function' && callback(taskMessageList)
        } catch (error) { }
    });
};

//调用函数获取风险消息
function mountedRiskMessage(callback) {
    var riskMessageList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushBaseProject = {
            projectID: item.projectID,
            projectAbbreviation: item.projectAbbreviation,
            messageTotal: 0,
            messageData: []
        };
        riskMessageList.push(pushBaseProject);
    }
    getRiskMessage(riskMessageList, function (res) {
        return typeof callback == 'function' && callback(res)
    });
};

//调用函数获取任务消息
function mountedTaskMessage(callback) {
    var taskMessageList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushBaseProject = {
            projectID: item.projectID,
            projectAbbreviation: item.projectAbbreviation,
            messageTotal: 0,
            messageData: []
        };
        taskMessageList.push(pushBaseProject);
    }
    getTaskMessage(taskMessageList, function (res) {
        return typeof callback == 'function' && callback(res)
    });
};

//调用函数获取所有消息
function mountedAllMessage(callback) {
    var messageList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushBaseProject = {
            projectID: item.projectID,
            projectAbbreviation: item.projectAbbreviation,
            messageTotal: 0,
            messageData: []
        };
        messageList.push(pushBaseProject);
    }
    getAllMessage(messageList, function (res) {
        return typeof callback == 'function' && callback(res)
    });
};

// 多项目查询消息条数
function countMessageNo(callback) {
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectID + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "messagedrive",
        action: "get",
        distinct: false,
        fields: ["COUNT(objectId) AS countTotal"],
        page: null,
        condition: [{
            field: "projectID",
            value: ids,
            symbol: "="
        }, {
            field: "status",
            value: "未处理",
            symbol: "="
        }],
    }
    httpJS.request('/form', datalist, function (res) {
        let countNo = 0;
        if (JSON.parse(res.data).code > 0) {
            countNo = JSON.parse(res.data).datalist.messagedrive[0].countTotal
        }
        return typeof callback == 'function' && callback(countNo);
    })
};

//消息忽略
function mesIgnore(message = { projectID: null, formId: null, messageModule: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        batchFun: "serverTrans",
        source: null,
        batchList: [{
            name: "messagedrive",
            form: "messagedrive",
            action: "updateList",
            fields: {
                status: "已忽略",
                dealAt: dateUtil.formatTime()
            },
            condition: [{
                field: "formId",
                value: message.formId,
                symbol: "="
            }, {
                field: "status",
                value: "未处理",
                symbol: "="
            }],
            page: null
        },
        {
            name: "messagedeal",
            form: "messagedeal",
            action: "add",
            fields: [{
                projectID: message.projectID,
                driveId: message.formId,
                driveStatus: "已忽略",
                dealAt: dateUtil.formatTime(),
                driveType: message.messageModule,
            }],
            condition: null,
            page: null
        }
        ]
    }
    httpJS.request('/sbatch', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};



module.exports = {
    mountedRiskMessage: mountedRiskMessage,
    mountedTaskMessage: mountedTaskMessage,
    mountedAllMessage: mountedAllMessage,
    countMessageNo: countMessageNo,
    mesIgnore: mesIgnore,
}