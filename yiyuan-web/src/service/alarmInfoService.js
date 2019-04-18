const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = sessionStorage.getItem("groupid");
/**
 * 警告信息业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */

// 数据库表
const tbl_alarm_info = "alarm_info";
// 表字段
const tbl_alarm_info_fields = ["objectid as id", "status", "type", "name", "alarmtime", "alarmvalue"];

/**
 * 获取历史警告信息列表数据
 */
export let listHistoryInfo = function (callback) {
    console.log("www: 获取警告信息列表数据");
    let data = {
        user: username,
        form: tbl_alarm_info,
        action: "get",
        fields: tbl_alarm_info_fields,
        condition: [
            { field: "groupid", symbol: "=", value: groupid },
            { field: "status", symbol: "=", value: 1 },
        ],
        order: "objectid desc"
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: []
        };
        if (1 === res.data.code != res.data.datalist.alarm_info) {
            result.list = res.data.datalist.alarm_info;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取实时警告信息列表数据
 */
export let listRealTimeInfo = function (callback) {
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_alarm_info,
        action: "get",
        fields: tbl_alarm_info_fields,
        condition: [
            { field: "groupid", symbol: "=", value: groupid },
            { field: "status", symbol: "=", value: 0 },
        ]
    };
    console.log(data);
    httpServer.request('/form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: []
        };
        if (1 === res.data.code != res.data.datalist.alarm_info) {
            result.list = res.data.datalist.alarm_info;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个警告信息
 */
export let getById = function (id, callback) {
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_alarm_info,
        action: "get",
        fields: tbl_alarm_info_fields,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        if (1 === res.data.code) {
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}

/**
 * id 
 * 删除一个警告信息
 */
export let deleteById = function (id, callback) {
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_alarm_info,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        if (1 === res.data.code) {
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}


/**
 * 批量删除警告信息
 * id_list = [1,2,3]
 */
export let batchDeleteById_list = function (id_list, callback) {
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_alarm_info,
        action: "deleteList",
        fields: null,
        condition: {
            field: "objectid",
            symbol: "=",
            value: id_list
        }
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        if (1 === res.data.code) {
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}