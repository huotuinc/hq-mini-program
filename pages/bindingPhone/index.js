Page({
  data: {
    disabled: false,
    time: 0,
    timer: '',
    sendButtonText: '获取验证码',
    vCodeColor: '1'
  },

  _getMobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  _getVcodeInput: function(e) {
    this.setData({
      vcode: e.detail.value
    })
  },
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