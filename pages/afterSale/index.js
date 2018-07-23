import user from '../../utils/request/user.js'
const app = getApp();

Page({

  data: {
    pageSize: 10,
    pageIndex: 1
  },
  _goSaleDetail: function(e) {
    var afterId = e.currentTarget.dataset.afterid

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
      console.log(res)
      self.setData({
        itemList: res.list
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

  }
})