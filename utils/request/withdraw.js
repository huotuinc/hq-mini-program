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

//设置默认的提现账号
var setDefaultAccount = function(data, callback) {
  app.request({
    url: config.setDefaultAccount,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//删除提现账号
var delAccount = function(data, callback) {
  app.request({
    url: config.delAccount,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//编辑提现账户
var editAccount = function(data, callback) {
  app.request({
    url: config.editAccount,
    data: data,
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
  getaccountlist: getaccountlist,
  setDefaultAccount: setDefaultAccount,
  delAccount: delAccount,
  editAccount: editAccount
};