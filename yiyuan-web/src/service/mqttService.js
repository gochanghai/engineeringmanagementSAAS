// 业务对象：消息表
const username = localStorage.getItem("username");
const group_no = localStorage.getItem("groupid");
const httpJS = require('./server/http.js');

/**
 * 业务模块：统计登录用户的未读消息总数，
 * _post 执行业务,执行参数数据在function参数内；
 * _postResData 执行业务后返回的数据格式定义和数据装载；
 */
export let doMQTTLogin = {
    _postResData: {
        data: {
            brokerUrl: 'mqtt://192.168.10.144:9080',
            clientId: '',
            equipmentConect: [],
        },
        code: '',
        reason: '',
    },
    _post: async () => {
        let datalist = {
            user: username,
            groupno: group_no,
        };
        let res = await httpJS.asyncRequest("/mqtt/login", datalist);
        doMQTTLogin._postResData.code = res.data.code;
        doMQTTLogin._postResData.reason = res.data.reason;
        if(res.data.code > 0 ){
            doMQTTLogin._postResData.data.equipmentConect = res.data.datalist;
            doMQTTLogin._postResData.data.clientId = res.data.clientId;
        }
        return doMQTTLogin._postResData;
    }
}