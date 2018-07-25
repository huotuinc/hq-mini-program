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
      showModal: true,
      item: e.currentTarget.dataset.item
    })
  },
  //底部弹出设置默认的提现账户
  _setDefault: function(e) {
    var self = this
    wallet.setDefaultAccount({
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
  //删除提现账号
  _deleteAccoun: function(e) {
    var self = this
    wallet.delAccount({
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
    wx.setStorage({
      key: 'AccountItem',
      data: self.data.item,
    })
    wx.navigateTo({
      url: '../modification/index?AccountId=' + self.data.accoundId
    })

    this.hideModal()
  },
  _addModification: function(e) {
    var self = this
    wx.navigateTo({
      url: '../modification/index'
    })

  },

  //获取提现账户列表
  getAccountList: function() {
    var self = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      success: function() {
        wallet.getaccountlist(function(res) {
          if (res.data.code == 200) {
            self.setData({
              accountList: res.data.data
            })
          }
          wx.hideToast()
        })
      }
    })
  },
  //设置默认提现账户
  _setDefaultAccount: function(e) {
    var self = this
    wallet.setDefaultAccount({
        AccountId: e.currentTarget.dataset.accountid
      },
      function(res) {
        if (res.data.code == 200) {
          self.getAccountList()
        }
      }
    )
  },

  onLoad: function(options) {
    // this.getAccountList()0
  },

  onShow: function() {
    this.getAccountList()
  }
})