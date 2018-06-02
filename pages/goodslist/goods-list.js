const indexData = require('../../utils/mock/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterTap: 1,
    goodsItems: []
  },
  clickfilterTap: function(e){
    var cur = e.currentTarget.dataset;
    if (cur.type == 4) {
    }
    this.setData({
      filterTap: cur.type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsItems: indexData.goodsItems
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
      wx.stopPullDownRefresh();
      this.setData({
        goodsItems: indexData.goodsItems
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _goodsItems = this.data.goodsItems;
    this.setData({
      goodsItems: _goodsItems.concat(indexData.goodsItems)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})