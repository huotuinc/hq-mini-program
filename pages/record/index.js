import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

Page({
  data: {
    pageIndex: 1,
    pageSize: 10,
    loading: true
  },
  getApplyList: function(e) {
    var self = this
    wallet.applyList({
        pageIndex: self.data.pageIndex,
        pageSize: self.data.pageSize
      },
      function(res) {
        if (res.data.code == 200) {
          self.setData({
            applyList: res.data.data,
            loading: false
          })
        }
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
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            self.setData({
              applyList: applyList.concat(res.data.data),
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
      }
    )
  }

})