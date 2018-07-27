Page({
  data: {

  },
  onLoad: function(options) {

  },
  onShow: function() {
    this.setData({
      CouponURL: wx.getStorageSync('CouponURL')
    })
  },
})