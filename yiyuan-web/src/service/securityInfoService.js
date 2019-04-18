/**
 * 安全信息业务逻辑接口
 */

const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");

var table = 'security_info';
var table_fileds = ["rel_no","title","content","read_amount","create_time","groupid", "delete_flag"];

var  tbl_file = 'file_forms';
var  tbl_file_fields = ["objectid as id", "projectid as workid", "filebelong", "fileid", "filename", "filetype", "filesize", "uploadat", "thumb"];

/**
 * 获取发布安全信息列表数据
 */
export let list = function (callback){
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [
            {field: "groupid", symbol: "=", value: groupid},
            {field: "delete_flag", symbol: "=", value: 0}         
        ],
        order: "objectid desc"
    };
    console.log(data);
    httpServer.request('/form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: []
        };
        if(1 === res.data.code && null != res.data.datalist.security_info){
            result.list = res.data.datalist.security_info;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取安全信息列表数据
 */
export let listHistory = function (callback){
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [
            {field: "groupid", symbol: "=", value: groupid}      
        ],
        order: "objectid desc"
    };
    console.log(data);
    httpServer.request('/form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: []
        };
        if(1 === res.data.code && null != res.data.datalist.security_info){
            result.list = res.data.datalist.security_info;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * info = {rel_no:'', title: ',  .... }
 * 添加一个安全信息
 */
export let add = function(info, callback){
    console.log("Addinfo: " + info);
    console.log(info);
    info.groupid = groupid;
    let data = {
        user: username,
        form: table,
        action: "add",
        fields: [info],
        condition: null
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}

/**
 * info = { rel_no:'', name: '', groupid: '' .... }
 * 更新安全信息
 */
export let updateById = function(info, callback){
    console.log("UpdateUserById: " + info);
    console.log(info);
    let data = {
        user: username,
        form: table,
        action: "updateList",
        fields: info,
        condition: [{
            field: "rel_no",
            value: info.rel_no,
            symbol: "="
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}

/**
 * 获取一个安全信息
 */
export let getInfoById = function (rel_no, callback){
    console.log("www: " + rel_no);
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [{
            field: "rel_no",
            symbol: "=",
            value: rel_no            
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            data: []
        };
        if(1 === res.data.code && null != res.data.datalist.security_info){
            result.data = res.data.datalist.security_info[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * rel_no 
 * 删除一个安全信息
 */
export let deleteByRel_no = function (rel_no, callback){
    console.log("www: " + rel_no);
    let data = {
        user: username,
        form: table,
        action: "updateList",
        fields: {delete_flag: 1},
        condition: [{
            field: "rel_no",            
            symbol: "=",
            value: rel_no,
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
 * 获取附件数据
 */
export let listFileByRel_no = function (rel_no,callback){
    let data = {
        user: username,
        form: tbl_file,
        action: "get",
        fields: tbl_file_fields,
        condition: [{
            field: "formname",
            value: 'security_info',
            symbol: "="
        },{
            field: "belongidlist",
            value: rel_no,
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
            // for(let i = 0; i < files.length; i++){
            //     // 文件大小计算
            //     files[i].filesize = util.fileSizeFormat(files[i].filesize);
            // }
            result.list = files;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}