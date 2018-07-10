import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    time: 0,
    timer: '',
    sendButtonText: '获取验证码',
    step: 1,
    vCodeColor: '1'
  },

  //身份认证获取输入的验证码
  _getVcodInput: function(e) {
    this.setData({
      vcode: e.detail.value
    })
  },
  //验证手机号码&发送验证码
  sendCode: function(e) {
    var self = this
    var mobile = e.currentTarget.dataset.phone

    if (!this.data.disabled) {
      this.data.disabled = true
      clearTimeout(this.data.timer)
      user.sendCode({
          mobile: mobile
        },
        function(res) {
          wx.showToast({
            title: '验证码发送成功',
            icon: 'none',
            success: function() {
              self.setData({
                time: 60
              })
              self._getVerificationCode()
            }
          })
        }
      )
    }
  },
  //发送验证码倒计时操作
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
  //设置支付密码
  _getNewPwd: function(e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  //确认支付密码
  _getConfirmPwd: function(e) {
    this.setData({
      confirmPwd: e.detail.value
    })
  },
  //下一步&返回设置界面
  _goNextStep: function(e) {
    var step = e.currentTarget.dataset.step
    var self = this
    if (step == 1) {
      var code = self.data.vcode
      var mobile = self.data.mobile
      if (code) {
        user.updateMobile({
          mobile: mobile,
          code: code
        }, function(res) {
          self.setData({
            step: 2
          })
        })
      } else {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
      }

    } else if (step == 2) {
      var newPwd = self.data.newPwd
      var confirmPwd = self.data.confirmPwd
      if (!newPwd) {
        wx.showToast({
          title: '请输入支付密码',
          icon: 'none'
        })
        return
      }
      if (!confirmPwd) {
        wx.showToast({
          title: '请确认支付密码',
          icon: 'none'
        })
        return
      }
      if (newPwd != confirmPwd) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return
      }
      this.setData({
        step: 3
      })

    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad: function(options) {
    this.setData({
      mobile: options.mobile
    })
  },
  onShow: function() {}
})