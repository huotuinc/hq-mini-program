import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: '',
    accountType: 1,
  },

  //切换提现方式选择
  _switchType: function(e) {
    var account = e.target.dataset.accounttype
    this.setData({
      accountType: account
    })
  },

  //获取姓名
  _getRealName: function(e) {
    this.setData({
      RealName: e.detail.value
    })
  },

  //获取支付宝账号
  _getZfbInfo: function(e) {
    this.setData({
      AccountInfo: e.detail.value
    })
  },

  //提交提现账户
  _saveAccount: function(e) {
    var self = this
    if (this.data.accountType == 1) {
      if (!this.data.RealName) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (!this.data.AccountInfo) {
        wx.showToast({
          title: '请输入支付宝账号',
          icon: 'none'
        })
        return
      }
      wallet.editAccount({
        RealName: self.data.RealName || '',
        AccountInfo: self.data.AccountInfo || '',
        AccountType: self.data.accountType,
        AccountId: self.data.AccountId || '0'
      }, function(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '编辑成功',
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    } else {
      wallet.editAccount({
        AccountType: self.data.accountType,
        AccountId: self.data.AccountId || '0'
      }, function(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '编辑成功',
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  },

  //删除提现账户
  _delectAccount: function(e) {
    var self = this
    wallet.delAccount({
        AccountId: self.data.AccountId
      },
      function(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    )
  },

  //获取编辑过来的提现账户信息
  _getAccountInfo: function(e) {
    var self = this
    wx.getStorage({
      key: 'AccountItem',
      success: function(res) {
        var account = res.data.Account
        self.setData({
          RealName: res.data.RealName,
          AccountInfo: account || '',
          accountType: res.data.AccountType,
          AccountId: res.data.AccountId
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    if (options.AccountId) {
      this._getAccountInfo()
    } else {
      wx.removeStorage({
        key: 'AccountItem',
      })
    }
  },
  onShow: function() {}
})