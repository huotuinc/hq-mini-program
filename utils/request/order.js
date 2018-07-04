//订单相关的请求
import config from '../../config.js'
const app = getApp();

//订单列表
var getOrderList = function(data, callback) {
  app.request({
    url: config.getOrderList,
    method: 'get',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//取消订单
var closeOrder = function(data, callback) {
  app.request({
    url: config.closeOrder,
    method: 'post',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//删除订单
var deleteOrder = function(data, callback) {
  app.request({
    url: config.deletOrder,
    method: 'post',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//确认订单
var confirmOrder = function(data, callback) {
  app.request({
    url: config.confirmOrder,
    method: 'post',
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//提交评论
var submitEvaluate = function(data, callback) {
  app.request({
    url: config.submitComment,
    data: data,
    metod: 'post',
    success:function(res){
      callback({
        data:res.data
      })
    }
  })
}


module.exports = {
  getOrderList: getOrderList,
  closeOrder: closeOrder,
  deleteOrder: deleteOrder,
  confirmOrder: confirmOrder,
  submitEvaluate: submitEvaluate
};