import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp()

Page({
  data: {
    disabled: false,
    time: 0,
    timer: '',
    sendButtonText: '获取验证码',
    vCodeColor: '1',
    step: 1
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
    var self = this
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
        title: '手机号码错误',
        icon: 'none'
      })
      return
    }

    if (!this.data.disabled) {
      this.data.disabled = true
      clearTimeout(this.data.timer)
      user.sendCode({
          mobile: mobile
        },
        function(res) {
          var verifyCode = res.data.data.verifyCode
          wx.showToast({
            title: '验证码发送成功',
            icon: 'none',
            success: function() {
              self.setData({
                time: 60,
                verifyCode: verifyCode
              })
              self._getVerificationCode()
            }
          })
        }
      )
    }
  },
  _getVerificationCode: function() {
    if (this.data.time > 0) {
      this.data.time--
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

  _goNextStep: function(e) {
    var self = this
    user.updateMobile({
      mobile: self.data.phone,
      code: self.data.vcode
    }, function(res) {
      self.setData({
        step: 2,
        disabled: false,
        sendButtonText: '获取验证码',
        vCodeColor: '1',
        time: 0,
        timer: '',
      })
    })
  },

  _updateMobile: function(e) {
    var self = this
    if (this.validForm()) {
      user.updateMobile({
          mobile: self.data.mobile,
          code: self.data.vcode
        },
        function(res) {
          wx.showToast({
            title: '绑定手机成功',
            success: function() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      )
    }
  },
  //手机号码、验证码的非空检测
  validForm: function() {
    if (!/^1([34578])\d{9}$/.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号码错误',
        icon: 'none'
      })
      return false
    }

    if (!this.data.vcode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
      return false
    }

    if (!(this.data.vcode == this.data.verifyCode)) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
      return false
    }
    return true
  },

  onLoad: function(options) {
    if (options.phone) {
      this.setData({
        mobile: options.mobile,
        phone: options.phone
      })
    } else {
      this.setData({
        // phone: options.phone,
        step: 2
      })
    }

  },

  onShow: function() {}
})