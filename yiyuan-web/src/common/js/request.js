import { get, post } from '@/common/js/http.js';

//发送请求
export let AxoisPost = function(url, datalist, pagepara) {
  post(url, datalist)
    .then(res => {
      console.log(pagepara.user + " " + pagepara.page + " " + pagepara.appcode + " para:" + pagepara.para + " message:");
      console.log(res.data.datalist);
      return res.data.datalist;
    })
    .catch((err) => {
      console.log(pagepara.user + " " + pagepara.page + " " + pagepara.appcode + " para:" + pagepara.para + " error:");
      console.log(err);
      return null;
    });
}
