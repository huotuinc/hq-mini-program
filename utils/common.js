/**
 * 公共js
 */
import config from '../config.js'
const app = getApp();
/**
 * 设置收藏
 * @param goodsId 商品ID
 * @param remove 取消收藏，不传则添加
 */
export function collection(goodsId, remove) {
  if (typeof remove == undefined || remove == null) {
    remove = false;
  }
  if (remove) {
    app.request({
      url: config.favoriteUrl,
      data: {
        goodsid: goodsId
      },
      success: function (res) {
      }
    })
  }
  else {
    app.request({
      url: config.favoriteUrl,
      data: {
        ids: goodsId.toString()
      },
      success: function (res) {

      }
    })
  }
}

export function windowHeight() {
  var windowHeight = 0;
  wx.getSystemInfo({
    success: function (res) {
      var clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
      windowHeight = clientHeight * rpxR;
    }
  })
  return windowHeight;
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
export function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}
/**授权 */
export function authorize(scope,callback){
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) {
        wx.authorize({
          scope: scope,
          success() {
            callback()
          }
        })
      }
      else{
        callback()
      }
    }
  })
}

/**
 * 微信支付
 */
export function wxpay(data,callback){
  wx.requestPayment({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': 'MD5',
    'paySign': data.paySign,
    'success': function (res) {
      // if (typeof callback =='function'){
      //   callback(res);
      // }
    },
    'fail': function (res) {
      // if (typeof callback == 'function') {
      //   callback(res);
      // }
    },
    complete:function(res){
      if (typeof callback == 'function') {
        callback(res);
      }
    }
  })
}


/**获取分享引导购买的人id */
export function getRefermid(){
  try {
    var value = wx.getStorageSync("refermid");
    if (value) {
     return value;
    }
  } catch (e) {    
  }
  return 0;
}
/**设置分享引导人ID */
export function setRefermid(value){
  try {
    if (value==null||typeof value =='undefined')
      value=0
    wx.setStorageSync('refermid', value)
  } catch (e) {
  }
}