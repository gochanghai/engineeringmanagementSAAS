import { getConstructionList } from './personnelAction.js';

const httpJS = require('../../static/http.js');
const storageJS = require('../../static/storage.js');
const fileUtil = require('../../utils/fileUtil.js');

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

/**
 * 上传文件：
 * formname: "worker"||"confirmvalue"||"recievedpay";
 * filebelong: worker-"安全交底"|"保险"|"安全教育"|"身份证"||confirmvalue-"确认产值"||recievedpay-"回款";
 * code 服务器返回的结果;
 */
export let fileUpload = function (fileInfo = { projectid: null, belongidlist: null, file: null, filename: null, filebelong: null, formname: null }, callback) {
    let formData = {
        user: storageJS.getUser().account,
        platform: "WXP",
        projectid: fileInfo.projectid,
        belongidlist: fileInfo.belongidlist,
        filebelong: fileInfo.filebelong,
        file: fileInfo.file, //file对象
    };
    wx.uploadFile({
        url: httpJS.serverAddress + "/file/upload/" + fileInfo.formname + "/0",
        filePath: fileInfo.file, //要上传文件资源的路径
        name: fileInfo.filename, //文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
        formData: formData, //HTTP 请求中其他额外的 form data
        success(res) { },
        fail(res) { },
        complete(res) {
            return typeof callback == 'function' && callback({ code: JSON.parse(res.data).code })
        }
    })
}

/**
 * 下载 - 缓存文件：
 * fileInfo 实体类数据，其中 formname="worker"||"confirmvalue"||"recievedpay"  
 */
export let fileGetPath = function (fileInfo = { formname: null, formobjId: null, fileid: null, filename: null }, callback) {
    let datalist = {
        user: storageJS.getUser().account,
        platform: "WX",
        form: fileInfo.formname, //表单模版名
        objectID: fileInfo.formobjId, //文件所属表单ID
        fileid: fileInfo.fileid,
        filename: fileInfo.filename
    };
    httpJS.request('/file/download/' + fileInfo.formname + "/" + fileInfo.formobjId, datalist, function (res) {
        return typeof callback == 'function' && callback({ fileURL: res.data.file.url })
    })
}

/**
 * 获取附件列表：
 * fileInfo 可定制的过滤条件，其中 formname: "worker"||"confirmvalue"||"recievedpay"，filebelong: worker-"安全交底"|"保险"|"安全教育"|"身份证"||confirmvalue-"确认产值"||recievedpay-"回款";
 * fileInfo.projectid 项目id，为null则不作为过滤条件；
 * fileInfo.formname 源表单，为null则不作为过滤条件；...
 * bfileList 返回的实体类数据；
 **/
export let getFileList = function (fileInfo = { projectid: null, formname: null, belongidlist: null, filebelong: null }, callback) {
    let bfileList = [];
    let conditionValue = [];
    let conditionpushData = {};
    if (null != fileInfo.projectid) {
        conditionpushData = { field: "projectid", value: fileInfo.projectid, symbol: "=" }
        conditionValue.push(conditionpushData)
    }
    if (null != fileInfo.formname) {
        conditionpushData = { field: "formname", value: fileInfo.formname, symbol: "=" }
        conditionValue.push(conditionpushData)
    }
    if (null != fileInfo.belongidlist) {
        conditionpushData = { field: "belongidlist", value: fileInfo.belongidlist, symbol: "=" }
        conditionValue.push(conditionpushData)
    }
    if (null != fileInfo.filebelong) {
        conditionpushData = { field: "filebelong", value: fileInfo.filebelong, symbol: "=" }
        conditionValue.push(conditionpushData)
    }
    let datalist = {
        user: storageJS.getUser().account,
        form: "dc_mng_file_forms",
        action: "get",
        fields: [
            "fileid",
            "filename",
            "formname",
            "uploadat"
        ],
        page: null,
        condition: conditionValue
    }
    console.log(datalist)
    httpJS.request('/form', datalist, function (res) {
        if (JSON.parse(res.data).code > 0) {
            bfileList = JSON.parse(res.data).datalist.dc_mng_file_forms;
        }
        return typeof callback == 'function' && callback(bfileList)
    });
};

// 返回多项目的6大类文件总条数
export let countFileListSortType = function (callback) {
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
        form: "dc_mng_file_forms",
        action: "get",
        fields: ["count(filebelong) as count", "filebelong"],
        page: null,
        group: "filebelong",
        condition: [
            {
                field: "projectid",
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
                        switch (item.filebelong) {
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
export let countFileListSortTime = function (callback) {
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
        form: "dc_mng_file_forms",
        fields: ["count(1) as sum1"],
        page: null,
        dField: "uploadAt",
        statisType: "Month",
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
export let getFileListByType = function (filebelong = '安全交底' || '安全教育' || '保险' || '确认产值' || '身份证' || '回款', callback) {
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
        form: "dc_mng_file_forms",
        action: "leftJoin",
        fields: {
            dc_mng_file_forms: [
                "formId",
                "formname",
                "projectid",
                "belongidlist",
                "filebelong",
                "fileid",
                "filename",
                "fileType",
                "fileSize",
                "uploadAt",
                "uploadUser"
            ],
            contract: ["projectAbbreviation"]
        },
        join: [
            {
                dc_mng_file_forms: "projectid",
                contract: "projectid"
            }
        ],
        page: null,
        condition: {
            dc_mng_file_forms: [
                {
                    field: "projectid",
                    value: ids,
                    symbol: "="
                },
                {
                    field: "filebelong",
                    value: filebelong,
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
export let getFileListByTime = function (date, callback) {
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
        form: "dc_mng_file_forms",
        action: "leftJoin",
        fields: {
            dc_mng_file_forms: [
                "formId",
                "formname",
                "projectid",
                "belongidlist",
                "filebelong",
                "fileid",
                "filename",
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
                dc_mng_file_forms: "projectid",
                contract: "projectid"
            }
        ],
        page: null,
        condition: {
            dc_mng_file_forms: [
                {
                    field: "projectid",
                    value: ids,
                    symbol: "="
                }
            ]
        }
    };
    httpJS.request('/mform', datalist, function (res) {
        try {
            fileListData = JSON.parse(res.data).datalist.dc_mng_file_forms;
        } catch (error) { }
        return typeof callback == 'function' && callback(fileListData)
    });
};

/**
 * 缓存后预览文件：
 * fileInfo 实体类数据；
 */
export let previewFile = function (fileInfo = { fileName: null, filePath: null, fileType: null }) {
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