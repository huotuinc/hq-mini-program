import config from '../../config.js'
const app = getApp();

//我的团队
var myTeams = function (data, callback) {
  app.request({
    url: config.myTeams,
    data: data,
    success: function (res) {
      if (res.code == 200) {
        callback(true, {
          teamItem: res.data
        })
      }
      else {
        wx.showToast({
          title: res.msg
        })
      }
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}

//收益中心
var myProfit = function (data, callback) {
  app.request({
    url: config.myProfit,
    data: data,
    success: function (res) {
      if (res.code == 200) {
        callback(true, {
          myprice: res.data
        })
      }
      else {
        wx.showToast({
          title: res.msg
        })
      }
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}


module.exports = {
  myTeams: myTeams,
  myProfit: myProfit
}