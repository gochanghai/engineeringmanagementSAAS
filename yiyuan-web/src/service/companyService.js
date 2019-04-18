const httpServer = require('./server/http.js');
const username = localStorage.getItem("username");
const group_no = localStorage.getItem("groupid");
/**
 * 企业信息及组织架构业务逻辑接口
 * date: 2019-3-18 pm
 * auther: liuchanghai
 * verion: 0.10
 */

//  企业信息表
const tbl_group = "company"
//  企业信息表字段
const tbl_group_fileds = ["group_no","type","name","credit_code","address","phone","representative","worker_num","fax",
"manage_num","safety_manager","covered_area","established_time","principal","registered_capital","fixed_assets","last_year_turnover","main_products","business_type","tel_phone"];
/**
 * 获取企业信息
 */
export let getCompanyInfo = function (callback){
    console.log("www: " );
    let data = {
        user: username,
        form: tbl_group,
        action: "get",
        fields: tbl_group_fileds,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: group_no
        }]
    };
    console.log(data);
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code : res.data.code,
            company: null
        };
        if(1 === res.data.code && null != res.data.datalist.company){
            result.company = res.data.datalist.company[0];
            result.company.established_time = dateFormat2(result.company.established_time);
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}

/**
 * 
 * 更新企业信息
 */
export let updateCompanyInfoById = function (company, callback){
    console.log(company);
    let data = {
        user: username,
        form: tbl_group,
        action: "updateList",
        fields: company,
        condition: [{
            field: "group_no",
            symbol: "=",
            value: company.group_no            
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
 * 2019-03-27 
 */
let dateFormat2 = function (value){    
    if( null != value && value.length >= 10 ){       
        return value.substring(0, 10);
    }
    return value;
}

