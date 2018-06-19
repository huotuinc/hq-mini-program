// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ' ',
    name: "去完善",
    gender: ['未知','男','女'],
    idCard: '',
    iphoneNum: '',
    wxNum: '',
    city: "",
    checked: '',
    showModal: false
  },
  _prefect: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入姓名"
    })
  },
  _idCard: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入身份证"
    })
  },
  _mobilePhone: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入手机号"
    })
  },
  _wxNumber: function(e) {
    this.setData({
      showModal: true,
      placeholder: "请输入微信号"
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      city: e.detail.value
    })
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  CancelGender: function(e) {
    this.setData({
      showGender: false
    })
  },
  onCancel: function() {
    this.hideModal();
  },
  inputChange: function(e) {
    var newName = e.detail.value
    this.setData({
      excessive: newName
    })
  },
  onConfirm: function() {
    var excessive = this.data.excessive
    var placeholder = this.data.placeholder
    if (placeholder === '请输入姓名') {
      this.setData({
        name: excessive
      })
    } else if (placeholder === '请输入身份证') {
      this.setData({
        idCard: excessive
      })
    } else if (placeholder === '请输入手机号') {
      this.setData({
        iphoneNum: excessive
      })
    } else if (placeholder === '请输入微信号') {
      this.setData({
        wxNum: excessive
      })
    }
    this.hideModal();
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  _goAddress:function(e){
    wx.navigateTo({
      url: '../shipAddress/index',
    })
  },
  _goPayPassword:function(e){
  wx.navigateTo({
    url: '../payPassword/index',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    this.onConfirm(e)
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