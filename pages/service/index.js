// pages/service/index.js
import config from '../../config.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceUrl: "",
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")    
    try {
      var value = wx.getStorageSync('service_goods_details')
      if (value) {
        this.setData({
          options: value
        })
      }
    } catch (e) {
    }
    var options = this.data.options
    var userId = app.globalData.userId
    var title = options.title || ''
    var price = options.price || ''    
    var goodsId = options.goodsId||''
    this.setData({
      serviceUrl: config.host + "/service?userid=" + userId + "&title=" + title + "&price=" + price + "&goodsId="+goodsId
    })
  }
})