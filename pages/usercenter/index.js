const indexData = require('../../utils/mock/index.js')

import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  imageLoad: function(e) {
    var $width = e.detail.width
    var $height = e.detail.height
    this.setData({
      imgHeight: $height
    })
  },

  _goSetting: function(e) {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  _goOrder: function(e) {
    var cur = e.currentTarget.dataset.currenttab ? e.currentTarget.dataset.currenttab : 0
    wx.navigateTo({
      url: '../order/order-list?currenttab=' + cur,
    })
  },
  _goNewsFeed: function(e) {
    wx.navigateTo({
      url: './newsFeed/newsFeed',
    })
  },
  _goBalance: function(e) {
    console.log(1)
    wx.navigateTo({
      url: './balance/balance',
    })
  },
  _goWithdraw: function() {
    wx.navigateTo({
      url: './withdraw/withdraw',
    })
  },
  _goCollectGoods: function(e) {
    wx.navigateTo({
      url: '../collectgoods/collectgoods',
    })
  },
  _goResidual:function(e){
    wx.navigateTo({
      url: './residual/index',
    })
  },
  _goIntegral: function(e) {
    wx.navigateTo({
      url: './integral/integral',
    })
  },
  _goAftersale: function(e) {
    wx.navigateTo({
      url: '../afterSale/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this

    this.setData({
      bannerItems: indexData.bannerItems,
    });

    user.userIndex(function(res) {
      console.log(res.userItem)
      self.setData({
        userItem: res.userItem
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})