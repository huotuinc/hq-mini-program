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
        data: res.data.data
      })
    }
  })
}

module.exports = {
  getOrderList: getOrderList
};