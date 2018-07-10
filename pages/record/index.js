import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

Page({
  data: {},
  onLoad: function(options) {
    var self = this
    wallet.applyList(
      {
        pageIndex: 1,
        pageSize: 10
      },
      function(res) {
        self.setData({
          applyList: res.data.data.list
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
