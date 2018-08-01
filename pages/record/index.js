import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

Page({
  data: {
    pageIndex: 1,
    pageSize: 10,
    loading: true
  },
  onLoad: function(options) {
    var self = this
    wallet.applyList({
        pageIndex: 1,
        pageSize: 10
      },
      function(res) {
        self.setData({
          applyList: res.data.data.list,
          loading: false
        })
      }
    )
  },
  getApplyList: function(e) {
    var self = this
    wallet.applyList({
        pageIndex: self.data.pageIndex,
        pageSize: self.data.pageSize
      },
      function(res) {
        self.setData({
          applyList: res.data.data.list,
          loading: false
        })
      }
    )
  },
  onShow: function() {
    this.getApplyList()
  },

  onReachBottom: function() {
    this.setData({
      loading: true
    })
    var page = this.data.pageIndex + 1
    var self = this
    var applyList = this.data.applyList
    wallet.applyList({
        pageIndex: page,
        pageSize: self.data.pageSize
      },
      function(res) {
        if (res.data.data.lost.length > 0) {
          self.setData({
            applyList: applyList.concat(res.data.data.list),
            loading: false,
            pageIndex: page,
            loading: false
          })
        } else {
          self.setData({
            loading: false
          })
          wx.showToast({
            title: '没有更多啦...',
            icon: 'none'
          })
        }
      }
    )
  }

})