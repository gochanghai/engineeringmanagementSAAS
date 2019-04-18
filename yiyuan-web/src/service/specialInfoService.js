/**
 * 专项信息业务逻辑接口
 * date: 2019-4-11 AM
 * auther: liuchanghai
 * verion: 0.10
 */

const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");

// 涉氢数据表
var tbl_special_h = "special_h";
var tbl_special_h_fileds = ["objectid as id","place","type","worker_num"];

// 有限空间数据表
var tbl_special_ltd_space = "special_ltd_space";
var tbl_special_ltd_space_fileds = ["objectid as id","type","number","location","harmful","worker_num"];

// 粉尘爆炸数据表
var tbl_special_dust = "special_dust";
var tbl_special_dust_fileds = ["objectid as id","name","type","worker_num","area"];

// 危险化学品数据表
var tbl_special_chemical = "special_chemical";
var tbl_special_chemical_fileds = ["objectid as id","name","type","classify","number","location"];

// 锂电池数据表
var tbl_special_battery = "special_battery";
var tbl_special_battery_fileds = ["objectid as id","place","danger","product_reason","property","history_record"];

// 特种设备数据表
var tbl_special_equipment = "special_equipment";
var tbl_special_equipment_fileds = ["objectid as id","type","name","code","number","worker_num","place"];

// 其它数据表
var tbl_special_other = "special_other";
var tbl_special_other_fileds = ["objectid as id","place","danger","property","number","worker_num","product_reason"];

// **************************  其它数据操作Service  *****************************************

/**
 * 获取其它数据列表数据
 */
export let listOther = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_other,
        action: "get",
        fields: tbl_special_other_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_other){
            result.list = res.data.datalist.special_other;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listOtherByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_other,
        action: "get",
        fields: tbl_special_other_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_other){
            result.list = res.data.datalist.special_other;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个其它信息
 */
export let getOtherById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_other,
        action: "get",
        fields: tbl_special_other_fileds,
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
 * 添加组织成员
 */
export let addOther = function(other, callback){
    console.log("AddUser: " + other);
    console.log(other);
    other.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_other,
        action: "add",
        fields: [other],
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
 * other = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateOtherById = function(other, callback){
    console.log("UpdateUserById: " + other);
    console.log(other);
    let data = {
        user: username,
        form: tbl_special_other,
        action: "updateList",
        fields: {
          place: other.place,
          danger: other.danger,
          property: other.property,
          product_reason: other.product_reason,
          number: other.number,
          worker_num: other.worker_num,
        },
        condition: [{
            field: "objectid",
            value: other.id,
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
 * 删除一个其它信息
 */
export let deleteOtherById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_other,
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
 * 批量删除其它信息
 * id_list = [1,2,3]
 */
export let batchDeleteOtherById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_other,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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

// **************************  设备数据操作Service  *****************************************

/**
 * 获取设备数据列表数据
 */
export let listEquipment = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "get",
        fields: tbl_special_equipment_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_equipment){
            result.list = res.data.datalist.special_equipment;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listEquipmentByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "get",
        fields: tbl_special_equipment_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_equipment){
            result.list = res.data.datalist.special_equipment;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个设备信息
 */
export let getEquipmentById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "get",
        fields: tbl_special_equipment_fileds,
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
            data: null
        };
        if(1 === res.data.code && null != res.data.datalist.special_equipment){
            result.data = res.data.datalist.special_equipment[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * equipment = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addEquipment = function(equipment, callback){
    console.log("AddUser: " + equipment);
    console.log(equipment);
    equipment.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "add",
        fields: [equipment],
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
 * equipment = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateEquipmentById = function(equipment, callback){
    console.log("UpdateUserById: " + equipment);
    console.log(equipment);
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "updateList",
        fields: {
          type: equipment.type,
          number: equipment.number,
          name: equipment.name,
          worker_num: equipment.worker_num,
          code: equipment.code,
          place: equipment.place,
        },
        condition: [{
            field: "objectid",
            value: equipment.id,
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
 * 删除一个设备信息
 */
export let deleteEquipmentById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_equipment,
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
 * 批量删除设备信息
 * id_list = [1,2,3]
 */
export let batchDeleteEquipmentById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_equipment,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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

// **************************  锂电池数据操作Service  *****************************************

/**
 * 获取锂电池数据列表数据
 */
export let listBattery = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "get",
        fields: tbl_special_battery_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_battery){
            result.list = res.data.datalist.special_battery;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listBatteryByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "get",
        fields: tbl_special_battery_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_battery){
            result.list = res.data.datalist.special_battery;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个锂电池信息
 */
export let getBatteryById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "get",
        fields: tbl_special_battery_fileds,
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
            data: null,
        };
        if(1 === res.data.code && null != res.data.datalist.special_battery){
            result.data = res.data.datalist.special_battery[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * battery = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addBattery = function(battery, callback){
    console.log("AddUser: " + battery);
    console.log(battery);
    battery.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "add",
        fields: [battery],
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
 * battery = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateBatteryById = function(battery, callback){
    console.log("UpdateUserById: " + battery);
    console.log(battery);
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "updateList",
        fields: {
          place: battery.place,
          property: battery.property,
          product_reason: battery.product_reason,
          danger: battery.danger,
          history_record: battery.history_record,
        },
        condition: [{
            field: "objectid",
            value: battery.id,
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
 * 删除一个锂电池信息
 */
export let deleteBatteryById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_battery,
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
 * 批量删除锂电池信息
 * id_list = [1,2,3]
 */
export let batchDeleteBatteryById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_battery,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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

// **************************  危险化学品数据操作Service  *****************************************

/**
 * 获取危险化学品数据列表数据
 */
export let listChemical = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "get",
        fields: tbl_special_chemical_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_chemical){
            result.list = res.data.datalist.special_chemical;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listChemicalByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "get",
        fields: tbl_special_chemical_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_chemical){
            result.list = res.data.datalist.special_chemical;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个危险化学品信息
 */
export let getChemicalById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "get",
        fields: tbl_special_chemical_fileds,
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
            data: null
        };
        if(1 === res.data.code && null != res.data.datalist.special_chemical){
            result.data = res.data.datalist.special_chemical[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * chemical = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addChemical = function(chemical, callback){
    console.log("AddUser: " + chemical);
    console.log(chemical);
    chemical.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "add",
        fields: [chemical],
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
 * chemical = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateChemicalById = function(chemical, callback){
    console.log("UpdateUserById: " + chemical);
    console.log(chemical);
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "updateList",
        fields: {
            type: chemical.type,
            number: chemical.number,
            name: chemical.name,
            location: chemical.location,
            classify: chemical.classify,
        },
        condition: [{
            field: "objectid",
            value: chemical.id,
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
 * 删除一个危险化学品信息
 */
export let deleteChemicalById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_chemical,
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
 * 批量删除危险化学品信息
 * id_list = [1,2,3]
 */
export let batchDeleteChemicalById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_chemical,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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


// **************************  粉尘爆炸数据操作Service  *****************************************

/**
 * 获取粉尘爆炸数据列表数据
 */
export let listDust = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "get",
        fields: tbl_special_dust_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_dust){
            result.list = res.data.datalist.special_dust;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listDustByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "get",
        fields: tbl_special_dust_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},         
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
        if(1 === res.data.code && null != res.data.datalist.special_dust){
            result.list = res.data.datalist.special_dust;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个粉尘爆炸信息
 */
export let getDustById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "get",
        fields: tbl_special_dust_fileds,
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
            data: null
        };
        if(1 === res.data.code && null != res.data.datalist.special_dust){
            result.data = res.data.datalist.special_dust[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * user = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addDust = function(dust, callback){
    console.log("AddUser: " + dust);
    console.log(dust);
    dust.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "add",
        fields: [dust],
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
 * user = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateDustById = function(dust, callback){
    console.log("UpdateUserById: " + dust);
    console.log(dust);
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "updateList",
        fields: {
          type: dust.type,
          area: dust.area,
          name: dust.name,
          worker_num: dust.worker_num,
        },
        condition: [{
            field: "objectid",
            value: dust.id,
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
 * 删除一个粉尘爆炸信息
 */
export let deleteDustById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_dust,
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
 * 批量删除粉尘爆炸信息
 * id_list = [1,2,3]
 */
export let batchDeleteDustById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_dust,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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



// **************************  涉氢数据操作Service  *****************************************

/**
 * 获取涉氢数据列表数据
 */
export let listH = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_h,
        action: "get",
        fields: tbl_special_h_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_h){
            result.list = res.data.datalist.special_h;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listHByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_h,
        action: "get",
        fields: tbl_special_h_fileds,
        condition: [
            {field: "groupid", symbol: "=", value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_h){
            result.list = res.data.datalist.special_h;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个涉氢信息
 */
export let getHById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_h,
        action: "get",
        fields: tbl_special_h_fileds,
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
            data: null
        };
        if(1 === res.data.code && null != res.data.datalist.special_h){
            result.data = res.data.datalist.special_h[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * h = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addH = function(h, callback){
    console.log("AddUser: " + h);
    console.log(h);
    h.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_h,
        action: "add",
        fields: [h],
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
 * h = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateHById = function(h, callback){
    console.log("UpdateUserById: " + h);
    console.log(h);
    let data = {
        user: username,
        form: tbl_special_h,
        action: "updateList",
        fields: {
          type: h.type,
          place: h.place,
          worker_num: h.worker_num,
        },
        condition: [{
            field: "objectid",
            value: h.id,
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
 * 删除一个涉氢信息
 */
export let deleteHById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_h,
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
 * 批量删除涉氢信息
 * id_list = [1,2,3]
 */
export let batchDeleteHById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_h,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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



// **********************   有限空间数据操作Service    ********************************

/**
 * 获取有限空间列表数据
 */
export let listLtdSpace = function (callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "get",
        fields: tbl_special_ltd_space_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: groupid},
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
        if(1 === res.data.code && null != res.data.datalist.special_ltd_space){
            result.list = res.data.datalist.special_ltd_space;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listLtdSpaceByCompanyId = function (id, callback){
    console.log("www: 获取实时警告信息列表数据");
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "get",
        fields: tbl_special_ltd_space_fileds,
        condition: [
            {field: "groupid", symbol: "=",value: id},
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
        if(1 === res.data.code && null != res.data.datalist.special_ltd_space){
            result.list = res.data.datalist.special_ltd_space;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个有限空间信息
 */
export let getLtdSpaceById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "get",
        fields: tbl_special_ltd_space_fileds,
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
            data: null
        };
        if(1 === res.data.code && null != res.data.datalist.special_ltd_space){
            result.data = res.data.datalist.special_ltd_space[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * ltdSpace = {username:'', phone: ', companyName:'' .... }
 * 添加组织成员
 */
export let addLtdSpace = function(ltdSpace, callback){
    console.log("AddUser: " + ltdSpace);
    console.log(ltdSpace);
    ltdSpace.groupid = groupid;
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "add",
        fields: [ltdSpace],
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
 * ltdSpace = { id:'', name: '', group: '' .... }
 * 更新组织成员
 */
export let updateLtdSpaceById = function(ltdSpace, callback){
    console.log("UpdateUserById: " + ltdSpace);
    console.log(ltdSpace);
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "updateList",
        fields: {
            type: ltdSpace.type,
            number: ltdSpace.number,
            location: ltdSpace.location,
            harmful: ltdSpace.harmful,
            worker_num: ltdSpace.worker_num,
        },
        condition: [{
            field: "objectid",
            value: ltdSpace.id,
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
 * 删除一个有限空间信息
 */
export let deleteLtdSpaceById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_special_ltd_space,
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
 * 批量删除有限空间信息
 * id_list = [1,2,3]
 */
export let batchDeleteLtdSpaceById_list = function(id_list, callback){
    console.log(id_list);
    let data = {
        user: username,
        form: tbl_special_ltd_space,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id_list
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