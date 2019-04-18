const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const areaid = localStorage.getItem("areaid");
const groupid = localStorage.getItem("groupid");
const util = require('./utils/util.js');
/**
 * 安全教育业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */
//  安全培训数据库
const tbl_securityeducation = "securityeducation";
// 安全培训表字段
const fileds = ["objectid as fileid","formid","url","name","status","theme"];

const tbl_securityedu_file = 'file_forms';
const tbl_securityedu_file_fields = ["objectid as id", "projectid as workid", "filebelong", "fileid", "filename", "filetype", "filesize", "uploadat", "thumb"];

/**
 * 获取安全教育列表数据
 */
export let list = function (callback){
    console.log("www: ");
    let ids = groupid;
    let areaids = getAreaIds(areaid)
    if(areaids != ""){
        ids += "," + areaids;
    }
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "projectid",
            value: ids,
            symbol: "="
        }],
        order: "objectid desc"
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取视频列表数据
 */
export let listVideo = function (callback){
    console.log("www: ");
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取文档列表数据
 */
export let listDocument = function (callback){
    console.log("www: ");
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "!="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取一个安全教育信息
 */
export let getById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_securityeducation,
        action: "get",
        fields: fileds,
        condition: [{
            field: "formid",
            value: id,
            symbol: "="
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}


/**
 * formid = 1,2,3 
 * 删除安全培训文件
 */
export let batchDeleteByIds = function(ids, callback){
    console.log("www:删除组织成员 " + ids);
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            value: ids,
            symbol: "="
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 根据区域或类型获取数据
 */
export let listAreaDataByTypeAndArea = function (area, type, callback){
    console.log("www: ");
    let id = "";
    // 全部
    if(0 === area){
        id = groupid + "," + getAreaIds(areaid);
    }
    // 省
    if(1 === area){
        id = areaid.substring(0,2) + "0000"
    }
    // 市
    if(2 === area){
        id = areaid.substring(0,4) + "00"
    }
    // 区
    if(3 === area){
        id = areaid.substring(0,6);
    }
    // 街道    
    if(4 === area){
        id = areaid;
    }

    let typeif = "=";
    let condit_item = null;
    // 全部    
    if(0 === type){
    }
    // 视频    
    if(1 === type){
        typeif = "=";
        condit_item = {
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        }
    }
    // 文档    
    if(2 === type){
        condit_item = {
            field: "filebelong",
            value: "安全培训_video",
            symbol: "!="
        }
    }

    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "projectid",
            value: id,
            symbol: "="
        }],
        order: "objectid desc"
    };
    if(null != condit_item){
        data.condition.push(condit_item);
    }
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        let files = res.data.datalist.file_forms;
        if(1 === res.data.code && null != files){            
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}
/**
 * 获取省份级别数据
 */
export let listProvince = function (areaid, callback){
    console.log("www: ");
    areaid = areaid.substring(0,2) + "0000"
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        },{
            field: "projectid",
            value: areaid,
            symbol: "="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取市级别数据
 */
export let listCity = function (areaid, callback){
    areaid = areaid.substring(0,4) + "00"
    console.log("www: ");
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        },{
            field: "projectid",
            value: areaid,
            symbol: "="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取区级别数据
 */
export let listPrefecture = function (areaid, callback){
    console.log("www: ");
    areaid = areaid.substring(0,6);
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        },{
            field: "projectid",
            value: areaid,
            symbol: "="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取街道级别数据
 */
export let listStreet = function (areaid,callback){
    console.log("www: ");
    let data = {
        user: username,
        form: tbl_securityedu_file,
        action: "get",
        fields: tbl_securityedu_file_fields,
        condition: [{
            field: "formname",
            value: 'security_train_file',
            symbol: "="
        },{
            field: "filebelong",
            value: "安全培训_video",
            symbol: "="
        },{
            field: "projectid",
            value: areaid,
            symbol: "="
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            let files = res.data.datalist.file_forms;
            for(let i = 0; i < files.length; i++){
                // 文件大小计算
                files[i].filesize = util.fileSizeFormat(files[i].filesize);
                files[i].checked = false;
            }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取区域ids
 */
let getAreaIds = function(areaid){
    let ids = "";
    if(areaid.length >= 6){
        ids += areaid.substring(0,2);
        ids += "0000," + areaid.substring(0,4);
        ids += "00," + areaid.substring(0,6);
    }
    if(areaid.length >= 9){
        ids += "," + areaid;
    }
    return ids;
}
