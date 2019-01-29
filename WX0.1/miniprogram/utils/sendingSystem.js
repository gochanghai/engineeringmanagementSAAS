
// brand	手机品牌	1.5.0
// model	手机型号	 
// pixelRatio	设备像素比	 
// screenWidth	屏幕宽度	1.1.0
// screenHeight	屏幕高度	1.1.0
// windowWidth	可使用窗口宽度	 
// windowHeight	可使用窗口高度	 
// statusBarHeight	状态栏的高度	1.9.0
// language	微信设置的语言	 
// version	微信版本号	 
// system	操作系统版本	 
// platform	客户端平台	 
// fontSizeSetting	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px	1.5.0
// SDKVersion	客户端基础库版本
var _AgentInfo = {
    brand:'',
    model: '',
    pixelRatio: '',
    windowWidth: '',
    windowHeight: '',
    language: '',
    version: '',
    platform:'',
    system: '',
    _init: function () {
        wx.getSystemInfo({
            success: function (res) {
                _AgentInfo.brand = res.brand;
                _AgentInfo.model = res.model;
                _AgentInfo.pixelRatio = res.pixelRatio;
                _AgentInfo.windowWidth = res.windowWidth;
                _AgentInfo.windowHeight = res.windowHeight;
                _AgentInfo.language = res.language;
                _AgentInfo.version = res.version;
                _AgentInfo.platform = res.platform;
                _AgentInfo.system = res.system;
            }
        })
    },
}
export let _Agent = () => {
    _AgentInfo._init();
    return _AgentInfo;
}

