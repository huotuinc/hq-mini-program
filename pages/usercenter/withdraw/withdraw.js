import config from '../../../config.js'
import wallet from '../../../utils/request/withdraw.js'
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  _goUserMBean: function(e) {
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  _goResidual: function(e) {
    wx.navigateTo({
      url: '../residual/index',
    })
  },
  //待结算界面
  _goBalance: function() {
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  //提现界面
  _goKitting: function(e) {
    wx.navigateTo({
      url: '../../kiting/index',
    })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wallet.myWallet(function(res) {
      if (res.wallet.code == 200) {
        self.setData({
          wallet: res.wallet.data
        })
      }
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