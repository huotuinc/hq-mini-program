import config from '../../config.js'
const app = getApp()

var searchGoods = function(data, callback) {
  app.request({
    url: config.searchGoods,
    data: data,
    success: function(res) {
      callback(true, {
        goodsItems: res.data.goods_list
      })
    },
    fail: function(error) {
      callback(false, error)
    }
  })
}

module.exports = {
  searchGoods: searchGoods
}
