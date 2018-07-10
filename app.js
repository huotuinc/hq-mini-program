import md5 from 'utils/md5.js';
import config from 'config.js';
App({
  /**
   * 全局变量数据
   */
  globalData: {
    mock:true,
    client_id: "wx461ef1c099dc8738",
    client_secret: "20678f117838b053c397c919e0c61521",
    app_secret: "4165a8d240b29af3f41818d10599d0d1",
    hasLogin: false,
    loading: false,
    unionid: null,
    mobileType: '',
    hwid: '',
    osType: 0,
    osVersion: '',
    userId: 0,
    userToken: '',
    customerId:4886
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        self.globalData.osVersion = res.system;
        self.globalData.mobileType = res.model;
      },
    })

    wx.login({
      success: function(res) {
        console.log(res)
        wx.getUserInfo({
          withCredentials: true,
          success: function(res) {
            //此处为获取微信信息后的业务方法
            console.log(res)
          },
          fail:function(err){
            console.log(err)
          }
        })
      }
    })

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  /** 
   *  数组对象按key升序, 并生成 md5_hex 签名
   * @param {Array/Object} obj   数组对象
   * @return {String}  encrypted md5加密后的字符串
   */
  sign: function(obj) {
    let signParams = obj || {}
    delete signParams['sign']
    //userToken加入签名
    signParams.userToken = this.globalData.userToken
    signParams.customerId = this.globalData.customerId
    // 过滤空值
    for (let param in signParams) {
      if (signParams[param] === '' || signParams[param] === undefined || signParams[param] === null) {
        delete signParams[param]
      }
    }
    const newParams = JSON.parse(JSON.stringify(signParams))
    //移除userToken
    delete signParams['userToken'];
    delete signParams['customerId'];
    return md5(this.raw(newParams) + this.globalData.app_secret)
  },
  /**
   * 签名参数排序并拼接成字符串
   */
  raw: function(args) {
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
    // console.log(str);
    return str
  },
  /**
   * 网络请求
   *   
   */
  request: function(options) {
    options = options || {}
    options.url = options.url || ''
    options.data = options.data || {}
    var self = this;
    options.data.timestamp = +new Date()
    options.data.sign = self.sign(options.data);
    const requestTask = wx.request({
      url: options.url,
      data: options.data,
      header: {
        appVersion: "1.0.0",
        hwid: self.globalData.hwid,
        osVersion: self.globalData.osVersion,
        mobileType: self.globalData.mobileType,
        osType: self.globalData.osType,
        userId: self.globalData.userId,
        userToken: self.globalData.userToken
      },
      method: options.method || 'post',
      success: function(res) {
        if (typeof options.success == 'function')
          options.success(res);
      },
      fail: function(err) {
        console.log('接口异常：' + options.url, err)
        if (typeof options.fail == 'function')
          options.fail(err)
      }
    })
    return requestTask;
  }
})