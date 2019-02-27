//请求域名
// const serverAddress = 'https://mysaas.gdsh119.com';
export const serverAddress = 'http://192.168.1.43:3330';

//POST 请求
export let request = function (api, jsondata, callback) {
  wx.request({
    url: serverAddress + api,
    data: {
      data: JSON.stringify(jsondata)
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    method: "POST",
    success: function (res) {
      console.log("=================================request:" + serverAddress + api);
      console.log("---------------------------------response:");
      console.log(res);
      console.log("=======================================================================");
      return typeof callback == "function" && callback(res);
    },
    fail: function (res) {
      return typeof callback == "function" && callback(res);
    }
  });
}

//使用form-data的方式发送request请求
export let formRequest = function (api, jsondata, callback) {
  console.log(jsondata);
  wx.request({
    url: serverAddress + api,
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
