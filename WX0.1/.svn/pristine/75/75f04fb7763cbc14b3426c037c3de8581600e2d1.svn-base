const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const dateUtilJS = require('../utils/date.js')

function getConfirmvalue(formId, callback) {
    let confirmvalue = {};
    let datalist = {
        user: storageJS.getUser().account,
        form: "confirmvalue",
        action: "leftJoin",
        fields: {
            confirmvalue: [
                "formId",
                "projectID",
                "progressNodeID",
                "valueUploadAt",
                "outputValue",
                "receivableAmount",
                "confirmAt",
                "status"
            ],
            contract: ["ownerPayTime", "ownerPayPercent"]
        },
        join: [
            {
                confirmvalue: "projectID",
                contract: "projectID"
            }
        ],
        page: null,
        condition: {
            confirmvalue: [
                {
                    field: "formId",
                    value: formId,
                    symbol: "="
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            confirmvalue = JSON.parse(res.data).datalist.confirmvalue[0] || null;
        } catch (error) { }
        return typeof callback == 'function' && callback(confirmvalue);
    });
};

// 确认提交产值登记数据
function updateConfirmvalue(confirmvalue = { confirmAt: null, outputValue: null, receivableAmount: null, valueUploadAt: null, formId: null, projectID: null, progressNodeID: null, ownerPayTime: null, }, callback) {
    let postList = [
        {
            name: "confirmvalue",
            form: "confirmvalue",
            action: "update",
            fields: {
                confirmAt: confirmvalue.confirmAt,
                outputValue: confirmvalue.outputValue,
                receivableAmount: confirmvalue.receivableAmount,
                valueUploadAt: confirmvalue.valueUploadAt
            },
            condition: [
                { field: "formId", symbol: "=", value: confirmvalue.formId },
                { field: "projectID", symbol: "=", value: confirmvalue.projectID }
            ],
            page: null
        },
        {
            name: "recievedpay",
            form: "recievedpay",
            action: "add",
            fields: {
                projectID: confirmvalue.projectID,
                progressNodeID: confirmvalue.progressNodeID,
                confirmValueID: confirmvalue.formId,
                planReceivAt: dateUtilJS.addDate(confirmvalue.confirmAt, confirmvalue.ownerPayTime),
                theoryReceivAmount: confirmvalue.receivableAmount
            },
            condition: null,
            page: null
        },
        {
            name: "messagedrive",
            form: "messagedrive",
            action: "update",
            fields: {
                status: "已处理"
            },
            condition: [
                { field: "pointToID", symbol: "=", value: confirmvalue.formId },
                { field: "messageType", symbol: "=", value: "risk" },
                { field: "messageModule", symbol: "=", value: 'confirmvalue' },
                { field: "status", symbol: "=", value: "未处理" },
                { field: "projectID", symbol: "=", value: confirmvalue.projectID }
            ],
            page: null
        },
    ];
    let datalist = {
        user: storageJS.getUser().account,
        clientip: null,
        platform: "PCW",
        batchFun: "jsonTrans",
        source: null,
        batchList: postList
    };
    httpJS.request('/sbatch', datalist, function (res) {
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

module.exports = {
    updateConfirmvalue: updateConfirmvalue,
    getConfirmvalue: getConfirmvalue,
}