import config from '../../../config.js'
import wallet from '../../../utils/request/withdraw.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  _goUserMBean: function(e) {
    wx.navigateTo({
      url: '../integral/integral'
    })
  },
  _goResidual: function(e) {
    wx.navigateTo({
      url: '../residual/index'
    })
  },
  //待结算界面
  _goBalance: function() {
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
  //前往红包优惠券页面
  _goCouponURL: function(e) {
    wx.navigateTo({
      url: '../coupon/index',
    })
  },
  //提现界面
  _goKitting: function(e) {
    wx.navigateTo({
      url: '../../kiting/index'
    })
  },
  onShow: function() {
    var self = this
    wallet.myWallet(function(res) {
      var data = res.wallet.data
      data.UserIntegral = (data.UserIntegral) / 100
      data.UserTempIntegral = (data.UserTempIntegral) / 100
      self.setData({
        wallet: data
      })
    })
  },

})