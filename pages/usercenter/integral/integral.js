import wallet from '../../../utils/request/withdraw.js'
const app = getApp()
Page({
  data: {
    PageIndex: 1,
    PageSize: 10
  },

  onShow: function() {
    var self = this
    wallet.getMiBeanList({
      PageIndex: self.data.PageIndex,
      PageSize: self.data.PageSize
    }, function(res) {
      console.log(res)
    })
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
})