import config from '../../config.js'
const app = getApp();

//个人中心首页
var userIndex = function(callback) {
  app.request({
    url: config.userIndex,
    method: 'get',
    success: function(res) {
      if (res.data.code == 200) {
        callback({
          userItem: res.data.data
        })
      }
    }
  })
}

//设置界面
var setting = function(callback) {
  app.request({
    url: config.setting,
    method: 'get',
    success: function(res) {
      if (res.data.code == 200) {
        callback({
          settingItem: res.data.data
        })
      }
    }
  })
}

//修改用户基本信息
var updateUserBaseInfo = function(data, callback) {
  app.request({
    url: config.updateUserBaseInfo,
    method: 'post',
    data: data,
    success: function(res) {
      if (res.data.code == 200) {
        callback({
          code: res.data.code
        })
      }
    }
  })
}

//是否开启支付保护
var updatePayPasswordStatus = function(data,callback){
  app.request({
    url: config.updatePayPasswordStatus,
    method:'post',
    data:data,
    success:function(res){
     callback({
       data: res.data.code
     })
    }
  })
}

module.exports = {
  userIndex: userIndex,
  setting: setting,
  updateUserBaseInfo: updateUserBaseInfo,
  updatePayPasswordStatus: updatePayPasswordStatus
};