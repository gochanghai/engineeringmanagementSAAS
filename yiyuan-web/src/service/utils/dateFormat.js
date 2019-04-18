/** 
 * 如：2019-03-27 17:08
 */
export let dateFormat = function (date){
    
    if(null != date){
        var d = new Date(date);
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
 * 如：2019-03-27 
 */
export let dateFormat2 = function (date){
    date = dateFormat(date);
    if(10 < date.length){
       
        return date.substring(0, 10);
    }
    return date;
}