//请求域名
// const host = 'https://mysaas.gdsh119.com';
import Vue from 'vue';
export const serverAddress = 'http://192.168.1.43:3333';
export const clientPlatform = 'PCW';
const username = sessionStorage.getItem("username");


//使用form-data的方式发送request请求
let formRequest = function (api, jsondata, callback) {
  console.log(jsondata);
  wx.request({
    url: host + api,
    data: jsondata,
    header: {
      "Content-Type": "multipart/form-data"
    },
    method: "POST",
    success: function (res) {
      return typeof callback == "function" && callback(res)
    },
    fail: function (res) {
      return typeof callback == "function" && callback(res)
    }
  });
}

//vue发送request请求
export let request = function (api, jsondata, callback) {
  let unchainapi = ['/mysaas/login', '/user/plist', '/user', '/openid', '/openid/get']; // 放行的api
  if (unchainapi.indexOf(api) != -1 || username != "") { // 放行的条件
    let datalist = {
      data: jsondata,
    }
    Vue.prototype.$post("/api/" + api, datalist).then(res => {
      return typeof callback == "function" && callback(res)
    })
  } else {
    console.log("request chain and return false!");
    return false;
  }
}



//vue发送request请求
export let request2 = function (api, jsondata) {
  let datalist = {
    data: jsondata,
  }
  return Vue.prototype.$post("/api/" + api, datalist).then(res => {
    // console.log(res);
    return res.data
  })
}

/**
 * jsonPost 封装成json数据格式发起请求
 */
export let asyncRequest = async (api = "", jsondata = {}) => {
  let promise = new Promise((resolve, reject) => {
    //做一些异步操作
    setTimeout(() => {
      let datalist = {
        data: jsondata,
      }
      console.log(datalist);
      Vue.prototype.$post("/api" + api, datalist).then(res => {
        console.log(res)
        resolve(res);
      })
    }, 500);
  })
  let result = await promise // 直到promise返回一个resolve值（*）
  return result; // 'done!' 
}