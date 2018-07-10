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
  _getAccountInfo: function(e) {
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
        AccountId: self.data.AccountId || ''
      }, function(res) {
        console.log(res)
      })
    } else {
      wallet.editAccount({
        AccountType: self.data.accountType,
        AccountId: self.data.AccountId || ''
      }, function(res) {
        console.log(res)
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      categoryTitle: options.categoryTitle
    })
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
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