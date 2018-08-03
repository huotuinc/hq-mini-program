import orderList from '../../utils/request/order.js'
import user from '../../utils/request/user.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backTopValue: false,
    orderDetail: []
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
  // 评论
  goEvaluate: function(e) {
    var orderId = e.currentTarget.dataset.orderid
    var goodsOrder = e.currentTarget.dataset.order
    var order = {
      orderId: orderId,
      productId: goodsOrder.productId,
      proPic: goodsOrder.picUrl,
      name: goodsOrder.name,
      goodsId: goodsOrder.goodsId
    }
    wx.setStorage({
      key: 'goodsOrder',
      data: order,
    })
    wx.navigateTo({
      url: '../evaluate/index',
    })
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId
    })

  },
  onShow: function() {
    this._getOrderDetail(this.data.orderId)
  },
})