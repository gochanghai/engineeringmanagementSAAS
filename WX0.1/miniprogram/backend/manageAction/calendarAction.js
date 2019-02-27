const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const dateUtilJS = require('../../utils/date.js')

/**
 * 统计6大风险信息条数：
 * bcalendarData 返回的实体类数据
 */
export let countCelendarMessage = function (callback) {
    let bcalendarData = [];
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
        action: "dStatis",
        form: "dc_mng_project_messagedrives",
        fields: [
            "SUM(case when dc_mng_project_messagedrives.messagemodule = 'confirmvalue' then 1 else 0 end) as confirmMessageCount",
            "SUM(case when dc_mng_project_messagedrives.messagemodule = 'recievedpay' then 1 else 0 end) as recievedMessageCount",
            "SUM(case when dc_mng_project_messagedrives.messagemodule = 'inclose' then 1 else 0 end) as incloseMessageCount",
            "SUM(case when dc_mng_project_messagedrives.messagemodule = 'insurance' then 1 else 0 end) as insuranceMessageCount",
            "SUM(case when dc_mng_project_messagedrives.messagemodule = 'education' then 1 else 0 end) as educationMessageCount"
        ],
        page: null,
        dField: "createat",
        statisType: "Day",
        condition: [
            {
                field: "projectid",
                symbol: "=",
                value: ids
            }
        ]
    };
    httpJS.request('/form', datalist, function (res) {
        try {
            let resmessagedrive = JSON.parse(res.data).datalist.dc_mng_project_messagedrives;
            if (null != resmessagedrive) {
                for (let item of resmessagedrive) {
                    let events = {
                        date: item.Date,
                        countData: {
                            confirmValue: item.confirmMessageCount,
                            recievedPay: item.recievedMessageCount,
                            incloseFile: item.incloseMessageCount,
                            insuranceFile: item.insuranceMessageCount,
                            educationFile: item.educationMessageCount,
                        }
                    };
                    bcalendarData.push(events);
                }
            }
        } catch (error) { }
        return typeof callback == 'function' && callback(bcalendarData)
    });
}

/**
 * 由时间返回多个项目的消息：
 * cdate 查询日期；
 * bmessageSortList 返回的实体类数据；
 */
export let getMessageByDate = function (cdate = null, callback) {
    let bmessageSortList = {
        confirmvalue: [],
        recievedpay: [],
        disclose: [],
        education: [],
        insurance: [],
        progress: [],
        security: []
    };
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
            "dc_mng_project_messagedrives": [
                "formid",
                "messagetype",
                "messagemodule",
                "projectid",
                "pointtoid",
                "message",
                "createat",
                "status"
            ],
            "dc_mng_contract": ["projectabbreviation"],
        },
        join: [
            {
                "dc_mng_project_messagedrives": "projectid",
                "dc_mng_contract": "projectid"
            }
        ],
        page: null,
        condition: {
            "dc_mng_project_messagedrives": [
                {
                    field: "projectid",
                    value: ids,
                    symbol: "="
                }, {
                    field: "createat",
                    value: "'" + cdate + "' and '" + dateUtilJS.addDate(cdate, 1) + "'",
                    symbol: "BETWEEN"
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        let messageList = res.data.datalist.dc_mng_project_messagedrives;
        if (null != messageList) {
            bmessageSortList.confirmvalue = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "confirmvalue");
            bmessageSortList.recievedpay = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "recievedpay");
            bmessageSortList.disclose = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "disclose");
            bmessageSortList.education = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "education");
            bmessageSortList.insurance = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "insurance");
            bmessageSortList.progress = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "progress");
            bmessageSortList.security = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messagemodule == this;
            }, "security");
        }
        return typeof callback == 'function' && callback(bmessageSortList);
    });
};
