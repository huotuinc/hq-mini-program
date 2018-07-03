import config from '../../config.js'
const app = getApp();

//我的收藏
var myCollection = function(data, callback) {
  app.request({
    url: config.myCollection,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    },
    fail: function(error) {
      callback(error)
    }
  })
}

//添加/删除收藏
var addCollection = function(data, callback) {
  app.request({
    url: config.addCollection,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    },
    fail: function(error) {
      callback(error)
    }
  })
}


module.exports = {
  myCollection: myCollection,
  addCollection: addCollection
};