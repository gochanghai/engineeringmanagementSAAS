const httpServer = require('./server/http.js');
const md5Util = require('./server/md5.js');
const username = localStorage.getItem("username");


/**
 * 企业注册前调用
 * 
 */
export let registBerfor = function (callback){
    let  data = {
        user: "register",
        action: "begin"
    }
    httpServer.request('yysecurity/company_register', data, res =>{
        console.log(res);
        // localStorage.setItem("userID", res.data.userID);
        localStorage.setItem("username", res.data.userID);
        return typeof callback == 'function' && callback(res.code)
    });
}


/**
 * 检查企业名称是否存在
 */
export let checkCompanyName = function (companyName, callback){
    console.log("www: " + companyName);
    let data = {
        user: username,
        form: "company",
        action: "get",
        fields: ["name"],
        condition: [{
            field: "name",            
            symbol: "=",
            value: companyName,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "企业名称可用"
        }
        if(1 === res.data.code && null != res.data.datalist.company){
            result.code = 2;
            result.message = "企业名称已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * 检查企业证件号码是否存在
 */
export let checkCreditCode = function (creditCode, callback){
    console.log("www: " + creditCode);
    let data = {
        user: username,
        form: "company",
        action: "get",
        fields: ["credit_code"],
        condition: [{
            field: "credit_code",            
            symbol: "=",
            value: creditCode,
        }]
    };
    httpServer.request('form', data, res => {
        console.log(res.data);
        let result = {
            code: res.data.code,
            message: "证件号码可用"
        }
        if(1 === res.data.code && null != res.data.datalist.company){
            result.code = 2;
            result.message = "证件号码已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/**
 * 检查手机号码否存在
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
            message: "此号码可用"
        }
        if(1 === res.data.code && null != res.data.datalist.user){
            result.code = 2;
            result.message = "此号码已经存在"
            return typeof callback == 'function' && callback(result)
        }
        return typeof callback == 'function' && callback(result)
    })
}


/** 
 * 企业注册注册业务逻辑接口
 */
export let registration = function (company, callback){
    let data =  {
        user: "register",
        action: "register",
        company: {
            name: company.name,
            credit_code: company.code,
            code_type: company.code_type,
            address: company.region_address,
            idcard_type: company.idcard_type,
            id_card: company.id_card,
            representative: company.representative,
            phone: company.phone,
            agent_name: company.agent_name,
            agent_idcard: company.agent_idcard,
            agent_idcard_type: company.agent_idcard_type,
            agent_phone: company.agent_phone,
            type: '企业',
            area_id:  company.area_id,
            tel_phone: company.phone,
        },
        userList: [{
            name: company.representative,
            position: '企业法定代表人',
            duty: 'CEO',
            idcard: company.id_card,
            phone: company.phone,
            cellphone: company.phone,
            account: company.phone,
            nickname: "Yy_" + company.phone,
            password: md5Util.hexMD5(company.password),
        }]
    }

    console.log(data);
    httpServer.request('yysecurity/company_register', data, res =>{
        console.log(res);
        return typeof callback == 'function' && callback(res.data)
    });
}