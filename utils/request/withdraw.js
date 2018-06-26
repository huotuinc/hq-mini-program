import config from '../../config.js'
const app = getApp();

//我的钱包
var myWallet = function(callback) {
  app.request({
    url: config.myWallet,
    method: 'get',
    success: function(res) {
      callback({
        wallet: res.data
      })
    }
  })
}

//提现界面
var applyIndex = function(callback) {
  app.request({
    url: config.applyIndex,
    method: 'get',
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//提现申请
var applySubmit = function(data, callback) {
  app.request({
    url: config.applySubmit,
    method: 'post',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//提现记录
var applyList = function(data, callback) {
  app.request({
    url: config.applyList,
    method: 'get',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//提现账户
var getaccountlist = function(callback) {
  app.request({
    url: config.getaccountlist,
    method: 'get',
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

module.exports = {
  myWallet: myWallet,
  applyIndex: applyIndex,
  applySubmit: applySubmit,
  applyList: applyList,
  getaccountlist: getaccountlist
};