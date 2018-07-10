import config from '../../config.js'
const app = getApp();

//获取商品详情
var goodsDetails = function(data, callback) {
  app.request({
    url: config.goodsDetails,
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
  goodsDetails: goodsDetails
};