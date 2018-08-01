import user from '../../utils/request/user.js'
const app = getApp();

Page({

  data: {
    pageSize: 10,
    pageIndex: 1,
    loading: true
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
      self.setData({
        itemList: res.list,
        loading: false
      })
    })
  },
  onShow: function() {
    var customerId = app.globalData.customerId
    this._getSalesList(customerId)
  }
})