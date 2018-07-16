import orderList from '../../utils/request/order.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backTopValue: false,
    watchStatus: 0 //是否显示订单状态
  },

  //查看订单状态
  watchStatus: function(e) {
    var watchStatus = this.data.watchStatus
    if (watchStatus) {
      this.setData({
        watchStatus: 0
      })
    } else {
      this.setData({
        watchStatus: 1
      })
    }

  },

  //获取订单详情
  _getOrderDetail: function(orderId) {
    var self = this
    orderList.orderDetail({
      orderId: orderId
    }, function(res) {
      self.setData({
        orderDetail: res.data.data
      })
    })
  },

  // 监听滚动条坐标
  onPageScroll: function(e) {
    //console.log(e)
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 500 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },

  // 滚动到顶部
  backTop: function() {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      status: options.status
    })

    this._getOrderDetail(options.orderId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  onShareAppMessage: function() {}

})