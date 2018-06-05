import config from '../../config.js'
const app = getApp();

var searchGoods = function (data, callback) {
  app.request({
    url: config.searchGoods,
    data: data,
    success: function (res) {
      if (res.code == 200) {
        callback(true, {
          goodsItems: res.data.goods_list
        })
      }
      else {
        wx.showToast({
          title: res.msg
        })
      }
    },
    fail: function (error) {
      callback(false, error)
    }
  })
}

module.exports = {
  searchGoods: searchGoods
};