import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  _showCompile: function(e) {
    this.setData({
      showModal: true
    })
  },
  _goModification: function(e) {
    wx.navigateTo({
      url: '../modification/index?categoryTitle=' + e.currentTarget.dataset.categorytitle
    })
    this.hideModal()
  },

  getAccountList: function() {
    var self = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      success: function() {
        wallet.getaccountlist(function(res) {
          if (res.data.code == 200) {
            self.setData({
              accountList: res.data.data.list
            })
            wx.hideToast()
          }
        })
      }
    })
  },

  onLoad: function(options) {
    this.getAccountList()
  },

  onShow: function() {
    this.getAccountList()
  },

})