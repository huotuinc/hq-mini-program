// pages/payPassword/index.js
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
    updataStatus: 1
  },

  _updataWay: function(e) {
    if (this.data.updataStatus == 0) {
      this.setData({
        updataStatus: 1,
        updataWay: '通过支付密码来验证'
      })
    } else {
      this.setData({
        updataStatus: 0,
        updataWay: '通过手机号码来验证'
      })
    }
  },
  sendCode: function(e) {
    console.log(e.currentTarget.dataset.phone)
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
        timer: setTimeout(this._getVerificationCode, 1000)
      })
    } else {
      this.setData({
        disabled: false,
        sendButtonText: '获取验证码'
      })
      clearTimeout(this.data.timer)
    }
  },

  onLoad: function(options) {

  },


  onShow: function() {},

})