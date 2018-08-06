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
  _getSalesList: function() {
    var self = this
    this.data.loading = true
    var data = {
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex,
    }
    user.getSalesList(data, function(res) {
      self.setData({
        itemList: res.list,
        loading: false
      })
    })
  },
  onShow: function() {
    this._getSalesList()
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
    this._getSalesList()
  },
  onReachBottom: function() {
    this.setData({
      loading: true
    })
    var self = this
    var page = this.data.pageIndex + 1
    var itemList = this.data.itemList

    var data = {
      pageSize: this.data.pageSize,
      pageIndex: page
    }
    user.getSalesList(data, function(res) {
      if (res.list.length > 0) {
        self.setData({
          itemList: itemList.concat(res.list),
          loading: false,
          pageIndex: page
        })
      } else {
        self.setData({
          loading: false,
        })
        wx.showToast({
          title: '没有更多记录...',
          icon: 'none'
        })
      }
    })
  }
})