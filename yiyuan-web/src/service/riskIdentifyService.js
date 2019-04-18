const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
/**
 * 风险识别业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.1.0
 */
// 数据库表
const table = "risk_identify";
// 表字段
const tableFileds = ["objectid as id","level","source","risk","plan","damage","l","e","d","c","color","remarks"]
/**
 * 获取风险识别列表数据
 */
export let list = function (type,callback){
    console.log("www: ");
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: tableFileds,
        condition: [{
            field: "groupid",
            symbol: "=",
            value: groupid
        },{
            field: "type",
            symbol: "=",
            value: type
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
        if(1 === res.data.code && null != res.data.datalist.risk_identify){
            result.list = res.data.datalist.risk_identify;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}
export let listByCompanyIdAndType = function (id,type,callback){
    console.log("www: ");
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: tableFileds,
        condition: [{
            field: "groupid",
            symbol: "=",
            value: id
        },{
            field: "type",
            symbol: "=",
            value: type
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
        if(1 === res.data.code && null != res.data.datalist.risk_identify){
            result.list = res.data.datalist.risk_identify;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取一个风险的信息
 */
export let getById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: tableFileds,
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
            risk: null
        }
        if(1 === res.data.code && null != res.data.datalist.risk_identify){
            result.risk = res.data.datalist.risk_identify[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 添加一个风险的信息
 */
export let add = function (riskIdentify, callback){
    console.log("AddRiskIdentify: " + riskIdentify);
    console.log( riskIdentify);
    let data = {
        user: username,
        form: table,
        action: "add",
        fields: [{
            groupid: groupid,
            level: riskIdentify.level,
            source: riskIdentify.source,
            risk: riskIdentify.risk,
            plan: riskIdentify.plan,
            damage: riskIdentify.damage,
            l: riskIdentify.l,
            e: riskIdentify.e,
            c: riskIdentify.c,
            d: riskIdentify.d,
            color: riskIdentify.color,
            remarks: riskIdentify.remarks,
            type: riskIdentify.type,
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
 * 更新一个风险的信息
 */
export let updateById = function (riskIdentify, callback){
    console.log("UpdateById: " + riskIdentify);
    console.log( riskIdentify);
    let data = {
        user: username,
        form: table,
        action: "updateList",
        fields: {
            level: riskIdentify.level,
            source: riskIdentify.source,
            risk: riskIdentify.risk,
            plan: riskIdentify.plan,
            damage: riskIdentify.damage,
            l: riskIdentify.l,
            e: riskIdentify.e,
            c: riskIdentify.c,
            d: riskIdentify.d,
            color: riskIdentify.color,
            remarks: riskIdentify.remarks
        },
        condition: [{
            field: "objectid",
            symbol: "=",
            value: riskIdentify.id
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
 * 删除一个风险的信息
 */
export let deleteById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: table,
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
 * 批量删除风险的信息
 * formids = 1,2,3
 */
export let batchDeleteByIds = function(ids, callback){
    console.log(ids);
    let data = {
        user: username,
        form: table,
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

/**
 * 检查风险识别危险源是否存在
 */
export let checkSourceBySource = function (source, callback){
    console.log("www: " + source);
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: null,
        condition: [{
            field: "source",            
            symbol: "=",
            value: source,
        },{
            field: "groupid",            
            symbol: "=",
            value: groupid,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "危险源可用"
        }
        if(1 === res.data.code && null != res.data.datalist.risk_identify){
            result.code = 2;
            result.message = "危险源已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}