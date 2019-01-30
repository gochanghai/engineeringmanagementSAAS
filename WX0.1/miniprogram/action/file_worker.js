const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const fileJS = require('./file.js');

// 获取三类文件未提交标志劳务人员
/**
 * {fileSign="disclose"||"education"||"insurance"}
 */
function getUnSignWorkerList(projectID, fileSign, callback) {
    let conditionValue = [
        {
            field: "projectID",
            value: projectID,
            symbol: "="
        }
    ];
    switch (fileSign) {
        case "disclose":
            var pushData = {
                field: "discloseFileSign",
                value: "true",
                symbol: "!="
            };
            conditionValue.push(pushData);
            break;
        case "education":
            var pushData = {
                field: "educationFileSign",
                value: "true",
                symbol: "!="
            };
            conditionValue.push(pushData);
            break;

        case "insurance":
            var pushData = {
                field: "insuranceFileSign",
                value: "true",
                symbol: "!="
            };
            conditionValue.push(pushData);
            break;
        default:
            break;
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "worker",
        action: "leftJoin",
        fields: {
            worker: ["formId", "name"],
            project_group: ["groupName"]
        },
        join: [
            {
                worker: "groupId",
                project_group: "formId"
            }
        ],
        page: null,
        condition: {
            worker: conditionValue
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let workerlist = JSON.parse(res.data).datalist.worker;
            return typeof callback == 'function' && callback(workerlist)
        }
        else return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

// 更新劳务人员未提交三类文件标志
function updateWorkerSignList(updateData = { projectID: null, fileSign: null, workerFormIdlist: null, }, callback) {
    let fieldsValue = {};
    switch (updateData.fileSign) {
        case "disclose":
            fieldsValue.discloseFileSign = "true";
            break;
        case "education":
            fieldsValue.educationFileSign = "true";
            break;
        case "insurance":
            fieldsValue.insuranceFileSign = "true";
            break;
        default:
            break;
    }
    let postList = [
        {
            name: "worker",
            form: "worker",
            action: "update",
            fields: fieldsValue,
            page: null,
            condition: [
                {
                    field: "formId",
                    value: updateData.workerFormIdlist,
                    symbol: "="
                }
            ]
        },
        {
            name: "messagedrive",
            form: "messagedrive",
            action: "update",
            fields: {
                status: "已处理"
            },
            condition: [
                { field: "messageType", symbol: "=", value: "risk" },
                { field: "messageModule", symbol: "=", value: updateData.fileSign },
                { field: "status", symbol: "=", value: "未处理" },
                { field: "projectID", symbol: "=", value: updateData.projectID }
            ],
            page: null
        }
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
        console.log(JSON.parse(res.data));
        return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
}

// 打包提交附件、更改劳务人员三类文件标志
/**
 * {fileSign:"disclose"||"education"||"insurance"} 
 */
function packageComitFileANDWorkerSignList(packageData = { workerFormIdlist: null, projectID: null, file: null, fileName: null, fileSign: null }, callback) {
    let fileBelong = '';
    switch (packageData.fileSign) {
        case "disclose":
            fileBelong = "安全交底";
            break;
        case "education":
            fileBelong = "安全教育";
            break;
        case "insurance":
            fileBelong = "保险";
            break;
        default:
            fileBelong = packageData.fileSign;
            break;
    }
    let fileInfo = {
        projectID: packageData.projectID,
        belongIdList: packageData.workerFormIdlist,
        file: packageData.file,
        fileName: packageData.fileName,
        fileBelong: fileBelong,
        formName: 'worker'
    }
    // let fileInfo = {
    //     projectID : 'SHXF-201810102',
    //     belongIdList : '1',
    //     file: tempFilePaths[0],
    //     fileName: '文件.jpg',
    //     fileBelong: '确认产值',
    //     formName: 'confirmvalue'
    // }
    // 先提交附件
    fileJS.fileUpload(fileInfo, function (res) {
        if (res.code == 1) {
            // 附件提交成功更新劳务人员三类文件标志
            let updateData = {
                projectID: packageData.projectID,
                fileSign: packageData.fileSign,
                workerFormIdlist: packageData.workerFormIdlist,
            }
            updateWorkerSignList(updateData, function (res) {
                return typeof callback == 'function' && callback({ code: res.code })
            })
        } else return typeof callback == 'function' && callback({ code: res.code })
    })
}

module.exports = {
    packageComitFileANDWorkerSignList: packageComitFileANDWorkerSignList,
    getUnSignWorkerList: getUnSignWorkerList
}