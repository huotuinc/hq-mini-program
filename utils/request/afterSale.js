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
      callback({
        data: res.data
      })
    }
  })
}

/**
 * 获取申请售后信息
 */
var getApplyAfterSale = function(data, callback) {
  app.request({
    url: config.getApplyAfterSale,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
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
    success: function(res) {
      callback({
        data: res.data
      })
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
      callback({
        data: res.data
      })
    }
  })
}

/**
 * 提交物流信息
 */
var submitLogistics = function(data, callback) {
  app.request({
    url: config.submitLogistics,
    data: data,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

module.exports = {
  applyAfterSale: applyAfterSale,
  afterSaleDetail: afterSaleDetail,
  getApplyAfterSale: getApplyAfterSale,
  cancelAfterSale: cancelAfterSale,
  submitLogistics: submitLogistics
};