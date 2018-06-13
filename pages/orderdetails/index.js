// pages/orderdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: false
  },

  actionSheetTap: function() {
    wx.showActionSheet({
      itemList: ['item1', 'item2', 'item3', 'item4'],
      success: function(e) {
        console.log(e.tapIndex)
      }
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

    return {
      title: '建瓯多久哦i回家o',
      imageUrl: 'http://t05img.yangkeduo.com/images/2018-05-04/763d35d3060a752f6b296cf0db710094.jpeg',
      path: '/pages/orderdetails/index?id=123'
    }
  }

})