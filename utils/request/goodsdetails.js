import config from '../../config.js'
const app = getApp();

//商品品牌
var goodsBrands = function(callback) {
  app.request({
    url: config.goodsBrands,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//商品分类
var goodsCats = function(callback) {
  app.request({
    url: config.goodsCats,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//商品标签
var goodsTags = function(callback) {
  app.request({
    url: config.goodsTags,
    success: function(res) {
      callback({
        data: res.data
      })
    }
  })
}

//获取商品详情
var goodsDetails = function(data, callback) {
  app.request({
    url: config.goodsDetails,
    data: data,
    success: function(res) {      
      var result = res.data;
      if (result.code == 200) {        
        callback(result.data)
      }
    },
    fail: function(error) {
      callback(error)
    }
  })
}

module.exports = {
  goodsBrands: goodsBrands,
  goodsCats: goodsCats,
  goodsTags: goodsTags,
  goodsDetails: goodsDetails
};