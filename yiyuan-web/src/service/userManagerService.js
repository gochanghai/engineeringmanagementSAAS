/**
 * 用户管理业务逻辑接口
 * date: 2019-4-11 PM
 * auther: liuchanghai
 * verion: 0.10
 */
const md5Util = require('./server/md5.js');
const httpServer = require('./server/http.js');
const areaService = require('./areaService.js');
const username = localStorage.getItem("username");
const areaid = localStorage.getItem("areaid");
const groupid = localStorage.getItem("groupid");
// 用户数据表
var tbl_user = "worker";
var tbl_user_fileds = ["objectid as id","name","type","cellphone","account"];

/**
 * 获取用户列表数据
 */
export let listUser = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_user,
        action: "get",
        fields: tbl_user_fileds,
        condition: [
            {field: "type", symbol: "=", value:"政府"},
            // {field: "status", symbol: "=",value: 0},          
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
        if(1 === res.data.code && null != res.data.datalist.worker){
            result.list = res.data.datalist.worker;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取用户列表数据
 */
export let listUser2 = function (callback){
    areaService.getChildAreasList(areaid, res => {
        let ids = "";
        if(res.list != null){
            for(let item of res.list){
                ids += "," + item.id;
                // console.log(item);
            }
            ids = areaid + ids;
            let data = {
                user: username,
                form: tbl_user,
                action: "leftJoin",
                fields: {worker:tbl_user_fileds},
                join: [{
                    worker: "group_no",
                    company: "objectid"
                }],
                condition: {company:[
                    {field: "type", symbol: "=", value:"政府"},
                    {field: "area_id", symbol: "=",value: ids},          
                ]},
                order: "worker.objectid desc",
            };
            console.log(data);
            httpServer.request('/mform', data, res => {
                console.log(res.data);
                let result = {
                    code: res.data.code,
                    list: []
                };
                if(1 === res.data.code && null != res.data.datalist.worker){
                    result.list = res.data.datalist.worker;
                    return typeof callback == 'function' && callback(result);
                }
                return typeof callback == 'function' && callback(result);
            })
        }
    })    
}

/**
 * 获取一个用户信息
 */
export let getUserById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_user,
        action: "get",
        fields: tbl_user_fileds,
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
            data: []
        };
        if(1 === res.data.code && null != res.data.datalist.special_other){
            result.data = res.data.datalist.special_other[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * other = {username:'', phone: ', companyName:'' .... }
 * 添加一个用户
 */
export let addUser = function(user, callback){
    console.log("AddUser: " + user);
    console.log(user);
    let data = {
        user: username,
        devision: {
            name: user.mergerName,
            id: user.area_id,
        },
        userList: [{
            name: user.name,
            password: md5Util.hexMD5(user.password),
            cellphone: user.phone,
            phone: user.phone,
            account: user.phone,
        }],
    };
    console.log(data);
    httpServer.request('yysecurity/goverment_user_register', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}

/**
 * other = { id:'', name: '', group: '' .... }
 * 更新用户信息
 */
export let updateUserById = function(user, callback){
    console.log("UpdateUserById: " + user);
    console.log(user);
    let data = {
        user: username,
        form: tbl_user,
        action: "updateList",
        fields: {user},
        condition: [{
            field: "objectid",
            value: user.id,
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
 * id 
 * 删除一个用户
 */
export let deleteUserById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_user,
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
 * 检查用户名否存在
 */
export let checkUsername = function (username, callback){
    console.log("www: " + username);
    let data = {
        user: username,
        form: 'user',
        action: "get",
        fields: ["username"],
        condition: [{
            field: "username",            
            symbol: "=",
            value: username,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "此用户可用"
        }
        if(1 === res.data.code && null != res.data.datalist.user){
            result.code = 2;
            result.message = "此用户已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}