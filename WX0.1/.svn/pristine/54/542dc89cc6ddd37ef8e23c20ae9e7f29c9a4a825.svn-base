const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const dateJS = require('../utils/date.js');



function countCelendarMessage(callback) {
    let calendarData = [];
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
        action: "dStatis",
        form: "messagedrive",
        fields: [
            "sum(if(messageModule = 'confirmValue',1,0)) as confirmMessageCount",
            "sum(if(messageModule = 'recievedPay',1,0)) as recievedMessageCount",
            "sum(if(messageModule = 'inclose',1,0)) as incloseMessageCount",
            "sum(if(messageModule = 'insurance',1,0)) as insuranceMessageCount",
            "sum(if(messageModule = 'education',1,0)) as educationMessageCount"
        ],
        page: null,
        dField: "createAt",
        statisType: "Day",
        condition: [
            {
                field: "projectID",
                symbol: "=",
                value: ids
            }
        ]
    };
    httpJS.request('/form', datalist, function (res) {
        try {
            for (let item of JSON.parse(res.data).datalist.messagedrive) {
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
                calendarData.push(events);
            }
        } catch (error) { }
        return typeof callback == 'function' && callback(calendarData)
    });
}

// 由时间返回多个项目的消息
function getMessageByDate(date, callback) {
    let messageList = [];
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
                "messageType",
                "messageModule",
                "projectID",
                "pointToID",
                "message",
                "createAt",
                "status"
            ],
            contract: ["projectAbbreviation"],
        },
        join: [
            {
                messagedrive: "projectID",
                contract: "projectID"
            }
        ],
        page: null,
        condition: {
            messagedrive: [
                {
                    field: "projectID",
                    value: ids,
                    symbol: "="
                }, {
                    field: "createAt",
                    value: "'" + date + "' and '" + dateJS.addDate(date, 1) + "'",
                    symbol: "BETWEEN"
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        let messageSortList = {};
        try {
            messageList = JSON.parse(res.data).datalist.messagedrive;
            messageSortList.confirmvalue = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messageModule == this;
            }, "confirmvalue");
            messageSortList.recievedpay = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messageModule == this;
            }, "recievedpay");
            messageSortList.disclose = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messageModule == this;
            }, "disclose");
            messageSortList.education = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messageModule == this;
            }, "education");
            messageSortList.insurance = messageList.filter(function (resMessDataPage, index, array) {
                return resMessDataPage.messageModule == this;
            }, "insurance");
        } catch (error) { }
        return typeof callback == 'function' && callback(messageSortList);
    });
};

module.exports = {
    countCelendarMessage: countCelendarMessage,
    getMessageByDate: getMessageByDate,
}