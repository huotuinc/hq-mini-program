import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({
  data: {
    disabled: false,
    time: 0,
    timer: '',
    sendButtonText: '获取验证码',
    vCodeColor: '1'
  },
  //获取用户输入的手机号码
  _getMobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //获取用户输入的验证码
  _getVcodeInput: function(e) {
    this.setData({
      vcode: e.detail.value
    })
  },
  //获取验证码
  sendCode: function(e) {
    var mobile = e.currentTarget.dataset.phone
    if (!mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    if (!/^1([34578])\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    if (!this.data.disabled) {
      this.data.disabled = true
      clearTimeout(this.data.timer)
      this.data.time = 60
      this._getVerificationCode()
    }
  },
  _getVerificationCode: function() {
    if (this.data.time > 0) {
      this.data.time--;
      this.setData({
        sendButtonText: `${this.data.time}秒后发送`,
        timer: setTimeout(this._getVerificationCode, 1000),
        vCodeColor: '2'
      })
    } else {
      this.setData({
        disabled: false,
        sendButtonText: '获取验证码',
        vCodeColor: '1'
      })
      clearTimeout(this.data.timer)
    }
  },

  _updateMobile: function(e) {
    var self = this
    if (this.validForm()) {
      user.updateMobile({
        mobile: self.data.mobile,
        code: self.data.vcode
      }, function(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '绑定手机成功',
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }

  },
  //手机号码、验证码的非空检测
  validForm: function(mobile, code) {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    if (!/^1([34578])\d{9}$/.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return false
    }

    if (!this.data.vcode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return false
    }
    return true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phone: options.phone
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