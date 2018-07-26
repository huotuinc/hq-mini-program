import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({
  data: {
  },
  //计算轮播图的高度
  imageLoad: function(e) {
    var $width = e.detail.width
    var $height = e.detail.height
    this.setData({
      imgHeight: $height
    })
  },
  // 前往设置中心页面
  _goSetting: function(e) {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  //前往订单页面
  _goOrder: function(e) {
    var cur = e.currentTarget.dataset.currenttab ? e.currentTarget.dataset.currenttab : 0
    wx.navigateTo({
      url: '../order/order-list?currenttab=' + cur,
    })
  },
  // 前往待结算页面
  _goBalance: function(e) {
    wx.navigateTo({
      url: './balance/balance',
    })
  },
  //前往我的钱包
  _goWithdraw: function() {
    wx.navigateTo({
      url: './withdraw/withdraw',
    })
  },
  //前往收藏夹
  _goCollectGoods: function(e) {
    wx.navigateTo({
      url: '../collectgoods/collectgoods',
    })
  },
  //前往余额页面
  _goResidual: function(e) {
    wx.navigateTo({
      url: './residual/index',
    })
  },
  //前往觅豆页面
  _goIntegral: function(e) {
    wx.navigateTo({
      url: './integral/integral',
    })
  },
  //前往售后页面
  _goAftersale: function(e) {
    wx.navigateTo({
      url: '../afterSale/index',
    })
  },
  //页面渲染的API请求
  userIndex: function() {
    var self = this
    user.userIndex(function(res) {
      self.setData({
        userItem: res.userItem
      })
    })
  },
  /** 
   * 前往授权页面
   */
  _goLogin: function(e) {
    wx.navigateTo({
      url: '../scope/index',
    })
  },
  onLoad: function(options) {
  },
  onShow: function(options) {
    var userInfo = app.globalData.userInfo || ''
    this.setData({
      userInfo: userInfo
    })
    if (this.data.userInfo) {
      this.userIndex()
    }
  },
})