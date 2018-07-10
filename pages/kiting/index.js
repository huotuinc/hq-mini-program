import config from '../../config.js'
import wallet from '../../utils/request/withdraw.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    applyNum: ''
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
    // console.log(e.detail.value)
    this.setData({
      applyNum: e.detail.value
    })
  },

  _integrallAll: function(e) {
    var userIntegral = this.data.applyData.UserIntegral
    this.setData({
      applyNum: userIntegral
    })
  },

  withdrawBtn: function(e) {
    var userIntegral = Number(this.data.applyData.UserIntegral)
    var baseMoney = Number(this.data.applyData.BaseMoney)
    var realityIntegral = Number(this.data.applyNum)
    var accountId = this.data.applyData.AccountId
    if (realityIntegral < baseMoney) {
      wx.showToast({
        title: '起提金额不足',
        icon: 'none'
      })
    } else {
      if (realityIntegral > userIntegral) {
        wx.showToast({
          title: '提现金额不足',
          icon: 'none'
        })
      } else {
        wx.showModal({
          title: '提现通知',
          content: '确认提现之后，预计24个小时之内可以到账',
          success: function(res) {
            if (res.confirm) {
              wallet.applySubmit(
                {
                  AccountId: accountId,
                  ApplyMoney: realityIntegral
                },
                function(res) {}
              )
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wallet.applyIndex(function(res) {
      self.setData({
        applyData: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {}
})
