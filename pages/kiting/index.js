import md5 from '../../utils/md5.js';
import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
import user from '../../utils/request/user.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    applyNum: '',
    wallets_password_flag: false, //密码输入遮罩
    applyData: {}
  },
  _goRecord: function(e) {
    wx.navigateTo({
      url: '../record/index'
    })
  },
  _goAccount: function(e) {
    wx.navigateTo({
      url: '../account/index'
    })
  },
  applyNum: function(e) {
    this.setData({
      applyNum: e.detail.value
    })
  },

  _integrallAll: function(e) {
    var userIntegral = this.data.applyData.UserIntegral || 0
    this.setData({
      applyNum: userIntegral
    })
  },
  //获取钱包密码 
  set_wallets_password: function(e) {
    var self = this
    this.setData({
      wallets_password: e.detail.value
    })
    if (this.data.wallets_password.length == 6) { //密码长度6位时，自动验证钱包支付结果
      user.JudgePayWord({
        PassWord: md5(this.data.wallets_password)
      }, function(res) {
        if (res.data.code == 200) {
          self.setData({
            isFocus: false, //失去焦点
            wallets_password_flag: false,
            wallets_password: ''
          })
          wallet.applySubmit({
            AccountId: self.data.applyData.AccountId,
            ApplyMoney: Number(self.data.applyNum) * 100,
          }, function(res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提现申请成功',
                success: function() {
                  self.getApply()
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
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  //忘记密码
  modify_password: function(e) {
    wx.navigateTo({
      url: '../payPassword/index'
    })
  },

  set_Focus: function() { //聚焦input
    this.setData({
      isFocus: true
    })
  },
  set_notFocus: function() { //失去焦点
    this.setData({
      isFocus: false
    })
  },
  close_wallets_password: function() { //关闭钱包输入密码遮罩
    this.setData({
      isFocus: false, //失去焦点
      wallets_password_flag: false,
    })
  },

  withdrawBtn: function(e) {
    var self = this
    var userIntegral = Number(this.data.applyData.UserIntegral) || 0
    var baseMoney = Number(this.data.applyData.BaseMoney)
    var realityIntegral = Number(this.data.applyNum)
    var accountId = this.data.applyData.AccountId
    if (!accountId) {
      wx.showToast({
        title: '请选择提现账号',
        icon: 'none'
      })
    } else if (realityIntegral < baseMoney) {
      wx.showToast({
        title: '起提金额不足',
        icon: 'none'
      })
    } else if (realityIntegral <= 0) {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none'
      })
    } else {
      if (realityIntegral > userIntegral) {
        wx.showToast({
          title: '提现金额不足',
          icon: 'none'
        })
      } else {
        if (this.data.applyData.IsSettingPayWord) {
          self.setData({
            wallets_password_flag: true,
            isFocus: true
          })
        } else {
          wx.showModal({
            content: '请先设置支付密码',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../payPassword/index'
                })
              }
            }
          })
        }
      }
    }
  },

  /**
   * 获取提现界面信息
   */
  getApply: function(res) {
    var self = this
    wallet.applyIndex(function(res) {
      if (res.data.code == 200) {
        var data = res.data.data
        if (data.UserIntegral) {
          data.UserIntegral = data.UserIntegral / 100
        } else {
          data.UserIntegral = 0
        }
        self.setData({
          applyData: data
        })
      }
    })
  },
  onShow: function() {
    var self = this
    wx.getStorage({
      key: 'userTelInfo',
      success: function(res) {
        var mobile = res.data
        var reg = /^(\d{3})\d{4}(\d{4})$/
        mobile = mobile.replace(reg, "$1****$2")
        var phone = res.data
        self.setData({
          mobile: mobile,
          phone: phone
        })
      },
    })
    this.getApply()
  }
})