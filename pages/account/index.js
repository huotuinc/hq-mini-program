import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

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
    })
  },
  //编辑
  _showCompile: function(e) {
    this.setData({
      accoundId: e.currentTarget.dataset.accountid,
      showModal: true
    })
  },
  //底部弹出设置默认的提现账户
  _setDefault: function(e) {
    var self = this
    wallet.setDefaultAccount(
      {
        AccountId: self.data.accoundId
      },
      function(res) {
        self.setData({
          showModal: false
        })
        self.getAccountList()
      }
    )
  },
  _goModification: function(e) {
    var self = this
    if (e.currentTarget.dataset.categorytitle == '修改提现账户') {
      wx.navigateTo({
        url:
          '../modification/index?categoryTitle=' +
          e.currentTarget.dataset.categorytitle +
          '&AccountId=' +
          self.data.accoundId
      })
    } else {
      wx.navigateTo({
        url: '../modification/index?categoryTitle=' + e.currentTarget.dataset.categorytitle
      })
    }
    this.hideModal()
  },

  getAccountList: function() {
    var self = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      success: function() {
        wallet.getaccountlist(function(res) {
          self.setData({
            accountList: res.data.data.list
          })
          wx.hideToast()
        })
      }
    })
  },
  //设置默认提现账户
  _setDefaultAccount: function(e) {
    // console.log(e)
    wallet.setDefaultAccount(
      {
        AccountId: e.currentTarget.dataset.accountid
      },
      function(res) {
        self.getAccountList()
      }
    )
  },

  onLoad: function(options) {
    // this.getAccountList()
  },

  onShow: function() {
    this.getAccountList()
  }
})
