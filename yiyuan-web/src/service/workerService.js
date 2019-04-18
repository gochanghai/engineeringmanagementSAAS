/**
 * 风险识别业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.1.0
 */
const httpServer = require('./server/http.js');
const md5Util = require('./server/md5.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
// 组织架构表
const tbl_group_worker = "worker"
// 组织架构字段
const tbl_group_worker_fileds = ["objectid as id","group_no","name","position","duty","account","idcard","phone","cellphone","grade","memo"];

/**
 * 获取组织架构
 */
export let getUserList = function(callback){
    console.log("www: ");
    console.log("www: 获取组织架构");
    let data = {
        user: username,
        form: tbl_group_worker,
        // action: "get",
        action: "leftJoin",
        fields: {
            worker: tbl_group_worker_fileds,
            company: ["name as companyname"],
        },        
        join: [{
            worker: "group_no",
            company: "objectid"
        }],
        condition: {worker:[{
            field: "group_no",
            symbol: "=",
            value: groupid
        }]},
        order: "worker.objectid desc"
    };
    httpServer.request('mform', data, res => {
        console.log(res.data);
        let result = {
            list: [],
            code: res.data.code
        };
        if(1 === res.data.code){
            result.list = res.data.datalist.worker;
            return typeof callback == 'function' && callback(result)
        } 
            return typeof callback == 'function' && callback(result)
    })
}
export let getUserList2 = function(callback){
    console.log("www: 获取组织架构");
    let data = {
        user: username,
        batchFun: "jsonBatch",
        source: [{
            name: "company",
            form: "company",
            action: "get",
            fields: ["name"],
            condition: [{
                field: "group_no",
                symbol: "=",
                value: groupid
            }],
            page: null
        }, {
            name: tbl_group_worker,
            form: tbl_group_worker,
            action: "get",
            fields: tbl_group_worker_fileds,
            condition: [{
                "field": "group_no",
                "symbol": "=",
                "value": groupid
            }],
            page: null
        }],
        batchList: [{
            name: "loginlog",
            form: "login_logs",
            action: "get",
            fields: ["username", "loginat"],
            condition: [{
                field: "username",
               symbol: "=",
                value: "@worker.account"
            }],
            order: "loginat desc",
            page: {
                pageSize: 1,
                pageIndex: 0
            }
        }]
    };
    httpServer.request('sbatch', data, res => {
        let result = {
            list: [],
            code: res.data.code
        };
        // 对返回值进行整理
        let list = res.data.datalist
        if(null != list){
            // 遍历返回的list
            for(let item of list){
                let user = {
                    id: '',
                    companyname: '',
                    account: '',
                    cellphone: '',
                    idcard: '',
                    loginat: '',
                    position: '',
                    duty: '',
                }
                // 判断返回的company是否存在
                if(0 < item.datalist.company.length){
                    user.companyname = item.datalist.company[0].name;
                }
                // 判断返回的worker是否存在
                if(0 < item.datalist.worker.length){
                    user.id = item.datalist.worker[0].id;
                    user.account = item.datalist.worker[0].account;
                    user.cellphone = item.datalist.worker[0].cellphone;
                    user.idcard = item.datalist.worker[0].idcard;
                    user.position = item.datalist.worker[0].position;
                    user.duty = item.datalist.worker[0].duty;
                }
                // 判断返回的loginlog是否存在
                if(0 < item.datalist.loginlog.length){
                    user.loginat = item.datalist.loginlog[0].loginat;
                }
                result.list.push(user);
            }            
        }
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }        
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * user = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addUser = function(user, callback){
    console.log("AddUser: " + user);
    console.log(user);
    let data = {
        user: username,
        form: tbl_group_worker,
        action: "add",
        fields: [{
            group: user.group,
            name: user.name,
            position: user.position,
            duty: user.duty,
            phone: user.phone,
            account: user.phone,
            cellphone: user.cellphone,
            idcard: user.idcard,
            group_no: groupid
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
export let addUser2 = function(user, callback){
    console.log("AddUser2: " + user);
    console.log(user);
    let data = {
        user: username,
        batchFun: "jsonTrans",
        source: null,
        batchList:[{
            name: tbl_group_worker,
            form: tbl_group_worker,
            action:"add",
            fields: {
                group: user.group,
                name: user.name,
                position: user.position,
                duty: user.duty,
                phone: user.phone,
                account: user.phone,
                cellphone: user.cellphone,
                idcard: user.idcard,
                group_no: groupid,
                type: "企业",
            },
            condition: null
        },{   
            name:"user",
            form:"user",
            action:"add",
            fields: {
                username: user.phone,
                nickname: "Yy_" + user.phone,
                password: md5Util.hexMD5(user.idcard.substring(user.idcard.length-6,user.idcard.length)),
            },
            condition: null
        }],
        
    };
    httpServer.request('sbatch', data, res => {
        console.log(res.data);
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(res.data)
        }
        return typeof callback == 'function' && callback(res.data)
    })
}

/**
 * user = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let getUserById = function(id, callback){
    console.log("www: getUserById" + id);
    let data = {
        user: username,
        form: tbl_group_worker,
        action: "get",
        fields: tbl_group_worker_fileds,
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
            user: null
        };
        if(1 === res.data.code && null != res.data.datalist.worker){
            result.user = res.data.datalist.worker[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * user = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateUserById = function(user, callback){
    console.log("UpdateUserById: " + user);
    console.log(user);
    let data = {
        user: username,
        form: tbl_group_worker,
        action: "updateList",
        fields: {
            // group: user.group,
            name: user.name,
            position: user.position,
            duty: user.duty,
            // account: user.account,
            phone: user.phone,
            cellphone: user.cellphone,
            idcard: user.idcard,
            // memo: user.memo
        },
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
 * formid = 1,2,3 
 * 删除组织成员
 */
export let deleteUserByFormids = function(ids, callback){
    console.log("www:删除组织成员 " + ids);
    let data = {
        user: username,
        form: tbl_group_worker,
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
 * formid = 1,2,3 
 * 组织架构图
 */
export let getUserGroupImg = function(callback){
    console.log("www:组织架构图 ");
    let data = {
        user: username,
        form: 'file_forms',
        action: "get",
        fields: null,
        condition: [{
            field: "projectid",
            value: groupid,
            symbol: "="
        },{
            field: "formname",
            value: 'worker_group',
            symbol: "="
        },{
            field: "belongidlist",
            value: '100',
            symbol: "="
        }],
        order: "objectid desc"
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            file: ''
        };
        let files = res.data.datalist.file_forms;
        if(1 === res.data.code && null != files){
            result.file = files[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * 检查用户名否存在
 */
export let checkPhone = function (phone, callback){
    console.log("www: " + phone);
    let data = {
        user: username,
        form: 'user',
        action: "get",
        fields: ["username"],
        condition: [{
            field: "username",            
            symbol: "=",
            value: phone,
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

/**
 * 检查用户名否存在
 */
export let checkIdCard = function (idcard, callback){
    console.log("www: " + idcard);
    let data = {
        user: username,
        form: tbl_group_worker,
        action: "get",
        fields: ["idcard"],
        condition: [{
            field: "idcard",            
            symbol: "=",
            value: idcard,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "此号码可用"
        }
        if(1 === res.data.code && null != res.data.datalist.worker){
            result.code = 2;
            result.message = "此号码已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}