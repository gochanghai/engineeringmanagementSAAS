const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const groupid = localStorage.getItem("groupid");
/**
 * 作业业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */
// 数据库表
const tbl_work = "work";
// 表字段
const tbl_work_fields = ["objectid as workid","formid","status","type","name","work_datetime","work_area","work_place_text",
    "representative","safty_manager","operator_names","operator_no","supervisor","onsite_start_datetime", "onsite_over_datetime"];
// 作业审核
const tbl_work_check = "work_check";
const tbl_work_check_fields = ["formid","reviewer","reviewer_name_history as name","check_time","check_opinion","check_status","memo"];
// 作业申请
const tbl_work_apply = "work_apply";
const tbl_work_apply_fields = ["representative_name_history as repname","safty_manager_name_history as smname"];
// 作业现场
const tbl_work_onsite = "work_onsite";
const tbl_work_onsite_fields = ["site_photo","material","equipment","ventilate_check","start_time","endsh_time"];
// 作业申请上传附件
const tbl_work_prepare = 'work_prepare_data';
const tbl_work_prepare_fields = ["preparer","prepare_time","material","equipment","supplies","training_file","training_attendance","training_photo"]

// 作业附件
const tbl_work_file = 'file_forms';
const tbl_work_file_fields = ["objectid as id", "projectid as workid", "filebelong", "fileid", "filename", "filetype", "filesize", "uploadat" ,"thumb"];

// 作业时间表
const tbl_work_date = 'work_onsite_stage';
const tbl_work_date_fields = ["objectid as id", "workid", "start_datetime", "over_datetime", "close_sign"];

/**
 * 获取历史作业数据
 */
export let list = function (callback){
    console.log("www: 获取历史作业数据");
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: groupid           
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            list: [],
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            let list = res.data.datalist.work
            for(let i=0 ; i<list.length; i++){
                list[i].work_datetime = dateFormat(list[i].work_datetime);
                list[i].work_date = dateFormat2(list[i].work_datetime);
            }
            result.list = list;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listByCompanyId = function (id, callback){
    console.log("www: 获取历史作业数据");
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: id           
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            list: [],
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            let list = res.data.datalist.work
            for(let i=0 ; i<list.length; i++){
                list[i].work_datetime = dateFormat(list[i].work_datetime);
                list[i].work_date = dateFormat2(list[i].work_datetime);
            }
            result.list = list;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}


/**
 * 根据状态获取历史作业数据
 */
export let listByStatus = function (status,callback){
    console.log("www: 根据状态获取历史作业数据");
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: groupid           
        },{
            field: "status",
            symbol: "=",
            value: status           
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            list: [],
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            let list = res.data.datalist.work
            for(let i=0 ; i<list.length; i++){
                list[i].work_datetime = dateFormat(list[i].work_datetime);
                list[i].work_date = dateFormat2(list[i].work_datetime);
            }
            result.list = list;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}
export let listByCompanyIdAndStatus = function (id,status,callback){
    console.log("www: 根据状态获取历史作业数据");
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: id           
        },{
            field: "status",
            symbol: "=",
            value: status           
        }],
        order: "objectid desc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            list: [],
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            let list = res.data.datalist.work
            for(let i=0 ; i<list.length; i++){
                list[i].work_datetime = dateFormat(list[i].work_datetime);
                list[i].work_date = dateFormat2(list[i].work_datetime);
            }
            result.list = list;
            return typeof callback == 'function' && callback(result);
        }
        return typeof callback == 'function' && callback(result);
    })
}

/**
 * 获取一个历史作业数据
 */
export let getById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "objectid",
            symbol: "=",
            value: id            
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            work: null,
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            let work = res.data.datalist.work[0];
            work.work_datetime = dateFormat(work.work_datetime);
            work.work_date = dateFormat2(work.work_datetime);
            work.onsite_start_datetime = dateFormat(work.onsite_start_datetime);
            work.onsite_over_datetime = dateFormat(work.onsite_over_datetime);
            result.work = work;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * worker = { .... }
 * 添加作业数据
 */
export let add = function (worker, callback){
    console.log("www: " + worker);
    let data = {
        user: username,
        form: tbl_work,
        action: "add",
        fields: [{
            type: worker.group,
            name: worker.name,
            address: worker.address,
            work_person: worker.work_person,
            remarks: worker.remarks,
            status: worker.status,
            work_time: worker.work_time,
            work_manager: worker.work_manager
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
 * worker = { .... }
 * 更新一个作业数据
 */
export let updateById = function (worker, callback){
    console.log("www: " + worker);
    let data = {
        user: username,
        form: tbl_work,
        action: "updateList",
        fields: {
            type: worker.group,
            name: worker.name,
            address: worker.address,
            work_person: worker.work_person,
            remarks: worker.remarks,
            status: worker.status,
            work_time: worker.work_time,
            work_manager: worker.work_manager
        },
        condition: [{
            field: "formid",            
            symbol: "=",
            value: worker.id,
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
 * 删除一个作业数据
 */
export let deleteById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_work,
        action: "deleteList",
        fields: null,
        condition: [{
            field: "workid",            
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
 * id 申请id
 * 获取一个作业申请信息
 */
export let getWorkApplyById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_work_apply,
        action: "get",
        fields: tbl_work_apply_fields,
        condition: [{
            field: "workid",            
            symbol: "=",
            value: id,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            data: null,
        };
        if(1 === res.data.code && null != res.data.datalist.work_apply){
            result.data = res.data.datalist.work_apply[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * id 申请作业id
 * 获取一个作业的审批信息
 */
export let  examineApproveByapplyId = function (workid, callback){
    console.log("www: " + workid);
    let data = {
        user: username,
        form: tbl_work_check,
        action: "get",
        fields: tbl_work_check_fields,
        condition: [{
            field: "workid",            
            symbol: "=",
            value: workid,
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        let result = {
            code: res.data.code,
            work_check: null,
        };
        console.log(res.data);
        if(1 === res.data.code && null != res.data.datalist.work_check ){
            let work_check = res.data.datalist.work_check[0];
            work_check.check_time = dateFormat(work_check.check_time)
            result.work_check = work_check;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}



/**
 * id 作业id
 * 获取一个作业现场的环境信息
 */
export let siteEnvironmentById = function (id, callback){
    console.log("www: " + id);
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: null,
        condition: [{
            field: "formid",            
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
 * groupId
 * 获取作业列表数据
 */
export let listWorking = function (callback){
    console.log("www: ");
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [
        {
            field: "group_no",            
            symbol: "=",
            value: groupid,
        },
        {
            field: "status",            
            symbol: "=",
            value: '作业中,已完成',
        }],
        order: "status asc"
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            list: [],
        };
        if(1 === res.data.code){
            result.list = res.data.datalist.work
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * workingId 作业Id
 * 获取一个作业的详情信息
 */
export let getWorkingDetailsById = function (workId, callback){
    console.log("www: " + workId);
    let data = {
        user: username,
        form: tbl_work,
        action: "get",
        fields: tbl_work_fields,
        condition: [{
            field: "objectid",            
            symbol: "=",
            value: workId,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            work: null,
        };
        if(1 === res.data.code && null != res.data.datalist.work){
            result.work = res.data.datalist.work[0];
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}



/**
 * workingId 作业Id
 * 获取一个作业申请附件
 */
export let getWorkingApplyFileByWorkId = function (workId, callback){
    console.log("www: " + workId);
    let data = {
        user: username,
        form: tbl_work_file,
        action: "get",
        fields: tbl_work_file_fields,
        condition: [{
            field: "projectid",
            value: workId,
            symbol: "="
        },{
            field: "formname",
            value: 'work_apply_data',
            symbol: "="
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            file1: null,
            file2: null,
        };
        let list = res.data.datalist.file_forms
        if(1 === res.data.code && null != list){
            for(let item of list){
                if(item.filebelong === '作业方案'){
                    result.file1 = item;
                }
                if(item.filebelong === '应急方案'){
                    result.file2 = item;
                }
            }
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * workingId 作业Id
 * 获取一个作业上传准备材料附件
 */
export let getWorkingPrepareFileByWorkId = function (workId, callback){
    console.log("www: " + workId);
    let data = {
        user: username,
        form: tbl_work_file,
        action: "get",
        fields: tbl_work_file_fields,
        condition: [{
            field: "projectid",
            value: workId,
            symbol: "="
        },{
            field: "formname",
            value: 'work_prepare_data',
            symbol: "="
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: [],
        };
        if(1 === res.data.code && null != res.data.datalist.file_forms){
            result.list = res.data.datalist.file_forms
        }
        
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * workingId 作业Id
 * 获取一个作业的现场落实信息
 */
export let getWorkingOnsiteFileByWorkId = function (workId, callback){
    console.log("www: " + workId);
    let data = {
        user: username,
        form: tbl_work_file,
        action: "get",
        fields: tbl_work_file_fields,
        condition: [{
            field: "projectid",
            value: workId,
            symbol: "="
        },{
            field: "formname",
            value: 'work_onsite_data',
            symbol: "="
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: [],
        };
        let list = res.data.datalist.file_forms
        if(1 === res.data.code && null != list){
            result.list = list;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * workingId 作业Id
 * 获取一个作业的现场落实信息
 */
export let getWorkingDateListByWorkId = function (workId, callback){
    console.log("www: " + workId);
    let data = {
        user: username,
        form: tbl_work_date,
        action: "get",
        fields: tbl_work_date_fields,
        condition: [{
            field: "workid",
            value: workId,
            symbol: "="
        }],
        order: "objectid desc",
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            list: [],
        };
        let list = res.data.datalist.work_onsite_stage
        if(1 === res.data.code && null != list){
            for(let i = 0; i< list.length; i++){
                list[i].date = dateFormat2(list[i].start_datetime)
                if(list[i].close_sign === 1){
                  list[i].time_long = dateSub(list[i].start_datetime, list[i].over_datetime);
                }                
            }
            result.list = list;
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}




/** 
 * 时间格式化
 * 如：2019-03-27 17:08
 */
let dateFormat = function (value){
    
    if(null != value){
        var d = new Date(value);
        var times = d.getFullYear() + '-' 
            + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' 
            + (d.getDate() + 1 < 10 ? "0" + (d.getDate() + 1) : d.getDate() + 1)+ ' ' 
            + (d.getHours() + 1 < 10 ? "0" + (d.getHours() + 1) : d.getHours() + 1) + ':' 
            + (d.getMinutes() + 1 < 10 ? "0" + (d.getMinutes() + 1) : d.getMinutes() + 1) + ':' 
            + (d.getSeconds() + 1 < 10 ? "0" + (d.getSeconds() + 1) : d.getSeconds() + 1);
        return times;
    }
    return "暂无";
}

/**
 * 时间格式化
 * 如：2019-03-27 
 */
let dateFormat2 = function (value){
    
    if(10 < value.length){
       
        return value.substring(0, 10);
    }
    return value;
}

/**
 * 时间减法
 * 如：2019-03-27 18:08 - 2019-03-27 17:08  = 01:00 分钟
 */
let dateSub = function (start_time, over_time){    
    start_time = start_time.replace(new RegExp("-","gm"),"/");
    over_time = over_time.replace(new RegExp("-","gm"),"/");
    var startM = (new Date(start_time)).getTime(); //得到毫秒数
    var overM = (new Date(over_time)).getTime(); //得到毫秒数
    var dValue = overM - startM;
    var dTime = dateFormat(dValue);    
    return dTime.substring(dTime.length-5, dTime.length);
}


