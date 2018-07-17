import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  data: {
    pageSize: 10,
    pageIndex: 1
  },
  _goSaleDetail: function(e) {
    var afterId = this.data.afterid
    wx.navigateTo({
      url: 'MyProductDetail/index?afterId=' + afterId,
    })
  },
  _getSalesList: function(customerId) {
    var self = this
    var data = {
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex,
      customerId: customerId
    }
    user.getSalesList(data, function(res) {
      self.setData({
        itemList: res.list.data
      })
    })
  },
  onLoad: function(options) {
    var customerId = 0
    var that = this
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      success: function() {
        that._getSalesList(customerId)
        wx.hideToast()
      }
    })
  },

  onShow: function() {

  },

  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})