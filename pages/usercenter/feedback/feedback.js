import config from '../../../config.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    winHeight: 0
  },

  remarks: function (e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  contactWay: function (e) {
    this.setData({
      contactWay: e.detail.value
    })
  },
  phoneModel: function (e) {
    this.setData({
      phoneModel: e.detail.value
    })
  },

  submit: function (e) {
    let data = []
    data.remarks = this.data.remarks
    data.contactWay = this.data.contactWay
    data.phoneModel = this.data.phoneModel
    data.isWeiXin = "是"

    app.request({
      url: config.saveFeedBack,
      data: data,
      success:function(res){
        if(res.code === 200){
          wx.showToast({
            title: '反馈成功',
            icon:success
          })
        }
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let h = res.windowHeight;
        that.setData({
          winHeight: h
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})