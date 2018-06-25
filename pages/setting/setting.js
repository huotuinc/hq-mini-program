import config from '../../config.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RealName: "去完善",
    UserGender: ['未知', '男', '女'],
    UserBirthday: '',
    UserCardNo: '',
    UserMobile: '',
    UserWxNo: '',
    UserCityName: "",
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
      UserBirthday: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log(e)
    this.setData({
      UserCityName: e.detail.value
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
        RealName: excessive
      })
      user.updateUserBaseInfo({
        type: 1,
        content: excessive
      }, function(res) {
        console.log(res.code)
      })
    } else if (placeholder === '请输入身份证') {
      this.setData({
        UserCardNo: excessive
      })
    } else if (placeholder === '请输入手机号') {
      this.setData({
        UserMobile: excessive
      })
    } else if (placeholder === '请输入微信号') {
      this.setData({
        UserWxNo: excessive
      })
    }
    this.hideModal();
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  _goAddress: function(e) {
    wx.navigateTo({
      url: '../shipAddress/index',
    })
  },
  _goPayPassword: function(e) {
    wx.navigateTo({
      url: '../payPassword/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    user.setting(function(res) {
      self.setData({
        settingItem: res.settingItem,
        RealName: res.settingItem.RealName || '去完善',
        UserSex: res.settingItem.UserSex || '未知',
        UserBirthday: res.settingItem.UserBirthday || '',
        UserCardNo: res.settingItem.UserCardNo || '',
        UserMobile: res.settingItem.UserMobile || '',
        UserWxNo: res.settingItem.UserWxNo || '',
        UserCityName: res.settingItem.UserCityName || '',
      })
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