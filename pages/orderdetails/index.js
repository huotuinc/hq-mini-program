import orderList from '../../utils/request/order.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backTopValue: false,
    orderDetail: [],
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

  //评论商品
  // goEvaluate: function(e) {
  //   var orderDetail = this.data.orderDetail
  //   var index = e.currentTarget.dataset.index
  //   var order = {
  //     orderId: orderDetail.orderId,
  //     productId: orderDetail.goods[index].productId,
  //     proPic: orderDetail.goods[index].picUrl,
  //     name: orderDetail.goods[index].name,
  //   }
  //   wx.setStorage({
  //     key: 'goodsOrder',
  //     data: order,
  //   })
  //   wx.navigateTo({
  //     url: '../evaluate/index',
  //   })
  // },

  //申请售后
  goAfterSale: function(e) {
    var index = e.currentTarget.dataset.index
    var saleAfterStatus = e.currentTarget.dataset.saleafterstatus
    var orderDetail = this.data.orderDetail

    var afterId = e.currentTarget.dataset.afterid
    if (saleAfterStatus == 0) {
      wx.navigateTo({
        url: '../afterSale/SubmitReturnProduct/index?orderId=' + orderDetail.orderId + '&productId=' + orderDetail.goods[index].productId,
      })
    } else if (saleAfterStatus == 1 || saleAfterStatus == 2 || saleAfterStatus == 3) {
      wx.navigateTo({
        url: '../afterSale/MyProductDetail/index?afterId=' + orderDetail.goods[index].afterId,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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