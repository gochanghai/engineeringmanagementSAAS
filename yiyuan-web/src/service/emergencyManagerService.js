const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
/**
 * 应急管理业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */

// 数据库表
const tbl_emergencymanage = "emergency";
// 表字段
const tbl_emergencymanage_fields = ["objectid as id","division","command","name","position","phone"];

/**
 * 获取应急管理列表数据
 */
export let list = function (callback){
    console.log("www: 获取应急管理列表数据");
    let data = {
        user: username,
        form: tbl_emergencymanage,
        action: "get",
        fields: tbl_emergencymanage_fields,
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
            result.list = res.data.datalist.emergency;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个应急管理
 */
export let getById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_emergencymanage,
        action: "get",
        fields: tbl_emergencymanage_fields,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id            
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            emergency: null,
        }
        if(1 === res.data.code && null != res.data.datalist.emergency){
            result.emergency = res.data.datalist.emergency[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * emergencymanage = { .... }
 * 添加一个应急管理的信息
 */
export let add = function (emergencymanage, callback){
    console.log("www: " + emergencymanage);
    let data = {
        user: username,
        form: tbl_emergencymanage,
        action: "add",
        fields: [{
            name: emergencymanage.name,
            division: emergencymanage.division,
            position: emergencymanage.position,
            command: emergencymanage.command,
            phone: emergencymanage.phone,
            groupid: groupid
        }],
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
 * emergencymanage = { .... }
 * 更新一个应急管理的信息
 */
export let updateById = function (emergencymanage, callback){
    console.log("www: " + emergencymanage);
    let data = {
        user: username,
        form: tbl_emergencymanage,
        action: "updateList",
        fields: {
            name: emergencymanage.name,
            division: emergencymanage.division,
            position: emergencymanage.position,
            command: emergencymanage.command,
            phone: emergencymanage.phone
        },
        condition: [{
            field: "objectid",            
            symbol: "=",
            value: emergencymanage.id,
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
        }        
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * id 
 * 删除一个应急管理的信息
 */
export let deleteById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_emergencymanage,
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
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}


/**
 * 批量删除应急管理的信息
 * formid = 1,2,3
 */
export let batchDeleteByIds = function(ids, callback){
    console.log(ids);
    let data = {
        user: username,
        form: tbl_emergencymanage,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: ids
        }]
    };
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