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
    var afterId = this.data.afterId
    var txtmemo = this.data.txtmemo
    if (!txtmemo) {
      wx.showToast({
        title: '请填写留言',
        icon: 'none'
      })
      return
    }
    user.saleComment({
        afterSaleId: afterId,
        content: self.data.txtmemo
      },
      function(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '发送成功',
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: '网络异常..',
            icon: 'none'
          })
        }

      }
    )
  },
  onLoad: function(options) {
    this.setData({
      afterId: options.afterId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {}
})