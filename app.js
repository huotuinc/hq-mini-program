import md5 from 'utils/md5.js';
import config from 'config.js';
App({
  /**
   * 全局变量数据
   */
  globalData: {
    client_id: "",
    client_secret: "",
    app_secret: "4165a8d240b29af3f41818d10599d0d1",
    hasLogin: false,
    unionid: null,
    mobileType: '',
    hwid: '',
    osType: 0,
    osVersion: '',
    userId: 0,
    userToken: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.globalData.osVersion = res.system;
        self.globalData.mobileType = res.model;
        console.log(res)
      },
    })

    wx.login({
      success: function (res) {
        console.log(config);
        //todo:  
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  /** 
    *  数组对象按key升序, 并生成 md5_hex 签名
    * @param {Array/Object} obj   数组对象
    * @return {String}  encrypted md5加密后的字符串
    */
  sign: function (obj) {
    let signParams = obj || {}
    delete signParams['sign']    
    //userToken加入签名
    signParams.userToken = this.globalData.userToken
    // 过滤空值
    for (let param in signParams) {
      if (signParams[param] === '' || signParams[param] === undefined || signParams[param] === null) {
        delete signParams[param]
      }
    }
    const newParams = JSON.parse(JSON.stringify(signParams))    
    //移除userToken
    delete signParams['userToken'];
    return md5(this.raw(newParams) + this.globalData.app_secret)
  },
  /**
   * 签名参数排序并拼接成字符串
   */
  raw: function (args) {
    // 规避非驼峰问题
    const newObj = {}
    for (let o in args) {
      newObj[o.toLowerCase()] = args[o]
    }
    let keys = Object.keys(newObj)
    keys = keys.sort()
    let newArgs = {}
    keys.forEach(key => {
      newArgs[key.toLowerCase()] = newObj[key]
    })
    let str = ''
    for (let k in newArgs) {
      str += k + newArgs[k]
    }
    console.log(str);
    return str
  },
  /**
   * post 请求
   */
  post: function (url, data, callback) {
    data = data || {}
    var self = this;
    data.timestamp = +new Date()
    data.sign = self.sign(data);
    const requestTask = wx.request({
      url: url,
      data: data,
      header: {
        appVersion: "1.0.0",
        hwid: self.globalData.hwid,
        osVersion: self.globalData.osVersion,
        mobileType: self.globalData.mobileType,
        osType: self.globalData.osType,
        userId: self.globalData.userId,
        userToken: self.globalData.userToken
      },
      method: 'post',
      success: function (res) {
        callback(res)
      },
      fail: function (err) {
        console.log('接口异常：' + url, err)
        callback(err)
      }
    })
    return requestTask;
  }
})
