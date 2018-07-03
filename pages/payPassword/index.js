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
    updataWay: '通过手机号码来验证',
    updataStatus: 1,
    step: 1,
    vCodeColor: '1'
  },

  _updataWay: function(e) {
    if (this.data.updataStatus == 0) {
      this.setData({
        updataStatus: 1,
        updataWay: '通过支付密码来验证',
        time: 0
      })
    } else {
      this.setData({
        updataStatus: 0,
        updataWay: '通过手机号码来验证'
      })
    }
  },

  //身份认证获取输入的验证码
  _getVcodInput: function(e) {
    this.setData({
      vcode: e.detail.value
    })
  },
  //身份认证获取输入的原始密码
  _getOldPwd: function(e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },

  //验证手机号码&发送验证码
  sendCode: function(e) {
    var self = this
    var mobile = e.currentTarget.dataset.phone
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

  //下一步&返回设置界面
  _goNextStep: function(e) {
    var step = e.currentTarget.dataset.step
    var updataStatus = this.data.updataStatus

    if (step == 1) {
      this.setData({
        step: 2
      })
      // if (updataStatus ==1){

      // }
    } else if (step == 2) {
      this.setData({
        step: 3
      })
    }else{
      wx.navigateBack({
        delta:1
      })
    }
  },
  onLoad: function(options) {},
  onShow: function() {}
})