//购物车相关

import config from '../../config.js'
const app = getApp();

//购物车获取
var getCartGoods = function(callback) {
  app.request({
    url: config.getCart,
    success: function(res) {
      console.log(res.data)
      callback({
        cartGoods: res.data.data
      })
    }
  })
}

//购物车添加
var addCartGoods = function(data, callback) {
  app.request({
    url: config.addCart,
    data: data,
    success: function(res) {
      callback({
        addCartGoods: res.data
      })
    }
  })
}

//购物车修改
var updateCart = function(data, callback) {
  app.request({
    url: config.updateCart,
    data: data,
    success: function(res) {
      callback({
        updateCart: res.data
      })
    }
  })
}

//购物车删除
var removeCart = function(data, callback) {
  app.request({
    url: config.removeCart,
    data: data,
    success: function(res) {
      callback({
        removeCart: res.data
      })
    }
  })
}

//批量删除
var batchremove = function(data, callback) {
  app.request({
    url: config.batchremove,
    data: data,
    success: function(res) {
      if (res.data.code == 200) {
        callback({
          batchremove: res.data
        })
      }
    }
  })
}

//批量选中
var batchcheck = function(data, callback) {
  app.request({
    url: config.batchcheck,
    data: data,
    success: function(res) {
      if (res.data.code == 200) {
        callback({
          batchcheck: res.data
        })
      }
    }
  })
}

module.exports = {
  getCartGoods: getCartGoods,
  addCartGoods: addCartGoods,
  updateCart: updateCart,
  removeCart: removeCart,
  batchremove: batchremove,
  batchcheck: batchcheck
};