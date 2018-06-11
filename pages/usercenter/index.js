const indexData = require('../../utils/mock/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  _goSetting:function(e){
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  _goOrder:function(e){
    var cur = e.currentTarget.dataset.currenttab ? e.currentTarget.dataset.currenttab:0
    wx.navigateTo({
      url: '../order/order-list?currenttab=' + cur,
    })
  },
  _goNewsFeed:function(e){
    wx.navigateTo({
      url: './newsFeed/newsFeed',
    })
  },
  _goBalance:function(e){
    console.log(1)
    wx.navigateTo({
      url: './balance/balance',
    })
  },
  _goWithdraw:function(){
    wx.navigateTo({
      url: './withdraw/withdraw',
    })
  },
  _goCollectGoods:function(e){
    wx.navigateTo({
      url: '../collectgoods/collectgoods',
    })
  },
  _goIntegral:function(e){
    wx.navigateTo({
      url: './integral/integral?currenttab='+e.currentTarget.dataset.integral,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bannerItems: indexData.bannerItems,
    });
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