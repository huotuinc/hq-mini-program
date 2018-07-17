/**
 * 售后相关的请求
 */
import config from '../../config.js'
const app = getApp();

/**
 * 申请/修改售后
 */
var applyAfterSale = function(data, callback) {
  app.request({
    url: config.afterSales,
    data: data,
    success: function(res) {
      if (res.data == 200) {
        callback({
          data: res.data
        })
      }
    }
  })
}

/**
 * 售后详情
 */
var afterSaleDetail = function(data, callback) {
  app.request({
    url: config.afterSaleDetail,
    data: data,
    method: 'get',
    success: function(res) {
      if (res.code == 200) {
        callback({
          data: res.data
        })
      }
    }
  })
}

/**
 * 取消售后
 */
var cancelAfterSale = function(data, callback) {
  app.request({
    url: config.cancelAfterSale,
    data: data,
    success: function(res) {
      if (res.code == 200) {
        callback({
          data: res.data
        })
      }
    }
  })
}

module.exports = {
  applyAfterSale: applyAfterSale,
  afterSaleDetail: afterSaleDetail,
  cancelAfterSale: cancelAfterSale
};