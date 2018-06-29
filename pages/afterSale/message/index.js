import config from '../../../config.js'
import user from '../../../utils/request/user.js'
const app = getApp()
Page({
  data: {},

  _getInputMessage: function(e) {
    this.setData({
      txtmemo: e.detail.value
    })
  },

  _saleComment: function(e) {
    var self = this
    var txtmemo = this.data.txtmemo
    if (!txtmemo) {
      wx.showToast({
        title: '请填写留言',
        icon: 'none'
      })
      return
    }
    user.saleComment(
      {
        customerid: 1,
        afterid: 10,
        orderid: 23,
        txtmemo: self.data.txtmemo
      },
      function(res) {
        wx.showToast({
          title: '发送成功'
        })
      }
    )
  },
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
