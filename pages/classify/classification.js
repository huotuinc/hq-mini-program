// pages/classify/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    classifList: ["户外服装", "户外裤装", "内衣/配饰", "户外鞋靴", "户外背包", "户外工具"]
  },
  swichNav: function(e) {
    var cur = e.target.dataset.current
    if (this.data.currentTab == cur) {
      return false
    }
    this.setData({
      currentTab: cur
    })
  },
  _goGoodsList:function(e){
    wx.navigateTo({
      url: '../goodslist/goods-list?search=2',
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