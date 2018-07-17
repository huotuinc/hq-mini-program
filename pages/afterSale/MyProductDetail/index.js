import afterSale from '../../../utils/request/afterSale.js'
const app = getApp();

Page({
  data: {
    btnMessage: '点击查看协商记录',
    watch: 0
  },
  //买家留言
  _goFeedback: function(e) {
    var afterId = this.data.afterId
    wx.navigateTo({
      url: '../message/index?afterId=' + afterId,
    })
  },
  _watchRecharge: function(e) {
    if (this.data.watch == 0) {
      this.setData({
        btnMessage: '点击收起协商记录',
        watch: 1
      })
    } else {
      this.setData({
        btnMessage: '点击查看协商记录',
        watch: 0
      })
    }
  },
  /**
   * 重新发起售后
   */
  _goSubmitReturnProduct: function(e) {
    wx.navigateTo({
      url: '../SubmitReturnProduct/index',
    })
  },
  /**
   * 获取售后详情
   */
  getAfterSaleDetail: function(afterId) {
    afterSale.afterSaleDetail({
      afterId: afterId
    }, function(res) {
      console.log(res)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})