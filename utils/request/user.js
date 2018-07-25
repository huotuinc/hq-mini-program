import config from '../../config.js'
const app = getApp();

//个人中心首页
var userIndex = function(callback) {
  app.request({
    url: config.userIndex,
    success: function(res) {
      callback({
        userItem: res.data.data
      })
    }
  })
}
//可/待用积分
var getIntegralList = function(data, callback) {
  app.request({
    url: config.getIntegralList,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//售后列表
var getSalesList = function(data, callback) {
  app.request({
    url: config.getSalesList,
    data: data,
    success: function(res) {
      callback({
        list: res.data.data
      })
    }
  })
}
//设置界面
var setting = function(callback) {
  app.request({
    url: config.setting,
    success: function(res) {
      callback({
        settingItem: res.data.data
      })
    }
  })
}
//修改用户基本信息
var updateUserBaseInfo = function(data, callback) {
  app.request({
    url: config.updateUserBaseInfo,
    data: data,
    success: function(res) {
      callback({
        code: res.data.data.code
      })
    }
  })
}
//更改手机号码
var updateMobile = function(data, callback) {
  app.request({
    url: config.updateMobile,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}
//修改支付密码
var updatePayPassword = function(data, callback) {
  app.request({
    url: config.updatePayPassword,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//是否开启支付保护
var updatePayPasswordStatus = function(data, callback) {
  app.request({
    url: config.updatePayPasswordStatus,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}
//买家留言
var saleComment = function(data, callback) {
  app.request({
    url: config.saleComment,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//发送验证码
var sendCode = function(data, callback) {
  app.request({
    url: config.sendCode,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}
//收货地址管理
var addressList = function(callback) {
  app.request({
    url: config.addressList,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}
//添加/编辑收货地址
var updateAddress = function(data, callback) {
  app.request({
    url: config.updateAddress,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}
//删除收货地址
var deleteAddress = function(data, callback) {
  app.request({
    url: config.deleteAddress,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//设置默认收货地址
var changeAddressDefault = function(data, callback) {
  app.request({
    url: config.changeAddressDefault,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//用户钱包账户
var walletaccount = function(data, callback) {
  app.request({
    url: config.walletaccount,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//获取可用优惠券
var enabledCoupons = function(data, callback) {
  app.request({
    url: config.enabledCoupons,
    data: data,
    success: function(res) {
      callback({
        data: res.data.data
      })
    }
  })
}
//判断支付密码是否正确
var JudgePayWord = function(data,callbak){
  app.request({
    url: config.judgePayWord,
    data: data,
    success: function (res) {
      callback({
        data: res.data.data
      })
    }
  })
}
module.exports = {
  userIndex: userIndex,
  getIntegralList: getIntegralList,
  getSalesList: getSalesList,
  saleComment: saleComment,
  setting: setting,
  updateMobile: updateMobile,
  updateUserBaseInfo: updateUserBaseInfo,
  updatePayPassword: updatePayPassword,
  updatePayPasswordStatus: updatePayPasswordStatus,
  sendCode: sendCode,
  addressList: addressList,
  updateAddress: updateAddress,
  deleteAddress: deleteAddress,
  changeAddressDefault: changeAddressDefault,
  walletaccount: walletaccount,
  enabledCoupons: enabledCoupons,
  JudgePayWord: JudgePayWord
};