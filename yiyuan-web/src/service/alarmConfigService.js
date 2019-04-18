const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
/**
 * 警告配置业务逻辑接口
 * date: 2019-3-20 pm
 * auther: liuchanghai
 * verion: 0.10
 */

// 数据库表
const tbl_alarmconfig = "alarm_config";
// 表字段
const tbl_alarmconfig_fields = ["formid","name","type","max_value","min_value","remarks"];

/**
 * 获取警告配置列表数据
 */
export let list = function (callback){
    console.log("www: 获取警告配置列表数据");
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "get",
        fields: tbl_alarmconfig_fields,
        condition: [{
            field: "groupid",
            symbol: "=",
            value: groupid           
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
            result.list = res.data.datalist.alarm_config;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listByCompanyId = function (id, callback){
    console.log("www: 获取警告配置列表数据");
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "get",
        fields: tbl_alarmconfig_fields,
        condition: [{
            field: "groupid",
            symbol: "=",
            value: id           
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
            result.list = res.data.datalist.alarm_config;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个警告配置
 */
export let getById = function (formid, callback){
    console.log("www: " + formid);
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "get",
        fields: tbl_alarmconfig_fields,
        condition: [{
            field: "formid",
            symbol: "=",
            value: formid            
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            alarmConfig: {},
            code: res.data.code
        };
        if(1 === res.data.code && null != res.data.datalist.alarm_config){
            result.alarmConfig = res.data.datalist.alarm_config[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * alarmconfig = { .... }
 * 添加一个警告配置的信息
 */
export let add = function (alarmconfig, callback){
    console.log("www: " + alarmconfig);
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "add",
        fields: [{
            groupid: groupid,
            name: alarmconfig.name,
            type: alarmconfig.type,
            max_value: alarmconfig.max_value,
            min_value: alarmconfig.min_value,
        }],
        condition: null
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
 * alarmconfig = { .... }
 * 更新一个警告配置的信息
 */
export let updateById = function (alarmconfig, callback){
    console.log("www: " + alarmconfig);
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "updateList",
        fields: {
            name: alarmconfig.name,
            type: alarmconfig.type,
            max_value: alarmconfig.max_value,
            min_value: alarmconfig.min_value,
        },
        condition: [{
            field: "formid",            
            symbol: "=",
            value: alarmconfig.formid,
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
 * id 
 * 删除一个警告配置的信息
 */
export let deleteById = function (formid, callback){
    console.log("www: " + formid);
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "formid",            
            symbol: "=",
            value: formid,
        }]
    };
    httpServer.request('/form', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}


/**
 * 批量删除警告配置的信息
 * formids = 1,2,3
 */
export let batchDeleteByIds = function(formids, callback){
    console.log(formids);
    let data = {
        user: username,
        form: tbl_alarmconfig,
        action: "deleteList",
        fields: null,
        condition: {
            field: "formid",
            symbol: "=",
            value: formids
        }
    };
    httpServer.request('/form', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}