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
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//评论列表
var commentList = function(data, callback) {
  app.request({
    url: config.commentList,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//评论点赞
var commentLike = function(data, callback) {
  app.request({
    url: config.commentLike,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//订单详情
var orderDetail = function(data, callback) {
  app.request({
    url: config.orderDetail,
    data: data,
    method: 'get',
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
} 

module.exports = {
  getOrderList: getOrderList,
  closeOrder: closeOrder,
  deleteOrder: deleteOrder,
  confirmOrder: confirmOrder,
  submitEvaluate: submitEvaluate,
  commentList: commentList,
  commentLike: commentLike,
  orderDetail: orderDetail
};