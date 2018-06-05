import config from '../../config.js'
const app = getApp();

//获取商品详情
var goodsDetails = function (data, callback) {
  app.request({
    url: config.goodsDetails,
    data: data,
    success: function (res) {
      if (res.code == 200) {
        callback(true, {
          item: res.data
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
  goodsDetails: goodsDetails
};