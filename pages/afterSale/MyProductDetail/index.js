import afterSale from '../../../utils/request/afterSale.js'
const app = getApp();

Page({
  data: {
    watch: 0
  },
  //买家留言
  _goFeedback: function(e) {
    var afterId = this.data.afterId
    wx.navigateTo({
      url: '../message/index?afterId=' + afterId,
    })
  },
  /**
   * 重新发起售后
   */
  _goSubmitReturnProduct: function(e) {
    var saleDetail = this.data.saleDetail
    wx.navigateTo({
      url: '../SubmitReturnProduct/index?orderId=' + saleDetail.OrderId + '&productId=' + saleDetail.ProductId+ '&afterId=' + saleDetail.AfterId,
    })
  },

  /**
   * 取消售后申请
   */
  _cancelAfterSale: function() {
    var afterId = this.data.afterId
    var slef = this
    wx.showModal({
      content: '您确定取消售后申请吗？',
      success: function(res) {
        if (res.confirm) {
          afterSale.cancelAfterSale({
            afterId: afterId
          }, function(res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                success: function(res) {
                  slef.getAfterSaleDetail(afterId)
                }
              })
            }
          })
        }
      }
    })

  },

  /**
   * 填写物流信息
   */
  _submitLogistics: function() {
    wx.navigateTo({
      url: '../wuliu/index?afterSaleId=' + this.data.afterId,
    })
  },

  /**
   * 获取售后详情
   */
  getAfterSaleDetail: function(afterId) {
    var self = this
    afterSale.afterSaleDetail({
      afterId: afterId
    }, function(res) {
      var saleDetail = res.data.data
      for (let idx in saleDetail.AfterItems) {
        if (saleDetail.AfterItems[idx].Remark) {
          saleDetail.AfterItems[idx].Remark = saleDetail.AfterItems[idx].Remark.split("|")
        }
        if (saleDetail.AfterItems[idx].ImgList) {
          saleDetail.AfterItems[idx].ImgList = saleDetail.AfterItems[idx].ImgList.split("|")
        }
      }
      self.setData({
        saleDetail: saleDetail
      })
    })
  },

  onLoad: function(options) {
    this.setData({
      afterId: options.afterId
    })
    this.getAfterSaleDetail(options.afterId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getAfterSaleDetail(this.data.afterId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})