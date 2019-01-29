const httpJS = require('../utils/http.js');
const storageJS = require('../utils/storage.js');
const fileUtil = require('../utils/fileUtil.js');

let fileCategoryList = {
    confirmvalue: { value: '确认产值', count: 0, },
    recievedpay: { value: '回款', count: 0, },
    disclose: { value: '安全交底', count: 0, },
    education: { value: '安全教育', count: 0, },
    insurance: { value: '保险', count: 0, },
    IDCard: { value: '身份证', count: 0, },
},
    fileDateList = [],
    fileListData = [];

// 上传文件
/**
 * formName: "worker"||"confirmvalue"||"recievedpay"  
 * fileBelong: worker-"安全交底"|"保险"|"安全教育"|"身份证"||confirmvalue-"确认产值"||recievedpay-"回款"
 */
function fileUpload(fileInfo = { projectID: null, belongIdList: null, file: null, fileName: null, fileBelong: null, formName: null }, callback) {
    let formData = {
        user: storageJS.getUser().account,
        platform: "WX",
        projectID: fileInfo.projectID,
        belongIdList: fileInfo.belongIdList,
        fileBelong: fileInfo.fileBelong,
        file: fileInfo.file, //file对象
    };
    wx.uploadFile({
        url: httpJS.serverAddress + "/file/upload/" + fileInfo.formName + "/0", // 仅为示例，非真实的接口地址
        filePath: fileInfo.file, //要上传文件资源的路径
        name: fileInfo.fileName, //文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
        formData: formData, //HTTP 请求中其他额外的 form data
        success(res) { },
        fail(res) { },
        complete(res) {
            return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
        }
    })
}

// 下载
// 缓存文件
/**
 * formName: "worker"||"confirmvalue"||"recievedpay"  
 */
function fileGetPath(fileInfo = { formName: null, formobjId: null, fileId: null, fileName: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        platform: "WX",
        form: fileInfo.formName, //表单模版名
        objectID: fileInfo.formobjId, //文件所属表单ID
        fileId: fileInfo.fileId,
        fileName: fileInfo.fileName
    };
    httpJS.request('/file/download/' + fileInfo.formName + "/" + fileInfo.formobjId, datalist, function (res) {
        return typeof callback == 'function' && callback({ fileURL: res.data.file.url })
    })
}

// 获取附件列表
/**
 * formName: "worker"||"confirmvalue"||"recievedpay"  
 * fileBelong: worker-"安全交底"|"保险"|"安全教育"|"身份证"||confirmvalue-"确认产值"||recievedpay-"回款"
 */
function getFileList(fileInfo = { projectID: null, formName: null, belongIdList: null, fileBelong: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        form: "file_form",
        action: "get",
        fields: [
            "fileId",
            "fileName",
            "formName"
        ],
        page: null,
        condition: [{
            field: "projectID",
            value: fileInfo.projectID,
            symbol: "="
        }, {
            field: "formName",
            value: fileInfo.formName,
            symbol: "="
        }, {
            field: "belongIdList",
            value: fileInfo.belongIdList,
            symbol: "="
        }, {
            field: "fileBelong",
            value: fileInfo.fileBelong,
            symbol: "="
        }]
    }
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            let fileList = JSON.parse(res.data).datalist.file_form;
            return typeof callback == 'function' && callback(fileList)
        }
        else return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
    });
};

// 返回多项目的6大类文件总条数
function countFileListSortType(callback) {
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
        form: "file_form",
        action: "get",
        fields: ["count(fileBelong) as count", "fileBelong"],
        page: null,
        group: "fileBelong",
        condition: [
            {
                field: "projectID",
                symbol: "=",
                value: ids
            }
        ]
    };
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            try {
                if (null != JSON.parse(res.data).datalist.file_form) {
                    for (let item of JSON.parse(res.data).datalist.file_form) {
                        switch (item.fileBelong) {
                            case "确认产值":
                                fileCategoryList.confirmvalue.count = item.count;
                                break;
                            case "回款":
                                fileCategoryList.recievedpay.count = item.count;
                                break;
                            case "安全交底":
                                fileCategoryList.disclose.count = item.count;
                                break;
                            case "安全教育":
                                fileCategoryList.education.count = item.count;
                                break;
                            case "保险":
                                fileCategoryList.insurance.count = item.count;
                                break;
                            case "身份证":
                                fileCategoryList.IDCard.count = item.count;
                                break;
                        }
                    }
                }
            } catch (error) { }
        }
        return typeof callback == 'function' && callback(fileCategoryList)
    });
};

// 返回多项目的按时间排列的总条数
function countFileListSortTime(callback) {
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
        form: "file_form",
        fields: ["count(1) as sum1"],
        page: null,
        dField: "uploadAt",
        statisType: "Month",
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
            for (let item of JSON.parse(res.data).datalist.file_form) {
                let date = {
                    date: item.Date
                };
                fileDateList.push(date);
            }
        } catch (error) { }
        return typeof callback == 'function' && callback(fileDateList)
    });
};

// 由文件类型返回多个项目的文件列表
function getFileListByType(fileBelong = '安全交底' || '安全教育' || '保险' || '确认产值' || '身份证' || '回款', callback) {
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
        form: "file_form",
        action: "leftJoin",
        fields: {
            file_form: [
                "formId",
                "formName",
                "projectID",
                "belongIdList",
                "fileBelong",
                "fileId",
                "fileName",
                "fileType",
                "fileSize",
                "uploadAt",
                "uploadUser"
            ],
            contract: ["projectAbbreviation"]
        },
        join: [
            {
                file_form: "projectID",
                contract: "projectID"
            }
        ],
        page: null,
        condition: {
            file_form: [
                {
                    field: "projectID",
                    value: ids,
                    symbol: "="
                },
                {
                    field: "fileBelong",
                    value: fileBelong,
                    symbol: "="
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            fileListData = JSON.parse(res.data).datalist.file_form;
        } catch (error) { }
        return typeof callback == 'function' && callback(fileListData)
    });
};

// 由时间返回多个项目的文件列表
function getFileListByTime(date, callback) {
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
        form: "file_form",
        action: "leftJoin",
        fields: {
            file_form: [
                "formId",
                "formName",
                "projectID",
                "belongIdList",
                "fileBelong",
                "fileId",
                "fileName",
                "fileType",
                "fileSize",
                "uploadAt",
                "uploadUser"
            ],
            contract: ["projectAbbreviation"],
            default: ["CONCAT(" + date + ") AS releaseYearMonth"]
        },
        join: [
            {
                file_form: "projectID",
                contract: "projectID"
            }
        ],
        page: null,
        condition: {
            file_form: [
                {
                    field: "projectID",
                    value: ids,
                    symbol: "="
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            fileListData = JSON.parse(res.data).datalist.file_form;
        } catch (error) { }
        return typeof callback == 'function' && callback(fileListData)
    });
};

//缓存后预览文件
function previewFile(fileInfo = { fileName: null, filePath: null, fileType: null }) {
    let fileCase = fileUtil.recFileCase(fileUtil.getSux(fileInfo.fileName))
    switch (fileCase) {
        case 'document':
            wx.openDocument({
                filePath: fileInfo.filePath,
                fileType: fileInfo.fileType,
                success: function (res) {
                    console.log('打开文档成功');
                },
                fail: function (res) {
                    console.log('打开文档失败');
                    console.log(fileInfo.filePath);
                }
            })
            break
        case 'image':
            wx.previewImage({
                current: fileInfo.filePath, // 当前显示图片的http链接
                urls: [fileInfo.filePath] // 需要预览的图片http链接列表
            })
            break
        default:
            wx.showToast({
                title: '该文件类型暂不支持预览',
                icon: 'none'
            })
            break
    }
}


module.exports = {
    fileUpload: fileUpload,
    fileGetPath: fileGetPath,
    getFileList: getFileList,
    countFileListSortType: countFileListSortType,
    countFileListSortTime: countFileListSortTime,
    getFileListByType: getFileListByType,
    getFileListByTime: getFileListByTime,
    previewFile: previewFile,
}