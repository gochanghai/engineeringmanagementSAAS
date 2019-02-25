const httpJS = require('../net/http.js');
const storageJS = require('../../static/storage.js');
const dateUtilJS = require('../../utils/date.js')

//所有消息获取
function getAllMessage(messageList, callback) {
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectid + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_messagedrives",
        action: "leftJoin",
        fields: {
            dc_mng_project_messagedrives: [
                "formid",
                "messagedemand",
                "messagetype",
                "messagemodule",
                "projectid",
                "pointtoid",
                "message",
                "createAt",
                "status"
            ],
            dc_mng_contract: ["projectabbreviation"]
        },
        join: [{
            dc_mng_project_messagedrives: "projectid",
            dc_mng_contract: "projectid"
        }],
        page: null,
        condition: {
            dc_mng_project_messagedrives: [{
                field: "projectid",
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
            let resMesData = JSON.parse(res.data).datalist.dc_mng_project_messagedrives;
            if (null != resMesData) {
                for (let item of messageList) {
                    item.messageData = resMesData.filter(function (
                        resMessDataPage,
                        index,
                        array
                    ) {
                        return resMessDataPage.projectid == this;
                    },
                        item.projectid);
                    item.messageTotal = item.messageData.length;
                }
            }
        } catch (error) { }
        return typeof callback == 'function' && callback(messageList)
    });
};

/**
 * 多项目获取所有消息：
 * bmessageList 返回的实体类数据；
 */
function mountedAllMessage(callback) {
    var bmessageList = [];
    let projectList = storageJS.getProjectList();
    for (let item of projectList) {
        let pushBaseProject = {
            projectid: item.projectid,
            messageTotal: 0,
            messageData: []
        };
        bmessageList.push(pushBaseProject);
    }
    getAllMessage(bmessageList, function (res) {
        return typeof callback == 'function' && callback(res)
    });
};

/**
 * 获取单条消息详情：
 * cformid 表单id；
 * cprojectid 项目id；
 * bmessageInfo 返回的实体类数据
 */
function getMessagePage(cformid, cprojectid, callback) {
    let bmessageInfo = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_messagedrives",
        action: "leftJoin",
        fields: {
            dc_mng_project_messagedrives: [
                "formid",
                "messagedemand",
                "messagetype",
                "messagemodule",
                "projectid",
                "pointtoid",
                "message",
                "createAt",
                "status"
            ],
            dc_mng_contract: ["projectabbreviation"]
        },
        join: [{
            dc_mng_project_messagedrives: "projectid",
            dc_mng_contract: "projectid"
        }],
        page: null,
        condition: {
            dc_mng_project_messagedrives: [{
                field: "projectid",
                value: cprojectid,
                symbol: "="
            },
            {
                field: "formid",
                value: cformid,
                symbol: "="
            }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            let resMesData = JSON.parse(res.data).datalist.dc_mng_project_messagedrives;
            if (null != resMesData) {
                bmessageInfo = resMesData[0];
            }
        } catch (error) { }
        return typeof callback == 'function' && callback(bmessageInfo)
    });
};


/**
 * 多项目查询消息条数：
 * bcountNo=0 返回的消息条数；
 */
function countMessageNo(callback) {
    let bcountNo = 0;
    let projectList = storageJS.getProjectList();
    let ids = "";
    for (let item of projectList) {
        ids += item.projectid + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_project_messagedrives",
        action: "get",
        distinct: false,
        fields: ["COUNT(objectid) AS countTotal"],
        page: null,
        condition: [{
            field: "projectid",
            value: ids,
            symbol: "="
        }, {
            field: "status",
            value: "未处理",
            symbol: "="
        }],
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
          let resmessagedrive = JSON.parse(res.data).datalist.dc_mng_project_messagedrives;
            if (null != resmessagedrive)
              bcountNo = resmessagedrive[0].counttotal
        }
        return typeof callback == 'function' && callback(bcountNo);
    })
};

/**
 * 消息忽略：
 * cprojectid 项目id；
 * cformid 表单id；
 * cmessagemodule 消息类型；
 * code 返回服务器的结果；
 */
function mesIgnore(cprojectid = null, cformid = null, cmessagemodule = null, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        batchFun: "serverTrans",
        source: null,
        batchList: [{
          name: "dc_mng_project_messagedrives",
          form: "dc_mng_project_messagedrives",
            action: "updateList",
            fields: {
                status: "已忽略",
                dealat: dateUtilJS.formatTime()
            },
            condition: [{
                field: "formid",
                value: cformid,
                symbol: "="
            }, {
                field: "status",
                value: "未处理",
                symbol: "="
            }],
            page: null
        },
        {
          name: "dc_mng_project_messagedeal",
          form: "dc_mng_project_messagedeal",
            action: "add",
            fields: [{
                projectid: cprojectid,
                driveid: cformid,
                drivestatus: "已忽略",
                dealat: dateUtilJS.formatTime(),
                drivetype: cmessagemodule,
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
    mountedAllMessage: mountedAllMessage,
    getMessagePage: getMessagePage,
    countMessageNo: countMessageNo,
    mesIgnore: mesIgnore,
}