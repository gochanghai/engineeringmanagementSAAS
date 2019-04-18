const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
/**
 * 器材设备业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */

// 数据库表
const tbl_equipment = "equipment";
// 表字段
const tbl_equipment_fields = ["objectid as id","status","name","number","model","location","risks","phone","person"];

/**
 * 获取器材设备列表数据
 */
export let list = function (callback){
    console.log("www: 获取器材设备列表数据");
    let data = {
        user: username,
        form: tbl_equipment,
        action: "get",
        fields: tbl_equipment_fields,
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
            result.list = res.data.datalist.equipment;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个器材设备的信息
 */
export let getById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_equipment,
        action: "get",
        fields: tbl_equipment_fields,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id            
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            equipment: null,
            code: res.data.code
        };
        if(1 === res.data.code && null != res.data.datalist.equipment){
            result.equipment = res.data.datalist.equipment[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * equipment = { .... }
 * 添加一个器材设备的信息
 */
export let add = function (equipment, callback){
    console.log("www: " + equipment);
    let data = {
        user: username,
        form: tbl_equipment,
        action: "add",
        fields: [{
            groupid: groupid,
            model: equipment.model,
            name: equipment.name,
            location: equipment.location,
            // remarks: equipment.remarks,
            status: equipment.status,
            person: equipment.person,
            // risks: equipment.risks,
            phone: equipment.phone,
            number: equipment.number
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
 * equipment = { .... }
 * 更新一个器材设备的信息
 */
export let updateById = function (equipment, callback){
    console.log("www: " + equipment);
    let data = {
        user: username,
        form: tbl_equipment,
        action: "updateList",
        fields: {
            model: equipment.model,
            name: equipment.name,
            location: equipment.location,
            // remarks: equipment.remarks,
            status: equipment.status,
            person: equipment.person,
            // risks: equipment.risks,
            phone: equipment.phone
        },
        condition: [{
            field: "objectid",            
            symbol: "=",
            value: equipment.id,
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
 * 删除一个器材设备的信息
 */
export let deleteById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_equipment,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",            
            symbol: "=",
            value: id,
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
 * 批量删除器材设备信息
 * formids = 1,2,3
 */
export let batchDeleteByIds = function(ids, callback){
    console.log(ids);
    let data = {
        user: username,
        form: tbl_equipment,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: ids
        }]
    };
    httpServer.request('/form', data, res => {
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
