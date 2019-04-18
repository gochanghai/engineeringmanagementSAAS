/**
 * 区域信息业务逻辑接口
 */
const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const areaid = localStorage.getItem("areaid");
/**
 * 获取省份信息
 */
var table = 't_md_areas';
var table_fileds = ["ID as id","AREANAME as region_name","PARENTID as fid"]
export let getProvinceList = function(callback){
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [{
            field: "PARENTID",            
            symbol: "=",
            value: 0,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: res.data.datalist.t_md_areas,
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取市区数据
 */
export let getCityList = function(fid, callback) {
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [{
            field: "PARENTID",            
            symbol: "=",
            value: fid,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: res.data.datalist.t_md_areas,
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取县区数据
 */
export let getPrefectureList = function(fid, callback) {
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [{
            field: "PARENTID",            
            symbol: "=",
            value: fid,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: res.data.datalist.t_md_areas,
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 获取子区域
 */
export let getChildAreasList = function(fid, callback) {
    let data = {
        user: username,
        form: table,
        action: "get",
        fields: table_fileds,
        condition: [{
            field: "PARENTID",            
            symbol: "=",
            value: fid,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: res.data.datalist.t_md_areas,
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * 获取子区域
 */
export let getAreasList = function(callback) {
    let data = {
        user: username,
        id: areaid,
    };
    console.log(data);
    httpServer.request('dservice/admin_division', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: res.data.datalist.list,
        };
        if(1 === res.data.code){
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}